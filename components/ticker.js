import { toBn, unitShort, pctText } from "@/lib/format";

export default function Ticker({ products }) {
  if (!products.length) return null;
  const items = [...products, ...products];
  return (
    <div className="overflow-hidden border-t border-green-100 bg-white py-2 text-xs sm:text-sm">
      <div className="marquee-track">
        {items.map((p, i) => {
          const color = p.change.dir === "up" ? "text-red-600" : p.change.dir === "down" ? "text-green-700" : "text-gray-500";
          const icon = p.change.dir === "up" ? "▲" : p.change.dir === "down" ? "▼" : "—";
          return (
            <span key={i} className="flex items-center gap-2 whitespace-nowrap border-r border-green-100 px-4">
              <span>{p.image}</span>
              <span className="font-medium">{p.nameBn}</span>
              <span className="text-gray-600">{toBn(p.today)} টাকা/{unitShort(p.unit)}</span>
              <span className={`font-semibold ${color}`}>{icon} {pctText(p.change.pct)}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}