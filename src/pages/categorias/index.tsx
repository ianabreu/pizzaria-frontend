import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { api } from "@/services/apiClient";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { AxiosError } from "axios";
import Head from "next/head";
import { FormEvent, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function CategoryPage() {
  const inputCategory = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  async function handleRegister(event: FormEvent) {
    event.preventDefault();
    const categoryName = inputCategory.current?.value.trim();
    if (!categoryName) {
      toast.error("Digite um nome válido!");
      return;
    }
    setLoading(true);
    try {
      await api.post("/category", { name: categoryName });
      toast.success("Categoria cadastrada com sucesso!");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.error === "category already exists") {
          toast.error("Categoria já cadastrada!");
          return;
        }
        if (error.response?.data.error === "name invalid") {
          toast.error("Digite um nome válido!");
          return;
        }
      }
      toast.error("Erro ao cadastrar categoria.");
      console.log(error);
    } finally {
      inputCategory.current !== null ? (inputCategory.current.value = "") : "";
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Categorias - Abreu Pizza</title>
      </Head>
      <>
        <Header />
        <main
          className={`flex max-w-screen-md my-16 mx-auto flex-col px-4 justify-between`}
        >
          <h1 className="font-bold text-xl">Cadastrar categorias</h1>
          <form className="flex flex-col my-4" onSubmit={handleRegister}>
            <Input
              type="text"
              placeholder="Digite o nome da categoria"
              ref={inputCategory}
            />
            <Button
              variant="secondary"
              size="large"
              type="submit"
              loading={loading}
            >
              Cadastrar
            </Button>
          </form>
        </main>
      </>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (context) => {
  return {
    props: {},
  };
});
