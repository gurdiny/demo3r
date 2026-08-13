import { Property, PhotoAudit, ComparableProp, ProspectProfile, WhatsAppMessage } from '../types';

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: "condesa",
    nombre: "Departamento en Condesa",
    colonia: "Hipódromo Condesa",
    ciudad: "CDMX",
    meta: "3 rec · 120 m² · $8,900,000 MXN",
    precio: 8900000,
    m2: 120,
    recamaras: 3,
    estacionamientos: 2,
    dias: 84,
    score: 58,
    verdict: "Necesita Ajustes Urgentes",
    vcolor: "amber",
    ppm2: 74166,
    median: 66500,
    comps: 9,
    imagen: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    propietario: {
      nombre: "Carlos Mendoza",
      contacto: "55 4123 9876",
      captador: "Roberto Gómez (3R Connect)"
    },
    radarScores: {
      precio: 45,
      diasMercado: 38,
      fotos: 50,
      anuncio: 60,
      competencia: 55,
      difusion: 90
    },
    factores: [
      { k: "Precio vs Mercado", s: "red", iconName: "Tag", t: "11.5% arriba del promedio de 9 comparables directos ($74,166/m² vs $66,500/m²).", score: 45 },
      { k: "Días en Mercado", s: "amber", iconName: "Clock", t: "84 días publicado; la mediana en Hipódromo Condesa es de 42 días.", score: 38 },
      { k: "Calidad de Fotos (Visión IA)", s: "red", iconName: "Camera", t: "5 fotos en total; 2 están subexpuestas y no existe toma de la cocina ni la terraza.", score: 50 },
      { k: "Completitud del Anuncio", s: "amber", iconName: "FileText", t: "Falta costo de mantenimiento mensual ($3,500) y desglose de amenidades.", score: 60 },
      { k: "Presión de Competencia", s: "amber", iconName: "Users", t: "14 propiedades similares activas a <800m; 6 ofrecen mejor relación precio/m².", score: 55 },
      { k: "Red de Difusión", s: "green", iconName: "Share2", t: "Correctamente sincronizado en Inmuebles24, Lamudi, Vivanuncios y Red 3R.", score: 90 }
    ],
    receta: [
      { a: "Ajustar precio a $8,100,000 MXN (−8.9%)", imp: "+38% de prospectos calificados estimados", detail: "El ajuste posiciona el inmueble dentro del rango de filtro de los compradores en la zona." },
      { a: "Reportaje de fotos HDR + foto de cocina y terraza", imp: "Aumento estimado de +45% en CTR de portales", detail: "Visión IA identificó la ausencia de la cocina como el principal motivo de abandono visual." },
      { a: "Completar ficha técnica (mantenimiento y amenidades)", imp: "Mejor ranking en motores de búsqueda de portales", detail: "Inmuebles con ficha al 100% reciben prioridad en la reticulado de portales aliados." }
    ]
  },
  {
    id: "coyoacan",
    nombre: "Casa Residencial Coyoacán",
    colonia: "Del Carmen Coyoacán",
    ciudad: "CDMX",
    meta: "4 rec · 240 m² · $12,500,000 MXN",
    precio: 12500000,
    m2: 240,
    recamaras: 4,
    estacionamientos: 3,
    dias: 62,
    score: 79,
    verdict: "Propiedad Competitiva",
    vcolor: "green",
    ppm2: 52083,
    median: 53200,
    comps: 7,
    imagen: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    propietario: {
      nombre: "Dra. Beatriz Villarreal",
      contacto: "55 8899 3322",
      captador: "Ana Ruiz (3R Connect)"
    },
    radarScores: {
      precio: 88,
      diasMercado: 65,
      fotos: 85,
      anuncio: 90,
      competencia: 60,
      difusion: 40
    },
    factores: [
      { k: "Precio vs Mercado", s: "green", iconName: "Tag", t: "Alineada con el mercado ($52,083/m² vs $53,200/m² de la zona).", score: 88 },
      { k: "Días en Mercado", s: "amber", iconName: "Clock", t: "62 días activa; promedio de casas en Coyoacán es de 55 días.", score: 65 },
      { k: "Calidad de Fotos (Visión IA)", s: "green", iconName: "Camera", t: "16 fotografías en alta resolución con iluminación adecuada y encuadres limpios.", score: 85 },
      { k: "Completitud del Anuncio", s: "green", iconName: "FileText", t: "Anuncio completo con recorridos, jardín, estudio y planos de distribución.", score: 90 },
      { k: "Presión de Competencia", s: "amber", iconName: "Users", t: "Oferta moderada-alta de casas en fraccionamiento cerrado en la misma zona.", score: 60 },
      { k: "Red de Difusión", s: "red", iconName: "Share2", t: "Sólo publicada en portal propio y WhatsApp; falta sindicación a portales mayores.", score: 40 }
    ],
    receta: [
      { a: "Activar Sindicación Automática a Inmuebles24 y Propiedades.com", imp: "+120% en visibilidad y llamadas de prospectos", detail: "Aprovechar la alta calidad del anuncio para saturar canales con alta demanda." },
      { a: "Compartir en Red Co-Broker 3R Connect con atribución del 50%", imp: "Alcance instantáneo a +180 asesores externos", detail: "La propiedad está lista para venta; la red de asesores colaborativos agilizará el cierre." },
      { a: "Programar Open House presencial para asesores de la zona", imp: "Generación de 3 a 5 propuestas formales", detail: "Incentivar visitas con comisión acelerada en la red colaborativa." }
    ]
  },
  {
    id: "delvalle",
    nombre: "Departamento Del Valle Sur",
    colonia: "Del Valle Sur",
    ciudad: "CDMX",
    meta: "2 rec · 78 m² · $6,800,000 MXN",
    precio: 6800000,
    m2: 78,
    recamaras: 2,
    estacionamientos: 1,
    dias: 121,
    score: 41,
    verdict: "Estado Crítico de Estancamiento",
    vcolor: "red",
    ppm2: 87179,
    median: 71200,
    comps: 15,
    imagen: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    propietario: {
      nombre: "Ing. Fernando Alarcón",
      contacto: "55 6677 1144",
      captador: "Mauricio Silva (3R Connect)"
    },
    radarScores: {
      precio: 25,
      diasMercado: 20,
      fotos: 55,
      anuncio: 30,
      competencia: 25,
      difusion: 85
    },
    factores: [
      { k: "Precio vs Mercado", s: "red", iconName: "Tag", t: "22.4% por encima del precio de mercado ($87,179/m² vs $71,200/m²).", score: 25 },
      { k: "Días en Mercado", s: "red", iconName: "Clock", t: "121 días acumulados sin propuestas formales — alerta de 'propiedad quemada'.", score: 20 },
      { k: "Calidad de Fotos (Visión IA)", s: "amber", iconName: "Camera", t: "8 fotos regulares; iluminación amarilla desigual e inclinación de cámara.", score: 55 },
      { k: "Completitud del Anuncio", s: "red", iconName: "FileText", t: "Falta descripción de elevador, vigilancia 24/7 y costo de mantenimiento.", score: 30 },
      { k: "Presión de Competencia", s: "red", iconName: "Users", t: "15 departamentos más nuevos en Del Valle ofreciendo $1M menos con bodega.", score: 25 },
      { k: "Red de Difusión", s: "green", iconName: "Share2", t: "Activo en 4 portales masivos, pero el rebote es alto debido al sobreprecio.", score: 85 }
    ],
    receta: [
      { a: "Presentar informe Property Doctor al propietario para ajustar a $5,850,000 MXN", imp: "Reactivación inmediata del interés del mercado", detail: "Uso del reporte de evidencia con comparables para fundamentar el ajuste de precio sin fricción." },
      { a: "Renovación total de fotos con staging virtual", imp: "+60% de retención en la página de detalles", detail: "Sustituir fotografías oscuras por vistas iluminadas y render de posible remodelación." },
      { a: "Publicar relanzamiento como 'Oportunidad de la semana' en Red 3R", imp: "+15 citas agendadas en los primeros 7 días", detail: "El algoritmo prioriza propiedades ajustadas que ofrecen valor real frente al mercado." }
    ]
  }
];

export const SAMPLE_CHAT_MESSAGES: WhatsAppMessage[] = [
  { id: '1', sender: 'prospect', text: "Hola buenas tardes, vi la publicación del departamento en Condesa de $8.9M. ¿Sigue disponible?", time: "14:20" },
  { id: '2', sender: 'agent', text: "¡Hola! Con gusto, sí sigue disponible. Mi nombre es Ana Ruiz de 3R Connect. ¿Buscas para compra inmediata o inversión?", time: "14:22" },
  { id: '3', sender: 'prospect', text: "Para habitar. Nos urgen 2 o 3 recámaras por Condesa o Roma Norte porque entregamos el departamento actual en 60 días.", time: "14:24" },
  { id: '4', sender: 'prospect', text: "Nuestro presupuesto máximo con crédito preaprobado es de $8,500,000 MXN. Nos interesa mucho que tenga buena iluminación natural y 2 estacionamientos.", time: "14:25" }
];

export const INITIAL_PROSPECT_PROFILE: ProspectProfile = {
  nombre: "Lic. Alejandro Parra",
  presupuestoMax: 8500000,
  zonas: ["Condesa", "Roma Norte"],
  recamaras: 3,
  requisitos: ["Buena iluminación natural", "2 estacionamientos", "Elevador", "Crédito preaprobado"],
  urgencia: "Alta",
  urgenciaSignal: "red",
  estatus: "Calificado - Listo para Cita",
  siguientePaso: "Enviar ficha técnica de propiedad Condesa ajustada y agendar cita este sábado 11:00 AM."
};

export const INITIAL_PHOTO_AUDIT: PhotoAudit[] = [
  { id: 'p1', n: "Portada · Fachada Externa", s: "green", g: "linear-gradient(135deg, #1e3a8a, #3b82f6)", score: 92, diagnostico: "Excelente iluminación natural y encuadre simétrico.", sugerencia: "Mantener como foto de portada en portales." },
  { id: 'p2', n: "Sala Comedor · Iluminación", s: "red", g: "linear-gradient(135deg, #1f2937, #4b5563)", score: 38, diagnostico: "Subexpuesta (oscura), contrailuminación marcada y desorden visual.", sugerencia: "Volver a tomar de día con persianas abiertas." },
  { id: 'p3', n: "Recámara Principal", s: "amber", g: "linear-gradient(135deg, #4c1d95, #8b5cf6)", score: 68, diagnostico: "Ángulo estrecho, distorsión de lente en esquinas.", sugerencia: "Usar lente gran angular (0.5x) centrado a la cama." },
  { id: 'p4', n: "Baño Principal", s: "green", g: "linear-gradient(135deg, #065f46, #10b981)", score: 88, diagnostico: "Limpio, reflectancia adecuada y enfoque nítido.", sugerencia: "Apta para galería secundaria." },
  { id: 'p5', n: "Cocina Integral", s: "red", g: "linear-gradient(135deg, #991b1b, #ef4444)", score: 0, missing: true, diagnostico: "FOTO FALTANTE — Visión IA detecta ausencia total de cocina.", sugerencia: "CRÍTICO: Agregar mínimo 2 fotos de cocina de alta calidad." },
  { id: 'p6', n: "Balcón / Vista Exterior", s: "amber", g: "linear-gradient(135deg, #78350f, #f59e0b)", score: 62, diagnostico: "Horizontes inclinados 4°, reflejo en cristal.", sugerencia: "Enderezar horizonte y tomar desde esquina opuesta." }
];

export const COMPARABLES_DATA: ComparableProp[] = [
  { direccion: "Ámsterdam 142, Hipódromo Condesa", m2: 118, precio: 7850000, ppm2: 66525, distanciaKm: 0.2, diasEnMercado: 35, similitud: 94 },
  { direccion: "Michoacán 88, Hipódromo Condesa", m2: 125, precio: 8300000, ppm2: 66400, distanciaKm: 0.4, diasEnMercado: 41, similitud: 91 },
  { direccion: "Tamaulipas 54, Condesa", m2: 115, precio: 7680000, ppm2: 66782, distanciaKm: 0.5, diasEnMercado: 28, similitud: 89 },
  { direccion: "Av. México 19, Hipódromo Condesa", m2: 130, precio: 8700000, ppm2: 66923, distanciaKm: 0.6, diasEnMercado: 52, similitud: 86 }
];
