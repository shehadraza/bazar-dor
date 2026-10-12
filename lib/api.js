const BASES = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function get(path) {
  for (const base of BASES) {
    try {
      const res = await fetch(base + path, { next: { revalidate: 300 } });
      if (res.ok) return await res.json();
    } catch (e) {}
  }
  return null;
}

export async function getProducts(category) {
  const data = await get(category ? `/products?category=${category}` : "/products");
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.data)) return data.data;
  return [];
}
export async function getCategories() {
  const data = await get("/categories");
  return Array.isArray(data) ? data : [];
}
export async function getCategory(slug) {
  const data = await get(`/categories/${slug}`);
  return data && data.slug ? data : null;
}