import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartProvider } from "@/components/cart/cart-provider";

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://bella-pizza-januaria.ardent-bream-3273.chatgpt.site",
  ),
  title: {
    default: "Bella Pizza · Januária, MG",
    template: "%s · Bella Pizza",
  },
  description:
    "Bella Pizza em Januária. Conheça a marca, encontre os contatos e veja a apresentação do futuro canal próprio de pedidos.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Bella Pizza · Sua noite pede Bella.",
    description:
      "Bella Pizza em Januária, Minas Gerais. Uma boa pizza, uma boa companhia.",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bella Pizza · Januária",
    images: ["/images/og.jpg"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <CartProvider>
          <a className="skip-link" href="#main">
            Ir ao conteúdo
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
