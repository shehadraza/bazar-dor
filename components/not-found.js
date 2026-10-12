import Link from "next/link";

export default function NotFoundView({ message = "আপনি যে পেজটি খুঁজছেন তা পাওয়া যায়নি।" }) {
  return (
    <div className="mx-auto max-w-md px-4 py-20 text-center">
      <p className="text-6xl">😕</p>
      <h1 className="mt-4 text-3xl font-bold">৪০৪ — পেজ পাওয়া যায়নি</h1>
      <p className="mt-2 text-gray-600">{message}</p>
      <Link href="/" className="mt-6 inline-block rounded-lg bg-green-700 px-5 py-2.5 font-medium text-white hover:bg-green-800">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}