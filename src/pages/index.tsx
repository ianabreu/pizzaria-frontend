import Head from "next/head";
import Link from "next/link";
import logoImg from "@/../public/logo.svg";
import Image from "next/image";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function Home() {
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
          <form className="flex flex-col w-[90%]">
            <Input type="email" placeholder="Digite seu email" />
            <Input type="password" placeholder="Digite sua senha" />
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
