import Head from "next/head";
import Link from "next/link";
import logoImg from "@/../public/logo.svg";
import Image from "next/image";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function Admin() {
  return (
    <>
      <Head>
        <title>Abreu Pizza - Admin</title>
      </Head>
      <main
        className={`flex h-screen flex-col items-center justify-center p-6`}
      ></main>
    </>
  );
}
