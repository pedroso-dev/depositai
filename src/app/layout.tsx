import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Depositaí",
    default: "Depositaí - Seu Desafio de Poupança Personalizado",
  },
  description:
    "Crie, acompanhe e conquiste seus desafios de poupança de forma fácil e visual. Comece a guardar dinheiro hoje com o Depositaí!",

  openGraph: {
    title: "Depositaí - Seu Desafio de Poupança Personalizado",
    description:
      "Crie e acompanhe desafios de poupança de forma fácil e visual.",
    siteName: "Depositaí",
    locale: "pt_BR",
    type: "website",
    // images: "",
  },

  robots: {
    index: true,
    follow: true,
  },
  // manifest: "/manifest.json",
  // icons: {
  //   icon: "",
  //   apple: "",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
