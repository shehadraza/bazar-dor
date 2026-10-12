import ProductGrid from "@/components/productGrid";
import BanglaDate from "@/components/banglaDate";
import { getProducts } from "@/lib/api";
import { toBn } from "@/lib/format";

function Basket() {
  return (
    <svg viewBox="0 0 240 180" className="w-full max-w-[260px]" aria-hidden="true">
      <ellipse cx="120" cy="167" rx="85" ry="7" fill="#e5e7eb" />
      <circle cx="140" cy="52" r="30" fill="#22c55e" />
      <circle cx="95" cy="62" r="28" fill="#ef4444" />
      <circle cx="172" cy="84" r="17" fill="#fb923c" />
      <circle cx="75" cy="88" r="17" fill="#a855f7" />
      <circle cx="120" cy="82" r="16" fill="#f59e0b" />
      <path d="M45 88h150l-14 74H59z" fill="#a0522d" />
      <rect x="40" y="80" width="160" height="12" rx="4" fill="#7c3f1d" />
      <path d="M75 92l6 70M105 92l3 70M135 92l-3 70M165 92l-6 70" stroke="#7c3f1d" strokeWidth="3" />
      <path d="M52 118h136M56 140h128" stroke="#7c3f1d" strokeWidth="3" />
    </svg>
  );
}

export default async function Home() {
  const products = await getProducts();

  if (!products.length) {
    return <p className="p-10 text-center">ডেটা লোড করা যায়নি। একটু পরে আবার চেষ্টা করুন।</p>;
  }

  const risers = products.filter((p) => p.change.dir === "up").sort((a, b) => b.change.pct - a.change.pct).slice(0, 6);
  const fallers = products.filter((p) => p.change.dir === "down").sort((a, b) => a.change.pct - b.change.pct).slice(0, 6);

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8">
      {/* HERO */}
      <section className="grid items-center gap-6 rounded-2xl border border-green-100 bg-white p-6 md:grid-cols-[1.5fr_1fr] md:p-10">
        <div>
          <BanglaDate className="inline-block min-h-6 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800" />
          <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">আজকের বাজারের দাম এক নজরে</h1>
          <p className="mt-3 max-w-xl text-sm text-gray-600 sm:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলা — বাজারভিত্তিক বিস্তারিত, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a
            href="#সব-পণ্য"
            className="mt-5 inline-block rounded-lg border border-green-600 bg-green-50 px-5 py-2.5 text-sm font-semibold text-green-700 transition hover:bg-green-700 hover:text-white"
          >
            সব পণ্য দেখুন
          </a>
        </div>
        <div className="flex justify-center md:justify-end">
          <Basket />
        </div>
      </section>

      {/* A */}
      <section>
        <h2 className="mb-3 flex items-center gap-2 text-lg font-bold">
          <span className="text-xs text-red-600">▲</span> আজ দাম বেড়েছে
        </h2>
        <ProductGrid products={risers} />
      </section>

      {/* B */}
      <section>
        <h2 className="mb-3 flex items-center gap-2 text-lg font-bold">
          <span className="text-xs text-green-700">▼</span> আজ দাম কমেছে
        </h2>
        <ProductGrid products={fallers} />
      </section>

      {/* C */}
      <section id="সব-পণ্য" className="scroll-mt-4">
        <h2 className="text-lg font-bold">সব পণ্য</h2>
        <p className="mb-3 text-xs text-gray-500">মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে</p>
        <ProductGrid products={products} />
      </section>
    </div>
  );
}