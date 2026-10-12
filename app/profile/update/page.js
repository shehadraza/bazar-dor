"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-clint";

export default function UpdateProfile() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user?.name) setName(session.user.name);
  }, [session]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return toast.error("নাম খালি রাখা যাবে না");
    setLoading(true);
    const { error } = await authClient.updateUser({ name: name.trim() });
    setLoading(false);
    if (error) return toast.error(error.message || "আপডেট করা যায়নি");
    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-2xl font-bold">তথ্য আপডেট করুন</h1>
      <form onSubmit={handleSubmit} className="mt-5 space-y-4 rounded-2xl border border-green-100 bg-white p-6">
        <div>
          <label className="mb-1 block text-sm font-medium">নাম</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-green-200 bg-green-50/40 px-3 py-2.5 focus:outline-green-600"
          />
        </div>
        <button disabled={loading} className="w-full rounded-lg bg-green-700 py-2.5 font-medium text-white hover:bg-green-800 disabled:opacity-60">
          {loading ? "অপেক্ষা করুন..." : "তথ্য আপডেট করুন"}
        </button>
        <Link href="/profile" className="block text-center text-sm text-gray-500 hover:underline">← প্রোফাইলে ফিরে যান</Link>
      </form>
    </div>
  );
}