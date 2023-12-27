import { FormEvent, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import logoImg from "@/../public/logo.svg";
import Image from "next/image";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const { signIn } = useAuth();
  const inputEmail = useRef<HTMLInputElement | null>(null);
  const inputPassword = useRef<HTMLInputElement | null>(null);

  async function handleSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = inputEmail.current?.value;
    const password = inputPassword.current?.value;

    if (!email || !password) return;

    await signIn({ email, password });
    inputEmail.current !== null ? (inputEmail.current.value = "") : "";
    inputPassword.current !== null ? (inputPassword.current.value = "") : "";
  }
  return (
    <>
      <Head>
        <title>Abreu Pizza - Faça seu login</title>
      </Head>
      <main
        className={`flex h-screen flex-col items-center justify-center p-6`}
      >
        <Image src={logoImg} alt="Logo" />
        <div className="w-full max-w-screen-sm mt-8 flex flex-col items-center my-8">
          <form className="flex flex-col w-[90%]" onSubmit={handleSignIn}>
            <Input
              type="email"
              placeholder="Digite seu email"
              ref={inputEmail}
            />
            <Input
              type="password"
              placeholder="Digite sua senha"
              ref={inputPassword}
            />
            <Button loading={false} size="large">
              Acessar
            </Button>
          </form>
          <Link
            href={"/cadastro"}
            className="mt-4 text-foreground cursor-pointer"
          >
            Não possui uma conta? Cadastre-se
          </Link>
        </div>
      </main>
    </>
  );
}
