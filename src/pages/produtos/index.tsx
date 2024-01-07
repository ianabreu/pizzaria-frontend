import { ChangeEvent, FormEvent, useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

import { Container } from "../../components/layout/container-view";
import { Header } from "../../components/layout/header";
import { UIButton } from "../../components/ui/button-ui";
import { Input, TextArea } from "../../components/ui/input-ui";
import { Title } from "../../components/ui/title";
import { Icons } from "../../constants/Icons";

import { setupAPIClient } from "../../services/api";
import { api } from "../../services/apiClient";
import { canSSRAuth } from "../../utils/canSSRAuth";

type Category = {
  id: string;
  name: string;
};
interface ProductPageProps {
  categories: Category[];
}

export default function ProductPage({ categories }: ProductPageProps) {
  const [loading, setLoading] = useState(false);

  const [avatarURL, setAvatarURL] = useState("");
  const [avatarImage, setAvatarImage] = useState<File | null>(null);

  const inputName = useRef<HTMLInputElement | null>(null);
  const inputPrice = useRef<HTMLInputElement | null>(null);
  const inputDescription = useRef<HTMLTextAreaElement | null>(null);

  const [categorySelected, setCategorySelected] = useState(-1);

  async function handleRegister(event: FormEvent) {
    event.preventDefault();
    try {
      const name = inputName.current?.value.trim();
      const price = inputPrice.current?.value.trim();
      const description = inputDescription.current?.value.trim();

      const data = new FormData();
      if (
        categorySelected === -1 ||
        !name ||
        !price ||
        !description ||
        avatarImage === null
      ) {
        toast.error("Preencha todos os campos!");
        return;
      }

      setLoading(true);
      data.append("name", name);
      data.append("price", price);
      data.append("description", description);
      data.append("banner", avatarImage);
      data.append("category_id", categories[categorySelected].id);

      await api.post("/product", data);

      toast.success("Produto cadastrado com sucesso!");
      inputName.current !== null ? (inputName.current.value = "") : "";
      inputPrice.current !== null ? (inputPrice.current.value = "") : "";
      inputDescription.current !== null
        ? (inputDescription.current.value = "")
        : "";
      setCategorySelected(-1);
      setAvatarURL("");
      setAvatarImage(null);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.error === "error upload file") {
          toast.error("Erro ao salvar a foto do produto.");
          return;
        }
      }
      toast.error("Erro ao cadastrar o produto.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }
    const image = event.target.files[0];
    if (!image) {
      return;
    }
    if (
      image.type === "image/png" ||
      image.type === "image/jpg" ||
      image.type === "image/jpeg"
    ) {
      setAvatarImage(image);
      setAvatarURL(URL.createObjectURL(image));
    }
  }
  function handleChangeCategory(event: ChangeEvent<HTMLSelectElement>) {
    setCategorySelected(Number(event.target.value));
  }

  return (
    <>
      <Head>
        <title>Produtos - Abreu Pizza</title>
      </Head>
      <Header />
      <Container>
        <Title>Novo produto</Title>
        <form className="flex flex-col my-4" onSubmit={handleRegister}>
          <label
            className="w-full bg-input h-64 mb-4 rounded-md text-foreground border-[1px] cursor-pointer flex items-center justify-center"
            htmlFor="banner"
          >
            <input
              type="file"
              accept="image/png, image/jpg, image/jpeg"
              className="hidden"
              id="banner"
              onChange={handleFile}
            />
            <span className="z-50 absolute opacity-70 transition-all duration-300 hover:opacity-100 hover:scale-125">
              {Icons["upload"]}
            </span>
            {avatarURL && (
              <Image
                src={avatarURL}
                alt="Foto do Produto"
                className="w-full h-full object-cover rounded-md border-[1px]"
                width={0}
                height={0}
                priority
                sizes="100vw"
              />
            )}
          </label>

          <select
            value={categorySelected}
            className="mb-4 rounded-md bg-input text-foreground py-2 px-3 border-[1px] placeholder:text-opacity-80"
            onChange={handleChangeCategory}
          >
            <option disabled value={-1}>
              -- Selecione uma categoria --
            </option>
            {categories.map((item, index) => (
              <option key={item.id} value={index}>
                {item.name}
              </option>
            ))}
          </select>

          <Input type="text" placeholder="Digite um nome" ref={inputName} />

          <Input
            type="number"
            step={0.01}
            placeholder="Digite o preço"
            ref={inputPrice}
          />

          <TextArea
            ref={inputDescription}
            placeholder="Descreva seu produto..."
          />

          <UIButton
            variant="secondary"
            size="large"
            type="submit"
            loading={loading}
          >
            Cadastrar
          </UIButton>
        </form>
      </Container>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (context) => {
  const apiClient = setupAPIClient(context);
  const response = await apiClient.get("/category");

  return {
    props: {
      categories: response.data,
    },
  };
});
