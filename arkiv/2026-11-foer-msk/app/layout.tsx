import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cortex",
  description: "Din personlige kliniske frasebank"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="da">
      <body>{children}</body>
    </html>
  );
}
