"use client";

import { useState } from "react";
import Form from "./form";

export default function Home() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generateCron = async (prompt: string) => {
    setLoading(true);

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();

    setResult(data.result);
    setLoading(false);
  };

  return (
    <main className="m-auto max-w-1xl p-4 text-white">
      <div className="mt-8 border-b border-neutral-800 pb-3 text-center">
        <h1 className="text-3xl">Eazy Regex</h1>
        <p className="tracking-wider text-neutral-400">
          English words to regular expression
        </p>
      </div>
      <div className="mt-12">
        <h2 className="pb-3 text-xl">I want a regex for</h2>
        <Form generateCron={generateCron} result={result} loading={loading} />
      </div>
      <footer>
        By Nikhith Vasa
      </footer>
    </main>
  );
}
