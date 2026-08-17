/* ============================================================
   DOÑA SOL — Lógica de la tienda
   Carrito guardado en el navegador (localStorage) y
   checkout por WhatsApp al 092 747 716.
   ============================================================ */

const WSP_NUMBER = "59892747716";
const CART_KEY = "donasol_cart_v1";

const catNames = Object.fromEntries(CATEGORIAS.map(c => [c.id, c.nombre]));

const $ = (sel) => document.querySelector(sel);
const grid = $("#productsGrid");
const filtersBox = $("#filters");
const searchInput = $("#searchInput");

let activeCat = "todos";
let searchTerm = "";
let cart = loadCart();

/* ---------- Utilidades ---------- */
/* La clave del carrito es "id" o "id|tamaño" (ej: "multiuso|5 L") */
function cartKeyParts(key) {
  const [id, size] = key.split("|");
  return { id, size: size || null };
}

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return {};
    const data = JSON.parse(raw);
    // Descarta claves que ya no existen en el catálogo
    for (const key of Object.keys(data)) {
      const { id, size } = cartKeyParts(key);
      const p = PRODUCTS.find(x => x.id === id);
      const ok = p && (!size || (p.tamanos || []).includes(size));
      if (!ok) delete data[key];
    }
    return data;
  } catch {
    return {};
  }
}

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function formatPrice(p) {
  return p.precio != null
    ? `$U ${p.precio.toLocaleString("es-UY")}`
    : `<small>Consultar</small>`;
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

function sizePickerHTML(p, activeSize) {
  return `
    <div class="size-picker" role="group" aria-label="Elegir tamaño de ${escapeHtml(p.nombre)}">
      ${p.tamanos.map(t => `
        <button class="size-chip${t === activeSize ? " active" : ""}" data-size="${escapeHtml(t)}"
                aria-pressed="${t === activeSize}">${escapeHtml(t)}</button>`).join("")}
    </div>`;
}

/* Botón "Agregar al pedido" o contador +/- según lo que ya haya en el carrito */
function footerControlHTML(p, size) {
  const key = size ? `${p.id}|${size}` : p.id;
  const qty = cart[key] || 0;
  if (qty > 0) {
    return `
      <div class="qty-stepper" role="group" aria-label="Cantidad de ${escapeHtml(p.nombre)} en el pedido">
        <button class="qty-stepper__btn" data-qty-dec="${p.id}" aria-label="Restar uno de ${escapeHtml(p.nombre)}">−</button>
        <span class="qty-stepper__count" aria-live="polite">${qty}</span>
        <button class="qty-stepper__btn" data-qty-inc="${p.id}" aria-label="Sumar uno de ${escapeHtml(p.nombre)}">+</button>
      </div>`;
  }
  return `
    <button class="add-btn" data-add="${p.id}" aria-label="Agregar ${escapeHtml(p.nombre)} al pedido">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      Agregar al pedido
    </button>`;
}

function syncCardFooter(card) {
  const slot = card.querySelector("[data-qty-slot]");
  if (!slot) return;
  const p = PRODUCTS.find(x => x.id === slot.dataset.qtySlot);
  if (!p) return;
  const size = card.querySelector(".size-chip.active")?.dataset.size || null;
  slot.innerHTML = footerControlHTML(p, size);
}

function syncGridFooters() {
  grid.querySelectorAll(".product-card").forEach(syncCardFooter);
}

function syncModalFooter() {
  if (!currentModalProduct) return;
  const slot = productModal.querySelector("[data-qty-slot]");
  if (!slot) return;
  const size = productModal.querySelector(".size-chip.active")?.dataset.size || null;
  slot.innerHTML = footerControlHTML(currentModalProduct, size);
}

function syncAllFooters() {
  syncGridFooters();
  syncModalFooter();
}

/* ---------- Filtros ---------- */
function renderFilters() {
  filtersBox.innerHTML = CATEGORIAS.map(c => `
    <button class="filter-chip${c.id === activeCat ? " active" : ""}"
            data-cat="${c.id}"
            aria-pressed="${c.id === activeCat}">${c.nombre}</button>
  `).join("");
}

filtersBox.addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-chip");
  if (!btn) return;
  activeCat = btn.dataset.cat;
  renderFilters();
  renderProducts();
});

searchInput.addEventListener("input", () => {
  searchTerm = searchInput.value.trim().toLowerCase();
  renderProducts();
});

// Las tarjetas de categoría de la portada activan el filtro correspondiente
document.querySelectorAll(".cat-card[data-cat]").forEach(card => {
  card.addEventListener("click", () => {
    activeCat = card.dataset.cat;
    searchInput.value = "";
    searchTerm = "";
    renderFilters();
    renderProducts();
  });
});

/* ---------- Productos ---------- */
function normalize(s) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

function renderProducts() {
  const term = normalize(searchTerm);
  const list = PRODUCTS.filter(p => {
    const matchCat = activeCat === "todos" || p.categoria === activeCat;
    const matchSearch = !term ||
      normalize(p.nombre).includes(term) ||
      normalize(p.descripcion).includes(term);
    return matchCat && matchSearch;
  });

  if (!list.length) {
    grid.innerHTML = `
      <div class="no-results">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8.5" y1="11" x2="13.5" y2="11"/></svg>
        <p><strong>No encontramos productos</strong><br>Probá con otra búsqueda o categoría.</p>
      </div>`;
    return;
  }

  grid.innerHTML = list.map(p => {
    const firstSize = p.tamanos ? p.tamanos[0] : null;
    return `
    <article class="product-card" data-id="${p.id}">
      <div class="product-card__img">
        ${p.destacado ? `<span class="product-card__badge">Destacado</span>` : ""}
        <img src="${p.img}" alt="${escapeHtml(p.nombre)} Doña Sol" loading="lazy" width="400" height="300">
      </div>
      <div class="product-card__body">
        <span class="product-card__cat">${catNames[p.categoria] || ""}</span>
        <h3>${escapeHtml(p.nombre)}</h3>
        <p class="product-card__desc">${escapeHtml(p.descripcion)}</p>
        <div class="product-card__meta">
          ${p.tamanos ? sizePickerHTML(p, firstSize) : `
          <span class="product-card__pres">${escapeHtml(p.presentacion)}</span>`}
          <span class="product-card__price">${formatPrice(p)}</span>
        </div>
        <div class="qty-slot" data-qty-slot="${p.id}">${footerControlHTML(p, firstSize)}</div>
      </div>
    </article>
  `;
  }).join("");
}

grid.addEventListener("click", (e) => {
  const chip = e.target.closest(".size-chip");
  if (chip) {
    const card = chip.closest(".product-card");
    card.querySelectorAll(".size-chip").forEach(c => {
      c.classList.toggle("active", c === chip);
      c.setAttribute("aria-pressed", c === chip);
    });
    syncCardFooter(card);
    return;
  }

  const activeSizeOf = (btn) => {
    const active = btn.closest(".product-card").querySelector(".size-chip.active");
    return active ? active.dataset.size : null;
  };

  const inc = e.target.closest("[data-qty-inc]");
  if (inc) {
    const id = inc.dataset.qtyInc;
    const size = activeSizeOf(inc);
    const key = size ? `${id}|${size}` : id;
    setQty(key, (cart[key] || 0) + 1);
    return;
  }

  const dec = e.target.closest("[data-qty-dec]");
  if (dec) {
    const id = dec.dataset.qtyDec;
    const size = activeSizeOf(dec);
    const key = size ? `${id}|${size}` : id;
    setQty(key, (cart[key] || 0) - 1);
    return;
  }

  const btn = e.target.closest("[data-add]");
  if (btn) {
    addToCart(btn.dataset.add, activeSizeOf(btn));
    return;
  }

  // Ningún control fue el objetivo: abrir el detalle del producto
  const card = e.target.closest(".product-card");
  if (card) {
    const activeSize = card.querySelector(".size-chip.active")?.dataset.size || null;
    openProductModal(card.dataset.id, activeSize);
  }
});

/* ---------- Carrito ---------- */
const cartDrawer = $("#cartDrawer");
const overlay = $("#overlay");
const cartItemsBox = $("#cartItems");
const cartCount = $("#cartCount");

function cartTotalItems() {
  return Object.values(cart).reduce((a, b) => a + b, 0);
}

function addToCart(id, size = null) {
  const key = size ? `${id}|${size}` : id;
  cart[key] = (cart[key] || 0) + 1;
  saveCart();
  updateCartUI();
  const p = PRODUCTS.find(x => x.id === id);
  showToast(`${p ? p.nombre : "Producto"}${size ? ` ${size}` : ""} agregado al pedido`);
  cartCount.classList.add("bump");
  setTimeout(() => cartCount.classList.remove("bump"), 250);
}

function setQty(key, qty) {
  if (qty <= 0) delete cart[key];
  else cart[key] = qty;
  saveCart();
  updateCartUI();
}

function updateCartUI() {
  cartCount.textContent = cartTotalItems();
  syncAllFooters();

  const keys = Object.keys(cart);
  if (!keys.length) {
    cartItemsBox.innerHTML = `
      <div class="cart-empty">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
        <p><strong>Tu pedido está vacío</strong><br>Agregá productos desde la tienda.</p>
      </div>`;
    return;
  }

  cartItemsBox.innerHTML = keys.map(key => {
    const { id, size } = cartKeyParts(key);
    const p = PRODUCTS.find(x => x.id === id);
    if (!p) return "";
    return `
      <div class="cart-item">
        <div class="cart-item__img"><img src="${p.img}" alt="" loading="lazy"></div>
        <div class="cart-item__info">
          <strong>${escapeHtml(p.nombre)}</strong>
          <span>${escapeHtml(size || p.presentacion)}</span>
          <div class="qty">
            <button data-dec="${escapeHtml(key)}" aria-label="Restar uno de ${escapeHtml(p.nombre)}">−</button>
            <output aria-label="Cantidad">${cart[key]}</output>
            <button data-inc="${escapeHtml(key)}" aria-label="Sumar uno de ${escapeHtml(p.nombre)}">+</button>
          </div>
        </div>
        <button class="cart-item__remove" data-del="${escapeHtml(key)}" aria-label="Quitar ${escapeHtml(p.nombre)} del pedido">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        </button>
      </div>`;
  }).join("");
}

cartItemsBox.addEventListener("click", (e) => {
  const inc = e.target.closest("[data-inc]");
  const dec = e.target.closest("[data-dec]");
  const del = e.target.closest("[data-del]");
  if (inc) setQty(inc.dataset.inc, (cart[inc.dataset.inc] || 0) + 1);
  if (dec) setQty(dec.dataset.dec, (cart[dec.dataset.dec] || 0) - 1);
  if (del) setQty(del.dataset.del, 0);
});

function openCart() {
  cartDrawer.classList.add("open");
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeCart() {
  cartDrawer.classList.remove("open");
  if (!productModal.classList.contains("open")) overlay.classList.remove("open");
  document.body.style.overflow = productModal.classList.contains("open") ? "hidden" : "";
}

$("#cartOpen").addEventListener("click", openCart);
$("#cartClose").addEventListener("click", closeCart);
overlay.addEventListener("click", () => { closeCart(); closeProductModal(); });
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") { closeCart(); closeProductModal(); }
});

/* ---------- Detalle de producto ---------- */
const productModal = $("#productModal");
let currentModalProduct = null;

function openProductModal(id, initialSize = null) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  currentModalProduct = p;
  const size = initialSize || (p.tamanos ? p.tamanos[0] : null);

  const badge = $("#pmodalBadge");
  badge.hidden = !p.destacado;
  const img = $("#pmodalImg");
  img.src = p.img;
  img.alt = `${p.nombre} Doña Sol`;
  $("#pmodalCat").textContent = catNames[p.categoria] || "";
  $("#pmodalName").textContent = p.nombre;
  $("#pmodalDesc").textContent = p.descripcion;
  $("#pmodalMeta").innerHTML = `
    ${p.tamanos ? sizePickerHTML(p, size) : `<span class="product-card__pres">${escapeHtml(p.presentacion)}</span>`}
    <span class="product-card__price">${formatPrice(p)}</span>`;
  $("#pmodalQtySlot").dataset.qtySlot = p.id;
  $("#pmodalQtySlot").innerHTML = footerControlHTML(p, size);

  productModal.classList.add("open");
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeProductModal() {
  productModal.classList.remove("open");
  if (!cartDrawer.classList.contains("open")) overlay.classList.remove("open");
  document.body.style.overflow = cartDrawer.classList.contains("open") ? "hidden" : "";
  currentModalProduct = null;
}

$("#pmodalClose").addEventListener("click", closeProductModal);

productModal.addEventListener("click", (e) => {
  const chip = e.target.closest(".size-chip");
  if (chip) {
    productModal.querySelectorAll(".size-chip").forEach(c => {
      c.classList.toggle("active", c === chip);
      c.setAttribute("aria-pressed", c === chip);
    });
    syncModalFooter();
    return;
  }

  const activeSize = () => productModal.querySelector(".size-chip.active")?.dataset.size || null;

  const inc = e.target.closest("[data-qty-inc]");
  if (inc) {
    const key = activeSize() ? `${inc.dataset.qtyInc}|${activeSize()}` : inc.dataset.qtyInc;
    setQty(key, (cart[key] || 0) + 1);
    return;
  }

  const dec = e.target.closest("[data-qty-dec]");
  if (dec) {
    const key = activeSize() ? `${dec.dataset.qtyDec}|${activeSize()}` : dec.dataset.qtyDec;
    setQty(key, (cart[key] || 0) - 1);
    return;
  }

  const addBtn = e.target.closest("[data-add]");
  if (addBtn) addToCart(addBtn.dataset.add, activeSize());
});

$("#clearCart").addEventListener("click", () => {
  if (!Object.keys(cart).length) return;
  cart = {};
  saveCart();
  updateCartUI();
  showToast("Pedido vaciado");
});

/* ---------- Checkout por WhatsApp ---------- */
$("#checkoutBtn").addEventListener("click", () => {
  const keys = Object.keys(cart);
  if (!keys.length) {
    showToast("Agregá productos antes de enviar el pedido");
    return;
  }
  const lines = keys.map(key => {
    const { id, size } = cartKeyParts(key);
    const p = PRODUCTS.find(x => x.id === id);
    const precio = p.precio != null ? ` — $U ${p.precio.toLocaleString("es-UY")} c/u` : "";
    return `• ${cart[key]} × ${p.nombre} (${size || p.presentacion})${precio}`;
  });
  const msg =
    `¡Hola Doña Sol! 👋 Quiero hacer este pedido:\n\n` +
    lines.join("\n") +
    `\n\n¿Me confirman precios y entrega? ¡Gracias!`;
  window.open(`https://wa.me/${WSP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
});

/* ---------- Toast ---------- */
const toast = $("#toast");
const toastMsg = $("#toastMsg");
let toastTimer;
function showToast(text) {
  toastMsg.textContent = text;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

/* ---------- Menú móvil ---------- */
const menuBtn = $("#menuBtn");
const nav = $("#nav");
menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
nav.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  }
});

/* ---------- Animación de aparición ---------- */
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add("visible");
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
}

/* ---------- Init ---------- */
$("#year").textContent = new Date().getFullYear();
renderFilters();
renderProducts();
updateCartUI();
