import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Creativity Lab — Gimnasio para creadores",
  description: "Entrena tus habilidades creativas con un mentor AI que te da feedback real.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary font-body">
        {children}
      </body>
    </html>
  );
}
