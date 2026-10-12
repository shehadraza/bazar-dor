"use client";
import { useEffect, useState } from "react";

export default function BanglaDate({ className = "block min-h-4 text-xs text-gray-500" }) {
  const [text, setText] = useState("");
  useEffect(() => {
    setText(
      new Date().toLocaleDateString("bn-BD", {
        weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Dhaka",
      })
    );
  }, []);
  return <span className={className}>{text}</span>;
}