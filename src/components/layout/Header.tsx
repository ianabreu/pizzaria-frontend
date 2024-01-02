import Link from "next/link";
import { FiLogOut } from "react-icons/fi";
import { NavLink } from "@/components/ui/header-link";
import { useAuth } from "@/contexts/AuthContext";
import { Dialog } from "../ui/alert-modal";
import { useState } from "react";
import { Logo } from "../ui/logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const { signOut } = useAuth();
  return (
    <header className={`sm:h-20 w-full`}>
      <div className="h-full max-w-6xl mx-auto my-0 px-4 flex sm:flex-row flex-col items-center justify-between py-8">
        <Link href={"/admin"}>
          <Logo src={"/logo.svg"} alt="Logo" className="w-[190px] h-auto" />
        </Link>
        <nav className="flex items-center gap-4">
          <NavLink href={"/categorias"}>Categorias</NavLink>
          <NavLink href={"/produtos"}>Produtos</NavLink>
          <button
            className="px-4 py-2 hover:scale-125 transition"
            onClick={() => {
              setOpen(true);
            }}
          >
            <FiLogOut />
          </button>
        </nav>
        {Dialog(
          {
            isOpen: open,
            openModal: () => setOpen(false),
            title: "Você tem certeza?",
            message: "Você será deslogado da aplicação!",
            confirmButtonText: "Sim",
            showCancelButton: true,
          },
          signOut
        )}
      </div>
    </header>
  );
}
