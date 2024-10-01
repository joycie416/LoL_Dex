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
        <header className="nav-bar px-4 py-1 bg-black sticky top-0 z-1">
          <nav className="w-full flex justify-between items-center">
            <Link href={"/"}>
              <Image src={logo} width={150} height={100} alt="LoL-logo.png" />
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
