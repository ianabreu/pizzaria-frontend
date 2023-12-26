import { createContext, ReactNode, useContext, useState } from "react";

type AuthContextData = {
  user: UserProps | undefined;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
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

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;
  async function signIn({ email, password }: SignInProps) {
    console.log(email);
    console.log(password);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        signIn,
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
