import Link from "next/link";
import ChangeBadge from "./changeBadge";
import { toBn, unitFull } from "@/lib/format";

export default function ProductCard({ p }) {
  return (
    <Link
      href={`/product/${p.slug}`}
      className="block rounded-xl border border-green-100 bg-white p-3.5 shadow-sm transition hover:border-green-400 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gray-100 text-xl">{p.image}</span>
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold">{p.nameBn}</h3>
          <p className="text-[11px] text-gray-500">{unitFull(p.unit)}</p>
        </div>
      </div>
      <div className="mt-3">
        <p className="text-[11px] text-gray-500">আজকের দাম</p>
        <div className="flex items-center justify-between gap-2">
          <p className="text-base font-bold">{toBn(p.today)} টাকা</p>
          <ChangeBadge change={p.change} />
        </div>
      </div>
    </Link>
  );
}