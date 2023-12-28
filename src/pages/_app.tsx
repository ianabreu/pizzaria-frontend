import { AuthProvider } from "@/contexts/AuthContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import { Toaster } from "react-hot-toast";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${roboto.className} min-h-screen overflow-hidden`}>
      <AuthProvider>
        <Component {...pageProps} />
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 3000,
            style: {
              background: "var(--gray-100)",
              color: "var(--dark-700)",
            },
            success: {
              style: {
                background: "var(--green-500)",
                color: "var(--white)",
              },
              iconTheme: {
                primary: "var(--green-500)",
                secondary: "var(--white)",
              },
            },
            error: {
              style: {
                background: "var(--red-500)",
                color: "var(--white)",
              },
              iconTheme: {
                primary: "var(--red-500)",
                secondary: "var(--white)",
              },
            },
          }}
        />
      </AuthProvider>
    </div>
  );
}
