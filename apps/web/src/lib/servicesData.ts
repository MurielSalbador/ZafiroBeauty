export type Service = {
  id: string;
  name: string;
  price: number;
  category: "COMBOS" | "COMBOS INICIO" | "ZONAS SEPARADAS" | "FACIAL";
};

export const SERVICES: Service[] = [
  // COMBOS
  { id: "test1", name: "TEST - Servicio de Prueba", price: 0.2, category: "COMBOS" },
  { id: "c1", name: "Bozo + Mentón", price: 13000, category: "COMBOS" },
  { id: "c2", name: "Rostro completo", price: 17000, category: "COMBOS" },
  { id: "c3", name: "Cavado completo + Axilas + Brazos", price: 24000, category: "COMBOS" },
  { id: "c4", name: "Cavado completo + Axilas + Media pierna", price: 24000, category: "COMBOS" },
  { id: "c5", name: "Rostro + Axilas + Media pierna", price: 26000, category: "COMBOS" },
  { id: "c6", name: "Cavado bikini + Glúteos + Tira de cola", price: 18000, category: "COMBOS" },
  { id: "c7", name: "Bozo + Axilas + Media pierna", price: 20000, category: "COMBOS" },
  { id: "c8", name: "Piernas completas + Axilas", price: 24000, category: "COMBOS" },
  { id: "c9", name: "Piernas completas + Axilas + Cavado bikini", price: 26000, category: "COMBOS" },
  { id: "c10", name: "Rostro completo + Axilas", price: 22000, category: "COMBOS" },
  { id: "c11", name: "Cuerpo Completo (Promo)", price: 38000, category: "COMBOS" },
  { id: "c12", name: "Piernas completas", price: 24000, category: "COMBOS" },
  { id: "c13", name: "Pecho + Abdomen", price: 24000, category: "COMBOS" },
  { id: "c14", name: "Pecho + Abdomen + Espalda", price: 30000, category: "COMBOS" },
  { id: "c15", name: "Rostro + Axilas", price: 16000, category: "COMBOS" },
  { id: "c16", name: "Pecho", price: 13000, category: "COMBOS" },
  { id: "c17", name: "Espalda + Medio brazo", price: 22000, category: "COMBOS" },
  { id: "c18", name: "Pecho + Abdomen + Medio brazo", price: 26000, category: "COMBOS" },
  { id: "c19", name: "Espalda + Hombros + Brazos", price: 26000, category: "COMBOS" },
  { id: "c20", name: "Pecho + Abdomen + Brazos", price: 26000, category: "COMBOS" },
  { id: "c21", name: "Espalda + Brazos + Axilas", price: 26000, category: "COMBOS" },
  { id: "c22", name: "Cuerpo Completo Masculino", price: 43000, category: "COMBOS" },

  // COMBOS INICIO
  { id: "ci1", name: "Bozo + Axilas", price: 10500, category: "COMBOS INICIO" },
  { id: "ci2", name: "Axilas + Media Pierna", price: 13500, category: "COMBOS INICIO" },
  { id: "ci3", name: "Cavado Simple + Axilas", price: 14500, category: "COMBOS INICIO" },
  { id: "ci4", name: "Piernas Completas + Axilas + Bozo", price: 19500, category: "COMBOS INICIO" },
  { id: "ci5", name: "Pecho + Abdomen", price: 15000, category: "COMBOS INICIO" },
  { id: "ci6", name: "Espalda Completa", price: 17500, category: "COMBOS INICIO" },
  { id: "ci7", name: "Axilas + Pecho", price: 13000, category: "COMBOS INICIO" },
  { id: "ci8", name: "Piernas Completas", price: 20500, category: "COMBOS INICIO" },

  // ZONAS SEPARADAS
  { id: "z1", name: "Bozo", price: 5000, category: "ZONAS SEPARADAS" },
  { id: "z2", name: "Mentón", price: 5000, category: "ZONAS SEPARADAS" },
  { id: "z3", name: "Axilas", price: 7000, category: "ZONAS SEPARADAS" },
  { id: "z4", name: "Media pierna", price: 9000, category: "ZONAS SEPARADAS" },
  { id: "z5", name: "Piernas completas", price: 14000, category: "ZONAS SEPARADAS" },
  { id: "z6", name: "Cavado simple", price: 8000, category: "ZONAS SEPARADAS" },
  { id: "z7", name: "Cavado completo", price: 11000, category: "ZONAS SEPARADAS" },
  { id: "z8", name: "Tira de cola", price: 6000, category: "ZONAS SEPARADAS" },
  { id: "z9", name: "Glúteos", price: 8000, category: "ZONAS SEPARADAS" },
  { id: "z10", name: "Brazos completos", price: 18000, category: "ZONAS SEPARADAS" },
  { id: "z11", name: "Medio brazo", price: 12000, category: "ZONAS SEPARADAS" },
  { id: "z12", name: "Espalda completa", price: 20000, category: "ZONAS SEPARADAS" },
  { id: "z13", name: "Pecho", price: 13000, category: "ZONAS SEPARADAS" },
  { id: "z14", name: "Abdomen", price: 11000, category: "ZONAS SEPARADAS" },
  { id: "z15", name: "Hombros", price: 8000, category: "ZONAS SEPARADAS" },

  // FACIAL
  { id: "f1", name: "Limpieza facial profunda", price: 15000, category: "FACIAL" },
  { id: "f2", name: "Hidratación facial", price: 12000, category: "FACIAL" },
  { id: "f3", name: "Punta diamante + Hidratación", price: 18000, category: "FACIAL" },
];
