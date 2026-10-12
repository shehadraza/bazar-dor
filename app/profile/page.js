"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-clint";

export default function Profile() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  async function handleSignOut() {
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

  if (isPending) {
    return (
      <div className="mx-auto max-w-xl space-y-4 px-4 py-10">
        <div className="h-8 w-48 animate-pulse rounded bg-green-100" />
        <div className="h-24 animate-pulse rounded-2xl bg-green-100" />
        <div className="h-40 animate-pulse rounded-2xl bg-green-100" />
      </div>
    );
  }
  if (!session) return null;
  const user = session.user;

  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
      <p className="mb-5 text-sm text-gray-500">আপনার অ্যাকাউন্টের তথ্য দেখুন।</p>

      <div className="flex flex-col gap-4 rounded-2xl border border-green-100 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          {user.image ? (
            <img src={user.image} alt="" className="h-16 w-16 rounded-xl object-cover" />
          ) : (
            <span className="grid h-16 w-16 place-items-center rounded-xl bg-green-700 text-2xl font-bold text-white">
              {user.name?.[0]?.toUpperCase()}
            </span>
          )}
          <div className="min-w-0">
            <p className="truncate text-lg font-semibold">{user.name}</p>
            <p className="truncate text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
        <button onClick={handleSignOut} className="rounded-lg border border-red-400 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
          সাইন আউট
        </button>
      </div>

      <div className="mt-4 rounded-2xl border border-green-100 bg-white p-5">
        <h2 className="mb-3 font-semibold">তথ্য</h2>
        <p className="text-sm text-gray-500">নাম</p>
        <p className="mb-4 rounded-lg border border-green-100 bg-green-50/40 px-3 py-2.5">{user.name}</p>
        <Link href="/profile/update" className="inline-block rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800">
          তথ্য আপডেট করুন
        </Link>
      </div>
    </div>
  );
}