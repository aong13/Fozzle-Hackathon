import { create } from "zustand";

const useToastStore = create((set) => ({
  toasts: [],
  addToast: (message) =>
    set((state) => ({
      toasts: [...state.toasts, { id: Date.now(), message }],
    })),
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}));

export default useToastStore;
