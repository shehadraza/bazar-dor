"use client";
import { useState } from "react";
import ProductCard from "./productCard";

export default function ProductGrid({ products, sortable = false }) {
  const [sort, setSort] = useState("default");

  const list = [...products];
  if (sort === "asc") list.sort((a, b) => a.today - b.today);
  if (sort === "desc") list.sort((a, b) => b.today - a.today);

  return (
    <div>
      {sortable && (
        <div className="mb-4 flex items-center justify-end gap-2 rounded-xl border border-green-100 bg-white p-3">
          <label htmlFor="sort" className="text-sm text-gray-600">সাজান:</label>
          <div className="relative">
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none rounded-lg border border-green-200 bg-white py-2 pl-3 pr-9 text-sm focus:outline-green-600"
            >
              <option value="default">ডিফল্ট</option>
              <option value="asc">দাম: কম থেকে বেশি</option>
              <option value="desc">দাম: বেশি থেকে কম</option>
            </select>
            <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5.5 7.5 10 12l4.5-4.5z" />
            </svg>
          </div>
        </div>
      )}
     <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </div>
  );
}