import { AuthProvider } from "@/contexts/AuthContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${roboto.className} min-h-screen overflow-hidden`}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </div>
  );
}
