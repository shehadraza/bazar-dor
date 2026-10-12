import { notFound } from "next/navigation";
import ProductGrid from "@/components/productGrid";
import { getCategory, getProducts } from "@/lib/api";
import { toBn } from "@/lib/format";

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const [category, products] = await Promise.all([getCategory(slug), getProducts(slug)]);

  if (!category || !products.length) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-4 flex items-center gap-4 rounded-2xl border border-green-100 bg-white p-5">
        <span className="grid h-14 w-14 place-items-center rounded-xl bg-green-50 text-3xl">{category.icon}</span>
        <div>
          <h1 className="text-2xl font-bold">{category.nameBn}</h1>
          <p className="text-sm text-gray-500">প্রতিটি পণ্যের আজকের দাম ও পরিবর্তন</p>
        </div>
      </div>
      <p className="mb-3 text-sm text-gray-600">মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে</p>
      <ProductGrid products={products} sortable />
    </div>
  );
}