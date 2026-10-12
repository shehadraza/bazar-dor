"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks({ categories }) {
  const pathname = usePathname();
  return (
    <nav className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 pb-3">
      {categories.map((c) => {
        const active = pathname === `/category/${c.slug}`;
        return (
          <Link
            key={c.id}
            href={`/category/${c.slug}`}
            className={`flex shrink-0 items-center gap-1 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition ${
              active ? "bg-green-700 text-white" : "text-gray-700 hover:bg-green-50"
            }`}
          >
            <span>{c.icon}</span> {c.nameBn}
          </Link>
        );
      })}
    </nav>
  );
}