/* ============================================================
   CATÁLOGO DE PRODUCTOS DOÑA SOL
   ------------------------------------------------------------
   Para agregar un producto: copiá un bloque { ... }, y cambiá
   los datos. Para ponerle precio, agregá  precio: 250  (en $U).
   Si no tiene precio, la tienda muestra "Consultar".
   Si el producto viene en varios tamaños, agregá
   tamanos: ["5 L", "10 L"]  y la tienda deja elegir uno.
   Categorías válidas: limpieza | ropa | auto | papel | accesorios
   ============================================================ */

const PRODUCTS = [
  // ---------- LIMPIEZA Y DESINFECCIÓN ----------
  {
    id: "multiuso",
    nombre: "Limpiador Multiuso",
    categoria: "limpieza",
    descripcion: "Limpiador multiuso con fragancia de manzana. Función desinfectante para una mejor limpieza profunda.",
    presentacion: "Bidón 5 L o 10 L",
    tamanos: ["5 L", "10 L"],
    img: "img/multiuso.jpg",
    destacado: true
  },
  {
    id: "multiuso-citrico",
    nombre: "Limpiador Multiuso Cítrico",
    categoria: "limpieza",
    descripcion: "Limpiador multiuso con una fresca y duradera fragancia cítrica. Función desinfectante para una mejor limpieza profunda.",
    presentacion: "Bidón 5 L o 10 L",
    tamanos: ["5 L", "10 L"],
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
    descripcion: "Limpia y deja relucientes cristales, espejos y azulejos. Secado rápido sin marcas.",
    presentacion: "Botella 2 L",
    img: "img/limpiavidrios.jpg",
    destacado: true
  },
  {
    id: "desinfectante-alto-poder",
    nombre: "Limpiador Líquido Desinfectante",
    categoria: "limpieza",
    descripcion: "Limpiador de alto poder desinfectante, en base a amonio cuaternario.",
    presentacion: "Bidón 5 L o 10 L",
    tamanos: ["5 L", "10 L"],
    img: "img/limpiador-liquido.jpg"
  },
  {
    id: "lavandina",
    nombre: "Lavandina",
    categoria: "limpieza",
    descripcion: "Solución de hipoclorito mayor al 40%. Blanqueador y poderosamente desinfectante.",
    presentacion: "Bidón 10 L",
    img: "img/lavandina.jpg"
  },
  {
    id: "hipoclorito",
    nombre: "Hipoclorito de Sodio",
    categoria: "limpieza",
    descripcion: "Hipoclorito de sodio al 100%. Para uso en piscinas.",
    presentacion: "Bidón 10 L",
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
    descripcion: "Alcohol líquido rectificado 70%. Para limpieza y desinfección de manos y superficies.",
    presentacion: "1 L, 5 L o 10 L",
    tamanos: ["1 L", "5 L", "10 L"],
    img: "img/alcohol.jpg"
  },
  {
    id: "alcohol-gel",
    nombre: "Alcohol en Gel",
    categoria: "limpieza",
    descripcion: "Alcohol en gel sanitizante para manos. Con dosificador.",
    presentacion: "1 L o 5 L",
    tamanos: ["1 L", "5 L"],
    img: "img/alcohol-en-gel.jpg"
  },
  {
    id: "desengrasante",
    nombre: "Desengrasante",
    categoria: "limpieza",
    descripcion: "Remueve las suciedades y grasas más rebeldes. Limpia motores.",
    presentacion: "Bidón 5 L",
    img: "img/desengrasante.jpg",
    destacado: true
  },
  {
    id: "detergente",
    nombre: "Detergente Líquido",
    categoria: "limpieza",
    descripcion: "Detergente neutro activo al 10% o 12%. Excelente para el lavado de platos u otros usos.",
    presentacion: "Bidón 10 L",
    img: "img/jabon-liquido.jpg",
    destacado: true
  },
  {
    id: "desodorante",
    nombre: "Desodorante Bactericida",
    categoria: "limpieza",
    descripcion: "Hecho con un delicioso perfume muy perdurable. Mata el 99,9% de las bacterias.",
    presentacion: "Bidón 10 L",
    img: "img/desodorante.jpg"
  },
  {
    id: "esencia",
    nombre: "Esencia Desodorante",
    categoria: "limpieza",
    descripcion: "Exquisita fragancia duradera para pisos y ambientes.",
    presentacion: "Botella 2 L",
    img: "img/esencia.jpg"
  },
  {
    id: "perfumador",
    nombre: "Perfumador",
    categoria: "limpieza",
    descripcion: "Aplicar sobre tapizados, tableros, cortinas, prendas y telas. Con atomizador.",
    presentacion: "½ L o 1 L",
    tamanos: ["½ L", "1 L"],
    img: "img/perfumador.jpg"
  },
  {
    id: "soda-caustica",
    nombre: "Soda Cáustica",
    categoria: "limpieza",
    descripcion: "Líquida 100%. Elimina y remueve todo tipo de grasas y residuos orgánicos.",
    presentacion: "Bidón 5 L o 10 L",
    tamanos: ["5 L", "10 L"],
    img: "img/soda-caustica.jpg"
  },
  {
    id: "cera",
    nombre: "Cera al Agua",
    categoria: "limpieza",
    descripcion: "Autobrillo de secado rápido y agradable. Semiacrílica.",
    presentacion: "Bidón 5 L",
    img: "img/cera.jpg"
  },
  {
    id: "jabon-manos",
    nombre: "Shampoo para Manos",
    categoria: "limpieza",
    descripcion: "Limpia y desinfecta cuidando sus manos. Ideal para baños de comercios e industrias.",
    presentacion: "Bidón 5 L",
    img: "img/jabon-manos.png"
  },

  // ---------- ROPA Y LAVADO ----------
  {
    id: "ideal",
    nombre: "Jabón p/Lavarropas Dúo",
    categoria: "ropa",
    descripcion: "Espuma controlada. Con suavizante y blanqueador óptico. Ideal para cualquier tipo de lavado.",
    presentacion: "Bidón 5 L o 10 L",
    tamanos: ["5 L", "10 L"],
    img: "img/ideal.jpg",
    destacado: true
  },
  {
    id: "suavizante",
    nombre: "Suavizante",
    categoria: "ropa",
    descripcion: "Suaviza, desinfecta y perfuma delicadamente.",
    presentacion: "Bidón 10 L",
    img: "img/suavizante.jpg"
  },

  // ---------- AUTOMOTOR ----------
  {
    id: "emulsion-neumaticos",
    nombre: "Emulsión Neumáticos",
    categoria: "auto",
    descripcion: "Brillo profundo y duradero. Protección contra el desgaste y la decoloración. Fácil aplicación y secado rápido.",
    presentacion: "Bidón 5 L",
    img: "img/emulsion-neumaticos.png"
  },
  {
    id: "emulsion-plasticos",
    nombre: "Emulsión Plásticos",
    categoria: "auto",
    descripcion: "Brillo profundo y duradero. Protección contra el desgaste y la decoloración. Fácil aplicación y secado rápido.",
    presentacion: "Bidón 5 L",
    img: "img/emulsion-plasticos.png"
  },

  // ---------- PAPEL E HIGIENE ----------
  {
    id: "higienico-doble-hoja",
    nombre: "Papel Higiénico Doble Hoja",
    categoria: "papel",
    descripcion: "Papel doble hoja suave y resistente para uso institucional y doméstico.",
    presentacion: "Funda de 64 rollos de 30 m",
    img: "img/higienico-doble-hoja.jpg"
  },
  {
    id: "higienico-jumbo-500",
    nombre: "Papel Higiénico Jumbo 500",
    categoria: "papel",
    descripcion: "Rollo jumbo de 500 metros. Para baños de alto tráfico.",
    presentacion: "Funda de 8 rollos",
    img: "img/higienico-jumbo-500.png"
  },
  {
    id: "toalla-bobina-200",
    nombre: "Jumbo 200",
    categoria: "papel",
    descripcion: "Toalla en rollo de alta absorción. Ideal para uso profesional e industrial.",
    presentacion: "Funda de 6 rollos",
    img: "img/papel-jumbo-200.jpg",
    destacado: true
  },
  {
    id: "toalla-intercalada",
    nombre: "Toalla Intercalada 20×23",
    categoria: "papel",
    descripcion: "Toalla interdoblada para dispensadores. Suave y de alta absorción.",
    presentacion: "Caja de 4800 unidades",
    img: "img/toalla-intercalada.jpg"
  },
  {
    id: "rollo-cocina",
    nombre: "Rollo Cocina 200 Hojas",
    categoria: "papel",
    descripcion: "200 hojas por rollo. Alta absorción para uso doméstico y gastronómico.",
    presentacion: "Funda de 12 rollos",
    img: "img/rollo-cocina-200.webp"
  },
  {
    id: "servilleta-mesa",
    nombre: "Servilleta de Mesa 30×29,5",
    categoria: "papel",
    descripcion: "Servilleta grande para mesa. Ideal para restaurantes y eventos.",
    presentacion: "36 paquetes de 50 servilletas",
    img: "img/servilleta-mesa.webp"
  },
  {
    id: "servilleta-mesa-22x21",
    nombre: "Servilletas de Mesa 22×21",
    categoria: "papel",
    descripcion: "Servilleta de mesa de 22×21 cm. Ideal para uso diario en restaurantes y hogares.",
    presentacion: "Caja de 72 paquetes de 50 servilletas",
    img: "img/servilleta.jpg"
  },
  {
    id: "servilleta-bocadillo",
    nombre: "Servilleta de Bocadillo",
    categoria: "papel",
    descripcion: "Servilleta compacta ideal para snacks y bocadillos. Económica y práctica.",
    presentacion: "Caja de 6000 unidades",
    img: "img/servilleta-bocadillo.jpg"
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
    descripcion: "Extra grandes, de 70×65 cm. Puro algodón.",
    presentacion: "6 o 25 unidades",
    tamanos: ["6 unid.", "25 unid."],
    img: "img/panos-de-piso.jpg"
  },
  {
    id: "franelas",
    nombre: "Franelas",
    categoria: "accesorios",
    descripcion: "Franelas grandes de 40×40 cm, suaves para lustrar y repasar sin dejar pelusa.",
    presentacion: "6 unidades",
    img: "img/franelas.jpg"
  },
  {
    id: "rejillas",
    nombre: "Rejillas",
    categoria: "accesorios",
    descripcion: "Rejillas grandes de 40×40 cm. Puro algodón.",
    presentacion: "6 unidades",
    img: "img/rejillas.jpg"
  },
  {
    id: "guantes-amarillos",
    nombre: "Guantes Amarillos",
    categoria: "accesorios",
    descripcion: "Guantes de látex natural de alta resistencia, clorinados y sin talco. Textura rugosa para mejor agarre. Ideales para industrias alimenticias, químicas o de mantenimiento.",
    presentacion: "10 pares",
    img: "img/guantes-amarillos.jpg"
  },
  {
    id: "guantes-negros",
    nombre: "Guantes Negros",
    categoria: "accesorios",
    descripcion: "Guantes de látex ultra resistentes para tareas pesadas. Excelente agarre en seco y mojado. Perfectos para uso industrial, mantenimiento y construcción.",
    presentacion: "10 pares",
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
