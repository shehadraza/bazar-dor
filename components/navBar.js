import Link from "next/link";
import NavLinks from "./navLink";
import AuthButtons from "./authButtons";
import BanglaDate from "./banglaDate";
import Ticker from "./ticker";
import { getCategories, getProducts } from "@/lib/api";

export default async function Navbar() {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);
  return (
    <header className="border-b border-green-100 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-green-700 text-xl">🛒</span>
          <span>
            <span className="block text-lg font-bold leading-tight">বাজার দর</span>
            <BanglaDate />
          </span>
        </Link>
        <AuthButtons />
      </div>
      <NavLinks categories={categories} />
      <Ticker products={products} />
    </header>
  );
}