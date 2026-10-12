export const toBn = (n, opts) => Number(n).toLocaleString("bn-BD", opts);

const UNIT = { kg: "কেজি", litre: "লিটার", dozen: "ডজন", piece: "পিস" };
export const unitFull = (u) => `প্রতি ${UNIT[u] || u}`;
export const unitShort = (u) => UNIT[u] || u;

export const pctText = (pct) =>
  toBn(Math.abs(pct), { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + "%";