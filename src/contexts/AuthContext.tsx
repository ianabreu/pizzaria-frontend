import { createContext, ReactNode, useContext, useState } from "react";
import { destroyCookie, setCookie } from "nookies";
import Router from "next/router";
import { api } from "@/services/apiClient";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

type AuthContextData = {
  user: UserProps | undefined;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signUp: (credentials: SignUpProps) => Promise<void>;
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
type SignUpProps = {
  name: string;
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
      const { id, name, token } = response.data as {
        id: string;
        name: string;
        token: string;
      };
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

      toast.success("Login efetuado com sucesso!");

      Router.push("/admin");
    } catch (error) {
      destroyCookie(undefined, "@pizzaria.token");
      if (error instanceof AxiosError) {
        if (error.response?.data.error === "user/password incorrect") {
          toast.error("Email ou senha incorretos.");
          return;
        } else {
          toast.error("Erro ao fazer login.");
          return;
        }
      } else {
        console.log(error);
        toast.error("Erro ao acessar.");
      }
    }
  }
  async function signUp({ name, email, password }: SignUpProps) {
    try {
      const response = await api.post("/users", { name, email, password });
      toast.success("Cadastro efetuado com sucesso!");
      Router.push("/");
    } catch (error) {
      toast.error("Erro ao cadastrar.");
      console.log(error);
    }
  }
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        signIn,
        signUp,
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
