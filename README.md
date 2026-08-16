# Sitio web Doña Sol 🌞

Sitio web moderno con tienda online para **Doña Sol** — fábrica de productos de
limpieza (Montevideo, Uruguay). Es un sitio 100 % estático: no necesita servidor,
base de datos ni programación para mantenerlo.

## Cómo funciona la tienda

1. El cliente navega el catálogo, filtra por categoría o busca un producto.
2. Agrega productos a "Mi pedido" (se guarda en su navegador).
3. Al tocar **"Enviar pedido por WhatsApp"** se abre WhatsApp con el pedido ya
   escrito, dirigido al **092 747 716**.
4. Ustedes confirman precios, stock y entrega por chat.

## Estructura

| Archivo | Qué es |
|---|---|
| `index.html` | La página completa (portada, tienda, nosotros, contacto) |
| `css/styles.css` | Todos los estilos y colores |
| `js/products.js` | **El catálogo de productos** (el archivo que más vas a editar) |
| `js/app.js` | La lógica de la tienda y el carrito |
| `img/` | Fotos de los productos con nombres limpios para web |
| `Fotos Pagina/` | Fotos originales (respaldo, el sitio no las usa) |

## Cómo editar el catálogo

Abrí `js/products.js`. Cada producto es un bloque como este:

```js
{
  id: "multiuso",                       // único, sin espacios
  nombre: "Limpiador Multiuso",
  categoria: "limpieza",                // limpieza | ropa | auto | papel | accesorios
  descripcion: "Limpia, perfuma y desinfecta...",
  presentacion: "Bidón 5 L",
  img: "img/multiuso.jpg",
  destacado: true,                      // opcional: muestra la etiqueta "Destacado"
  precio: 250                           // opcional: en $U. Si no está, dice "Consultar"
},
```

- **Agregar precio:** sumá la línea `precio: 250,` y el sitio lo muestra y lo
  incluye en el pedido de WhatsApp.
- **Agregar producto:** copiá un bloque completo, cambiá los datos y guardá la
  foto en `img/`.
- **Sacar un producto:** borrá su bloque (o comentalo con `//`).

## Cómo publicarlo gratis (GitHub Pages)

1. Subí los cambios a GitHub (commit + push a `main`).
2. En el repositorio: **Settings → Pages → Branch: `main` → carpeta `/ (root)` → Save**.
3. En unos minutos el sitio queda en `https://<tu-usuario>.github.io/NUEVASOL/`.
4. Después se le puede conectar el dominio `donasol.com.uy` desde la misma
   pantalla de Pages (Custom domain).

## Datos de contacto usados en el sitio

- WhatsApp pedidos: **092 747 716** (`wa.me/59892747716`)
- Teléfonos: 2418 3045 · 2418 3003
- Email: donasol@adinet.com.uy
- Dirección: Lauro Müller 2008, Montevideo
- Instagram: @donasolproductos

Si cambia el número de WhatsApp, editá `WSP_NUMBER` al inicio de `js/app.js`.
