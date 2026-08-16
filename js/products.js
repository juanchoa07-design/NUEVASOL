/* ============================================================
   CATÁLOGO DE PRODUCTOS DOÑA SOL
   ------------------------------------------------------------
   Para agregar un producto: copiá un bloque { ... }, y cambiá
   los datos. Para ponerle precio, agregá  precio: 250  (en $U).
   Si no tiene precio, la tienda muestra "Consultar".
   Categorías válidas: limpieza | ropa | auto | papel | accesorios
   ============================================================ */

const PRODUCTS = [
  // ---------- LIMPIEZA Y DESINFECCIÓN ----------
  {
    id: "multiuso",
    nombre: "Limpiador Multiuso",
    categoria: "limpieza",
    descripcion: "Limpia, perfuma y desinfecta. Ideal para pisos, paredes, azulejos y cerámicas.",
    presentacion: "Bidón 5 L",
    img: "img/multiuso.jpg",
    destacado: true
  },
  {
    id: "multiuso-citrico",
    nombre: "Multiuso Cítrico",
    categoria: "limpieza",
    descripcion: "Limpiador multiuso con fragancia cítrica. Limpia, perfuma y desinfecta.",
    presentacion: "Bidón 5 L",
    img: "img/mulcit.png"
  },
  {
    id: "cremoso",
    nombre: "Limpiador Cremoso",
    categoria: "limpieza",
    descripcion: "Limpia a fondo sin rayar. Perfecto para cocinas, bachas y superficies delicadas.",
    presentacion: "750 g",
    img: "img/limpiador-cremoso.jpg"
  },
  {
    id: "limpiavidrios",
    nombre: "Limpiavidrios",
    categoria: "limpieza",
    descripcion: "Brillo sin marcas para vidrios, espejos y mamparas. Secado rápido.",
    presentacion: "Botella 2 L",
    img: "img/limpiavidrios.jpg",
    destacado: true
  },
  {
    id: "desinfectante-alto-poder",
    nombre: "Desinfectante Alto Poder",
    categoria: "limpieza",
    descripcion: "Desinfectante líquido de alto poder para una higiene profunda en todo tipo de ambientes.",
    presentacion: "Bidón 5 L",
    img: "img/limpiador-liquido.jpg"
  },
  {
    id: "lavandina",
    nombre: "Lavandina",
    categoria: "limpieza",
    descripcion: "Lavandina concentrada para desinfección y blanqueo de uso diario.",
    presentacion: "Consultar presentaciones",
    img: "img/lavandina.jpg"
  },
  {
    id: "hipoclorito",
    nombre: "Hipoclorito",
    categoria: "limpieza",
    descripcion: "Hipoclorito de sodio concentrado para desinfección industrial y comercial.",
    presentacion: "Bidón 5 L",
    img: "img/hipoclorito.jpg"
  },
  {
    id: "amonio-cuaternario",
    nombre: "Amonio Cuaternario",
    categoria: "limpieza",
    descripcion: "Desinfectante de amplio espectro, sin olor agresivo. Apto superficies en contacto con alimentos.",
    presentacion: "Consultar presentaciones",
    img: "img/amonio-cuaternario.jpg"
  },
  {
    id: "alcohol",
    nombre: "Alcohol Líquido",
    categoria: "limpieza",
    descripcion: "Alcohol para limpieza y desinfección de manos y superficies.",
    presentacion: "Consultar presentaciones",
    img: "img/alcohol.jpg"
  },
  {
    id: "alcohol-gel",
    nombre: "Alcohol en Gel",
    categoria: "limpieza",
    descripcion: "Alcohol en gel sanitizante para manos. No reseca la piel.",
    presentacion: "Consultar presentaciones",
    img: "img/alcohol-en-gel.jpg"
  },
  {
    id: "desengrasante",
    nombre: "Desengrasante",
    categoria: "limpieza",
    descripcion: "Corta la grasa al instante. Ideal para cocinas industriales, hornos y campanas.",
    presentacion: "Consultar presentaciones",
    img: "img/desengrasante.jpg",
    destacado: true
  },
  {
    id: "desodorante",
    nombre: "Desodorante Bactericida",
    categoria: "limpieza",
    descripcion: "Desodorante de pisos bactericida con fragancia duradera.",
    presentacion: "Bidón 5 L",
    img: "img/desodorante.jpg"
  },
  {
    id: "esencia",
    nombre: "Desodorante Perfumado",
    categoria: "limpieza",
    descripcion: "Desodorante perfumado para pisos y ambientes. Aroma intenso y duradero.",
    presentacion: "Botella 2 L",
    img: "img/esencia.jpg"
  },
  {
    id: "perfumador",
    nombre: "Perfumador de Ambientes",
    categoria: "limpieza",
    descripcion: "Perfuma y renueva el aire de hogares, comercios y oficinas.",
    presentacion: "Consultar presentaciones",
    img: "img/perfumador.jpg"
  },
  {
    id: "soda-caustica",
    nombre: "Soda Cáustica",
    categoria: "limpieza",
    descripcion: "Soda cáustica para destapaciones y limpieza pesada. Uso industrial.",
    presentacion: "Consultar presentaciones",
    img: "img/soda-caustica.jpg"
  },
  {
    id: "cera",
    nombre: "Cera al Agua Autobrillo",
    categoria: "limpieza",
    descripcion: "Autobrillo para pisos cerámicos, monolíticos y parquet. No necesita lustrado.",
    presentacion: "Bidón 5 L",
    img: "img/cera.jpg"
  },

  // ---------- ROPA Y LAVADO ----------
  {
    id: "jabon-liquido",
    nombre: "Jabón Líquido para Ropa",
    categoria: "ropa",
    descripcion: "Jabón líquido de alto rendimiento para lavarropas. Cuida colores y tejidos.",
    presentacion: "Bidón 5 L",
    img: "img/jabon-liquido.jpg",
    destacado: true
  },
  {
    id: "ideal",
    nombre: "Shampoo Lavarropa Ideal Duo",
    categoria: "ropa",
    descripcion: "Espuma controlada con suavizante incluido. Limpia y suaviza en un solo paso.",
    presentacion: "Botella 2 L",
    img: "img/ideal.jpg"
  },
  {
    id: "suavizante",
    nombre: "Suavizante para Ropa",
    categoria: "ropa",
    descripcion: "Suavidad y perfume duradero para toda la ropa de la familia.",
    presentacion: "Consultar presentaciones",
    img: "img/suavizante.jpg"
  },
  {
    id: "jabon-manos",
    nombre: "Shampoo para Manos",
    categoria: "ropa",
    descripcion: "Limpia y desinfecta cuidando tus manos. Ideal para baños de comercios e industrias.",
    presentacion: "Bidón 5 L",
    img: "img/jabon-manos.png"
  },

  // ---------- AUTOMOTOR ----------
  {
    id: "emulsion-neumaticos",
    nombre: "Emulsión para Neumáticos",
    categoria: "auto",
    descripcion: "Renueva el negro de los neumáticos con terminación brillante profesional.",
    presentacion: "Consultar presentaciones",
    img: "img/emulsion-neumaticos.png"
  },
  {
    id: "emulsion-plasticos",
    nombre: "Emulsión para Plásticos",
    categoria: "auto",
    descripcion: "Restaura y protege plásticos interiores y exteriores del vehículo.",
    presentacion: "Consultar presentaciones",
    img: "img/emulsion-plasticos.png"
  },

  // ---------- PAPEL E HIGIENE ----------
  {
    id: "higienico-doble-hoja",
    nombre: "Papel Higiénico Doble Hoja",
    categoria: "papel",
    descripcion: "Papel higiénico doble hoja, suave y resistente.",
    presentacion: "Consultar presentaciones",
    img: "img/higienico-doble-hoja.jpg"
  },
  {
    id: "higienico-jumbo-500",
    nombre: "Papel Higiénico Jumbo 500 m",
    categoria: "papel",
    descripcion: "Rollo institucional Jumbo de 500 metros para dispensadores.",
    presentacion: "Rollo 500 m",
    img: "img/higienico-jumbo-500.png"
  },
  {
    id: "toalla-bobina-200",
    nombre: "Papel Toalla en Bobina 200 m",
    categoria: "papel",
    descripcion: "Bobina de papel toalla de 20 cm × 200 m. Máximo rendimiento institucional.",
    presentacion: "Pack 6 rollos",
    img: "img/papel-jumbo-200.jpg",
    destacado: true
  },
  {
    id: "toalla-intercalada",
    nombre: "Toalla Intercalada 20×23",
    categoria: "papel",
    descripcion: "Toallas de papel intercaladas para dispensadores de baños y cocinas.",
    presentacion: "20 × 23 cm",
    img: "img/toalla-intercalada.jpg"
  },
  {
    id: "rollo-cocina",
    nombre: "Rollo de Cocina 200 Hojas",
    categoria: "papel",
    descripcion: "Rollo de cocina de 200 hojas, absorbente y resistente.",
    presentacion: "200 hojas",
    img: "img/rollo-cocina-200.webp"
  },
  {
    id: "servilleta-mesa",
    nombre: "Servilleta de Mesa 30×29,5",
    categoria: "papel",
    descripcion: "Servilletas de mesa suaves y absorbentes para gastronomía y hogar.",
    presentacion: "30 × 29,5 cm",
    img: "img/servilleta-mesa.webp"
  },
  {
    id: "servilleta-bocadillo",
    nombre: "Servilleta de Bocadillo",
    categoria: "papel",
    descripcion: "Servilletas tipo bocadillo, ideales para bares, food trucks y eventos.",
    presentacion: "Consultar presentaciones",
    img: "img/servilleta-bocadillo.jpg"
  },
  {
    id: "servilletas",
    nombre: "Servilletas",
    categoria: "papel",
    descripcion: "Servilletas de papel de uso diario para gastronomía y hogar.",
    presentacion: "Consultar presentaciones",
    img: "img/servilleta.jpg"
  },

  // ---------- ACCESORIOS ----------
  {
    id: "panos",
    nombre: "Paños Multiuso",
    categoria: "accesorios",
    descripcion: "Paños multiuso de gran absorción. Siempre rinden más.",
    presentacion: "Consultar presentaciones",
    img: "img/panos.jpg"
  },
  {
    id: "panos-piso",
    nombre: "Paños de Piso",
    categoria: "accesorios",
    descripcion: "Paños de piso resistentes para limpieza diaria intensiva.",
    presentacion: "Consultar presentaciones",
    img: "img/panos-de-piso.jpg"
  },
  {
    id: "franelas",
    nombre: "Franelas",
    categoria: "accesorios",
    descripcion: "Franelas suaves para lustrar y repasar sin dejar pelusa.",
    presentacion: "Consultar presentaciones",
    img: "img/franelas.jpg"
  },
  {
    id: "rejillas",
    nombre: "Rejillas",
    categoria: "accesorios",
    descripcion: "Rejillas absorbentes para cocina y limpieza general.",
    presentacion: "Consultar presentaciones",
    img: "img/rejillas.jpg"
  },
  {
    id: "guantes-amarillos",
    nombre: "Guantes Amarillos",
    categoria: "accesorios",
    descripcion: "Guantes de látex resistentes para limpieza doméstica y comercial.",
    presentacion: "Par · varios talles",
    img: "img/guantes-amarillos.jpg"
  },
  {
    id: "guantes-negros",
    nombre: "Guantes Negros",
    categoria: "accesorios",
    descripcion: "Guantes reforzados de uso industrial para tareas exigentes.",
    presentacion: "Par · varios talles",
    img: "img/guantes-negros.jpg"
  }
];

const CATEGORIAS = [
  { id: "todos",      nombre: "Todos" },
  { id: "limpieza",   nombre: "Limpieza y Desinfección" },
  { id: "ropa",       nombre: "Ropa y Lavado" },
  { id: "papel",      nombre: "Papel e Higiene" },
  { id: "auto",       nombre: "Automotor" },
  { id: "accesorios", nombre: "Accesorios" }
];
