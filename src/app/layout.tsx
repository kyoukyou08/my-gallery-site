import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className={` antialiased`}>{children}</body>
    </html>
  );
}
