"use client";

import { useEffect, useState } from "react";
import Form from "./form";

export default function Home() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // Initialize currentNumber without changes
  const [currentNumber, setCurrentNumber] = useState(8374);

  // Initialize endNumber from local storage or use default if not available
  const [endNumber, setEndNumber] = useState(() => {
    const storedEndNumber = localStorage.getItem("endNumber");
    return storedEndNumber ? parseInt(storedEndNumber, 10) : 8379;
  });

  // Function to generate Cron remains the same
  const generateCron = async (prompt: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      if (data.result) {
        setResult(data.result);
        setEndNumber((prevEndNumber) => prevEndNumber + 1);
      }
    } catch (error) {
      console.error("Failed to fetch:", error);
    }
    setLoading(false);
  };

  // Effect to increment currentNumber
  useEffect(() => {
    if (currentNumber < endNumber) {
      const timerId = setInterval(() => {
        setCurrentNumber((currentNum) => currentNum + 1);
      }, 200);
      return () => clearInterval(timerId);
    }
  }, [currentNumber, endNumber]);

  // Effect to save endNumber to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("endNumber", endNumber.toString());
  }, [endNumber]);

  return (
    <main className="m-auto max-w-1xl p-4 text-white">
      <div className="mt-8 border-b border-neutral-800 pb-3 text-center">
        <h1 className="text-3xl">Eazy Regex</h1>
        <p className="tracking-wider text-neutral-400">
          Experience the power of AI
        </p>
        <p className="tracking-wider text-neutral-400">
          Plain English to regular expression
        </p>
      </div>
      <div>
        <div>
          <div>
            <div
              style={{
                fontSize: '25px',
                color: 'white',
                textAlign: 'center'
              }}
            >
              Generated a total of <span style={{ color: 'red' }}>{currentNumber}</span>
            </div>

          </div>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="pb-3 text-xl">I want a regex for</h2>
        <Form generateCron={generateCron} result={result} loading={loading} />
      </div>
    </main>
  );
}
