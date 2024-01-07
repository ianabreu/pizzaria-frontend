import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import Router from "next/router";
import { AxiosError } from "axios";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import toast from "react-hot-toast";

import { api } from "../services/apiClient";

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
    destroyCookie(undefined, process.env.NEXT_PUBLIC_TOKEN_COOKIE);
    Router.push("/");
  } catch (error) {
    console.log("erro ao deslogar");
  }
}
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;

  useEffect(() => {
    const cookies = parseCookies();
    if (cookies[process.env.NEXT_PUBLIC_TOKEN_COOKIE]) {
      api
        .get("/me")
        .then((response) => {
          const { id, name, email } = response.data;
          setUser({ id, email, name });
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post("/session", { email, password });
      const { id, name, token } = response.data as {
        id: string;
        name: string;
        token: string;
      };
      setCookie(undefined, process.env.NEXT_PUBLIC_TOKEN_COOKIE, token, {
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

      Router.push("/painel");
    } catch (error) {
      destroyCookie(undefined, process.env.NEXT_PUBLIC_TOKEN_COOKIE);
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
