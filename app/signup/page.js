"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-clint";
import SocialButtons from "@/components/social-button";

export default function SignUp() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const change = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) return toast.error("সব ঘর পূরণ করুন");
    if (form.password.length < 8) return toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    if (form.password !== form.confirm) return toast.error("দুটি পাসওয়ার্ড মিলছে না");
    setLoading(true);
    const { error } = await authClient.signUp.email({ name: form.name, email: form.email, password: form.password });
    setLoading(false);
    if (error) return toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
    toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন");
    router.push("/signin");
  }

  const input = "w-full rounded-lg border border-green-200 bg-green-50/40 px-3 py-2.5 focus:outline-green-600";
  const fields = [
    ["name", "নাম", "text"],
    ["email", "ইমেইল", "email"],
    ["password", "পাসওয়ার্ড", "password"],
    ["confirm", "পাসওয়ার্ড নিশ্চিত করুন", "password"],
  ];
  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-center text-3xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>
      <p className="mb-6 mt-1 text-center text-sm text-gray-500">বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-green-100 bg-white p-6">
        {fields.map(([key, label, type]) => (
          <div key={key}>
            <label className="mb-1 block text-sm font-medium">{label}</label>
            <input type={type} value={form[key]} onChange={change(key)} className={input} />
          </div>
        ))}
        <button disabled={loading} className="w-full rounded-lg bg-green-700 py-2.5 font-medium text-white hover:bg-green-800 disabled:opacity-60">
          {loading ? "অপেক্ষা করুন..." : "সাইন আপ"}
        </button>
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <hr className="flex-1" /> অথবা <hr className="flex-1" />
        </div>
        <SocialButtons />
        <p className="text-center text-sm">
          অ্যাকাউন্ট আছে? <Link href="/signin" className="font-medium text-green-700 hover:underline">সাইন ইন করুন</Link>
        </p>
      </form>
      <p className="mt-4 text-center text-sm"><Link href="/" className="text-gray-500 hover:underline">← হোম পেজে ফিরে যান</Link></p>
    </div>
  );
}