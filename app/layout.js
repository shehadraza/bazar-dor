import "./globals.css";
import { Hind_Siliguri } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/navBar";
import Footer from "@/components/fotter";

const font = Hind_Siliguri({ subsets: ["bengali", "latin"], weight: ["400", "500", "600", "700"] });

export const metadata = {
  title: "বাজার দর",
  description: "প্রয়োজনীয় পণ্যের আজকের বাজার দর এক নজরে",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body className={`${font.className} flex min-h-screen flex-col`}>
        <Toaster position="top-center" />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}