import { FormEvent, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import logoImg from "@/../public/logo.svg";
import Image from "next/image";
import { GetServerSideProps } from "next";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";
import { canSSRGuest } from "@/utils/canSSRGuest";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const inputEmail = useRef<HTMLInputElement | null>(null);
  const inputPassword = useRef<HTMLInputElement | null>(null);

  async function handleSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = inputEmail.current?.value;
    const password = inputPassword.current?.value;

    if (!email || !password) {
      toast.error("Preencha todos os campos!");
      return;
    }
    setLoading(true);
    await signIn({ email, password });
    setLoading(false);
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
            <Button loading={loading} size="large">
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

export const getServerSideProps = canSSRGuest(async (context) => {
  return {
    props: {},
  };
});
