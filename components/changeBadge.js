import { pctText } from "@/lib/format";

export default function ChangeBadge({ change }) {
  const { dir, pct } = change;
  const style =
    dir === "up" ? "bg-red-50 text-red-600" : dir === "down" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500";
  const icon = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${style}`}>
      {icon} {pctText(pct)}
    </span>
  );
}