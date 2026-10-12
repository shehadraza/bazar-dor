"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-clint";

export default function AuthButtons() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();

  if (isPending) return <div className="h-9 w-28 animate-pulse rounded-lg bg-gray-200" />;

  if (!session) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/signin" className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-green-50">সাইন ইন</Link>
        <Link href="/signup" className="rounded-lg bg-green-700 px-3 py-2 text-sm font-medium text-white hover:bg-green-800">সাইন আপ</Link>
      </div>
    );
  }

  const user = session.user;
  async function handleSignOut() {
    setOpen(false);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সফলভাবে সাইন আউট হয়েছে");
          router.push("/");
          router.refresh();
        },
      },
    });
  }

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-green-50">
        {user.image ? (
          <img src={user.image} alt="" className="h-8 w-8 rounded-full object-cover" />
        ) : (
          <span className="grid h-8 w-8 place-items-center rounded-full bg-green-700 text-sm font-bold text-white">
            {user.name?.[0]?.toUpperCase()}
          </span>
        )}
        <span className="hidden max-w-28 truncate text-sm font-medium sm:inline">{user.name}</span>
        <span className="text-xs">▾</span>
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-60 rounded-xl border border-green-100 bg-white p-3 shadow-lg">
          <p className="truncate text-sm font-semibold">{user.name}</p>
          <p className="truncate text-xs text-gray-500">{user.email}</p>
          <hr className="my-2 border-green-100" />
          <Link href="/profile" onClick={() => setOpen(false)} className="block rounded-lg px-2 py-2 text-sm hover:bg-green-50">
            আমার প্রোফাইল
          </Link>
          <button onClick={handleSignOut} className="w-full rounded-lg px-2 py-2 text-left text-sm text-red-600 hover:bg-red-50">
            সাইন আউট
          </button>
        </div>
      )}
    </div>
  );
}