import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      isAuth: false,
      setAuthInfo: (profileAuth) =>
        set(() => ({
          token: profileAuth.token,
          Nombre: profileAuth.Nombre,
          id: profileAuth.id,
          id_permiso: profileAuth.id_permiso,
        })),
      setLogout: () =>
        set(() => ({
          token: "",
          Nombre: "",
          id: "",
          id_permiso: "",
          isAuth: false
        })),
      setIsAuth: (isAuth) =>
        set(() => ({
          isAuth,
        })),
    }),
    {
      name: "auth",
    }
  )
);
