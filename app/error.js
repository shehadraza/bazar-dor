"use client";
export default function Error({ reset }) {
  return (
    <div className="mx-auto max-w-md px-4 py-20 text-center">
      <p className="text-5xl">⚠️</p>
      <h1 className="mt-4 text-2xl font-bold">কিছু একটা সমস্যা হয়েছে</h1>
      <button onClick={() => reset()} className="mt-6 rounded-lg bg-green-700 px-5 py-2.5 text-white">আবার চেষ্টা করুন</button>
    </div>
  );
}