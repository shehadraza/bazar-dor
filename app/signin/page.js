"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-clint";
import SocialButtons from "@/components/social-button";
export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("reason") === "protected") {
      toast.error("এই পেজ দেখতে আগে সাইন ইন করুন");
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return toast.error("ইমেইল ও পাসওয়ার্ড দিন");
    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);
    if (error) return toast.error(error.message || "ইমেইল বা পাসওয়ার্ড ভুল");
    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push("/");
    router.refresh();
  }

  const input = "w-full rounded-lg border border-green-200 bg-green-50/40 px-3 py-2.5 focus:outline-green-600";
  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-center text-3xl font-bold">সাইন ইন</h1>
      <p className="mb-6 mt-1 text-center text-sm text-gray-500">বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</p>
      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-green-100 bg-white p-6">
        <div>
          <label className="mb-1 block text-sm font-medium">ইমেইল</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={input} placeholder="you@example.com" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">পাসওয়ার্ড</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={input} placeholder="••••••••" />
        </div>
        <button disabled={loading} className="w-full rounded-lg bg-green-700 py-2.5 font-medium text-white hover:bg-green-800 disabled:opacity-60">
          {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
        </button>
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <hr className="flex-1" /> অথবা <hr className="flex-1" />
        </div>
        <SocialButtons />
        <p className="text-center text-sm">
          অ্যাকাউন্ট নেই? <Link href="/signup" className="font-medium text-green-700 hover:underline">সাইন আপ করুন</Link>
        </p>
      </form>
      <p className="mt-4 text-center text-sm"><Link href="/" className="text-gray-500 hover:underline">← হোম পেজে ফিরে যান</Link></p>
    </div>
  );
}