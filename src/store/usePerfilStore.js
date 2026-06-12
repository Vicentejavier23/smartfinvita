import { create } from 'zustand';

export const usePerfilStore = create((set) => ({
  edad: 30,
  ingresos: 900000,
  tolerancia: 'medio',
  resultado: null,
  setEdad: (v) => set({ edad: v }),
  setIngresos: (v) => set({ ingresos: v }),
  setTolerancia: (v) => set({ tolerancia: v }),
  setResultado: (v) => set({ resultado: v }),
  reset: () => set({ edad: 30, ingresos: 900000, tolerancia: 'medio', resultado: null }),
}));
