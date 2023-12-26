import Head from "next/head";
import Link from "next/link";
import logoImg from "@/../public/logo.svg";
import Image from "next/image";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function Cadastro() {
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
          <form className="flex flex-col w-[90%]">
            <Input type="text" placeholder="Digite seu nome" />
            <Input type="email" placeholder="Digite seu email" />
            <Input type="password" placeholder="Digite sua senha" />
            <Button loading={false} size="large">
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
