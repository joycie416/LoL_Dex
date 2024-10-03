import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png";

export const metadata: Metadata = {
  title: "LoL Info",
  description: "Information App for LoL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black">
        <header className="nav-bar px-4 py-1 bg-black sticky top-0 z-10">
          <nav className="nav-bar text-lg w-full flex justify-between items-center">
            <Link href={"/"}>
              <Image src={logo} alt="LoL-logo.png"
          style={{
            aspectRatio: "348/209",
            width:'100%',
            maxWidth: 150,
            height: "auto",
            objectFit: "cover",
          }} />
            </Link>
            <ul className="flex gap-4">
              <li>
                <Link href={"/champions"}>Champions</Link>
              </li>
              <li>
                <Link href={"/items"}>Items</Link>
              </li>
              <li>
                <Link href={"/rotation"}>Rotation</Link>
              </li>
            </ul>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
