import Link from "next/link";
import { notFound } from "next/navigation";
import ChangeBadge from "@/components/changeBadge";
import { getProducts } from "@/lib/api";
import { toBn, unitFull, unitShort } from "@/lib/format";

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const products = await getProducts();
  const p = products.find((x) => x.slug === slug);
  if (!p) notFound();

  const min = Math.min(...p.markets.map((m) => m.min));
  const max = Math.max(...p.markets.map((m) => m.max));
  const avg = p.markets.reduce((s, m) => s + (m.min + m.max) / 2, 0) / p.markets.length;
  const diff = p.today - p.yesterday;
  const money = (n) => toBn(n, { maximumFractionDigits: 2 }) + " টাকা";

  const stats = [
    { label: "সর্বনিম্ন দাম", value: min, color: "text-green-700" },
    { label: "সর্বোচ্চ দাম", value: max, color: "text-red-600" },
    { label: "গড় দাম", value: Math.round(avg), color: "text-gray-900" },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8">
      <p className="text-sm text-gray-500">
        <Link href="/" className="hover:underline">হোম</Link> {">"}{" "}
        <Link href={`/category/${p.category}`} className="hover:underline">{p.categoryNameBn}</Link> {">"} {p.nameBn}
      </p>

      <section className="flex flex-col gap-4 rounded-2xl border border-green-100 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-green-50 text-4xl">{p.image}</span>
          <div>
            <h1 className="text-2xl font-bold">{p.nameBn}</h1>
            <div className="mt-1 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-green-800">{p.categoryNameBn}</span>
              <span className="rounded-full bg-gray-100 px-2 py-0.5">{unitFull(p.unit)}</span>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              গতকালের তুলনায় আজ দাম {diff > 0 ? "বেড়েছে" : diff < 0 ? "কমেছে" : "অপরিবর্তিত"}
              {diff !== 0 && <> {toBn(Math.abs(diff))} টাকা</>}
            </p>
          </div>
        </div>
        <div className="rounded-xl bg-green-50 p-4 text-center">
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="text-3xl font-bold">{toBn(p.today)}</p>
          <p className="text-xs text-gray-600">টাকা/{unitShort(p.unit)}</p>
          <div className="mt-1"><ChangeBadge change={p.change} /></div>
        </div>
      </section>

      <section className="rounded-2xl border border-green-100 bg-white p-5">
        <h2 className="mb-3 text-lg font-bold">দামের সারসংক্ষেপ</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-green-100 p-4">
              <p className="text-xs text-gray-500">{s.label}</p>
              <p className={`text-2xl font-bold ${s.color}`}>{toBn(s.value)} <span className="text-sm">টাকা</span></p>
              <p className="text-xs text-gray-500">{unitFull(p.unit)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-green-100 bg-white p-5">
        <h2 className="mb-3 text-lg font-bold">বাজারভিত্তিক আজকের দাম</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr className="bg-green-50 text-left">
                {["বাজার", "বিভাগ", "সর্বনিম্ন", "সর্বোচ্চ", "গড়"].map((h) => (
                  <th key={h} className="border border-green-100 px-3 py-2 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {p.markets.map((m, i) => (
                <tr key={i} className="odd:bg-white even:bg-green-50/40">
                  <td className="border border-green-100 px-3 py-2">{m.market}</td>
                  <td className="border border-green-100 px-3 py-2">{m.division}</td>
                  <td className="border border-green-100 px-3 py-2">{money(m.min)}</td>
                  <td className="border border-green-100 px-3 py-2">{money(m.max)}</td>
                  <td className="border border-green-100 px-3 py-2 font-semibold">{money((m.min + m.max) / 2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}