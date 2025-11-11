import type { Metadata } from "next";
import "./globals.css";
import Header from "./_components/Header/page";
import Footer from "./_components/Footer/Footer";

export const metadata: Metadata = {
  title: "Gallery",
  description: "you can see photos that I took somewhere.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="ja">
        <Header />
        <body className={` antialiased`}>{children}</body>
        <Footer />
      </html>
    </>
  );
}
