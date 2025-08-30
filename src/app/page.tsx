"use client";

import { useState } from "react";
import DepositBox from "@/components/DepositBox";

export default function Home() {
  const totalDeposits = 200;
  const deposits = Array.from({ length: totalDeposits }, (_, i) => i + 1);
  // console.log(deposits);

  const [completedDeposits, setCompletedDeposits] = useState<number[]>([]);

  const handleDepositClick = (value: number) => {
    if (completedDeposits.includes(value)) {
      setCompletedDeposits(completedDeposits.filter((item) => item !== value));
    } else {
      setCompletedDeposits([...completedDeposits, value]);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-12">
      <h1 className="mb-8 text-4xl font-bold text-white">Depositaí</h1>

      <div className="flex max-w-4xl flex-wrap justify-center gap-2">
        {deposits.map((value) => (
          <DepositBox
            key={value}
            value={value}
            isCompleted={completedDeposits.includes(value)}
            onClick={handleDepositClick}
          />
        ))}
      </div>
    </main>
  );
}
