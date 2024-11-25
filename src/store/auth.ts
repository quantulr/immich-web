import { create } from "zustand";
import Cookies from "js-cookie";
import { login, logout } from "@immich/sdk";

interface AuthState {
  immichIsAuthenticated?: boolean;
  immichLogin: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => void;
  immichLogout: () => void;
}

const isAuthenticated = (): boolean | undefined => {
  const isAuthenticated = Cookies.get("immich_is_authenticated");
  return isAuthenticated === "true"
    ? true
    : isAuthenticated === "false"
      ? false
      : undefined;
};

const useAuthStore = create<AuthState>()((set) => ({
  immichIsAuthenticated: isAuthenticated(),
  immichLogin: ({ email, password }) => {
    login(
      {
        loginCredentialDto: {
          email,
          password,
        },
      },
      {
        baseUrl: "/api",
      },
    ).then(() => {
      set({
        immichIsAuthenticated: isAuthenticated(),
      });
    });
  },
  immichLogout: () => {
    logout().then(() => {
      set({
        immichIsAuthenticated: isAuthenticated(),
      });
    });
  },
}));

export default useAuthStore;
