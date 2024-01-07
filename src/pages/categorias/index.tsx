import { FormEvent, useRef, useState } from "react";
import Head from "next/head";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

import { Container, Header } from "../../components/layout";
import { Button, Input, Title } from "../../components/ui";

import { api } from "../../services/apiClient";
import { canSSRAuth } from "../../utils/canSSRAuth";

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
        <Container>
          <Title>Nova categoria</Title>
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
        </Container>{" "}
      </>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (context) => {
  return {
    props: {},
  };
});
