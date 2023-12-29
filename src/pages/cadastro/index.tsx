import Head from "next/head";
import Link from "next/link";
import logoImg from "@/../public/logo.svg";
import Image from "next/image";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { FormEvent, useRef, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";
import { canSSRGuest } from "@/utils/canSSRGuest";

export default function Cadastro() {
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const inputName = useRef<HTMLInputElement | null>(null);
  const inputEmail = useRef<HTMLInputElement | null>(null);
  const inputPassword = useRef<HTMLInputElement | null>(null);

  async function handleSignUp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = inputName.current?.value.trim();
    const email = inputEmail.current?.value.trim();
    const password = inputPassword.current?.value;

    if (!name || !email || !password) {
      toast.error("Preencha todos os campos!");

      return;
    }
    setLoading(true);
    await signUp({ name, email, password });
    setLoading(false);
  }
  return (
    <>
      <Head>
        <title>Abreu Pizza - Faça seu cadastro</title>
      </Head>
      <main
        className={`flex h-screen flex-col items-center justify-center p-6`}
      >
        <Image src={logoImg} alt="Logo" />
        <div className="w-full max-w-screen-sm mt-8 flex flex-col items-center my-8">
          <h1 className="text-foreground mb-4 text-lg font-bold">
            Criando sua conta
          </h1>
          <form className="flex flex-col w-[90%]" onSubmit={handleSignUp}>
            <Input type="text" placeholder="Digite seu nome" ref={inputName} />
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
            <Button loading={loading} size="large">
              Cadastrar
            </Button>
          </form>
          <Link href={"/"} className="mt-4 text-foreground cursor-pointer">
            Já possui uma conta? Faça login!
          </Link>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps = canSSRGuest(async (context) => {
  return {
    props: {},
  };
});
