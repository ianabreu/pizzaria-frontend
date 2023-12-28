import { createContext, ReactNode, useContext, useState } from "react";
import { destroyCookie, setCookie } from "nookies";
import Router from "next/router";
import { api } from "@/services/apiClient";
import { AxiosError } from "axios";

type AuthContextData = {
  user: UserProps | undefined;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
};
type UserProps = {
  id: string;
  name: string;
  email: string;
};
type SignInProps = {
  email: string;
  password: string;
};
type AuthProviderProps = {
  children: ReactNode;
};
const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  try {
    destroyCookie(undefined, "@pizzaria.token");
    Router.push("/");
  } catch (error) {
    console.log("erro ao deslogar");
  }
}
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;
  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post("/session", { email, password });
      const { id, name, token } = response.data;
      setCookie(undefined, "@pizzaria.token", token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
      setUser({
        id,
        name,
        email,
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      Router.push("/admin");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data.error);
      } else {
        console.log(error);
      }
      destroyCookie(undefined, "@pizzaria.token");
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Fora do contexto");
  }
  return context;
}
