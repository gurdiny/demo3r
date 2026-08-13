export type Signal = 'green' | 'amber' | 'red';

export interface PropertyFactor {
  k: string;
  s: Signal;
  iconName: string;
  t: string;
  score: number;
}

export interface RecipeStep {
  a: string;
  imp: string;
  detail: string;
}

export interface Property {
  id: string;
  nombre: string;
  colonia: string;
  ciudad: string;
  meta: string;
  precio: number;
  m2: number;
  recamaras: number;
  estacionamientos: number;
  dias: number;
  score: number;
  verdict: string;
  vcolor: Signal;
  ppm2: number;
  median: number;
  comps: number;
  imagen: string;
  factores: PropertyFactor[];
  receta: RecipeStep[];
  propietario: {
    nombre: string;
    contacto: string;
    captador: string;
  };
  radarScores: {
    precio: number;
    diasMercado: number;
    fotos: number;
    anuncio: number;
    competencia: number;
    difusion: number;
  };
}

export interface WhatsAppMessage {
  id: string;
  sender: 'prospect' | 'agent' | 'system';
  text: string;
  time: string;
}

export interface ProspectProfile {
  nombre: string;
  presupuestoMax: number;
  zonas: string[];
  recamaras: number;
  requisitos: string[];
  urgencia: 'Alta' | 'Media' | 'Baja';
  urgenciaSignal: Signal;
  estatus: string;
  siguientePaso: string;
}

export interface PhotoAudit {
  id: string;
  n: string;
  s: Signal;
  g: string;
  missing?: boolean;
  score: number;
  diagnostico: string;
  sugerencia: string;
}

export interface ComparableProp {
  direccion: string;
  m2: number;
  precio: number;
  ppm2: number;
  distanciaKm: number;
  diasEnMercado: number;
  similitud: number;
}
