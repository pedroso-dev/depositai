"use client";

import { useState, useEffect } from "react";
import DepositBox from "@/components/DepositBox";
import ProgressSummary from "@/components/ProgressSummary";
import ChallengeSetup from "@/components/ChallengeSetup";

interface Challenge {
  settings: {
    quantity: number;
    increment: number;
  };
  completed: number[];
}

export default function Home() {
  const storageKey = "depositai-challenge";
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem(storageKey);
    if (savedData) {
      setChallenge(JSON.parse(savedData));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(storageKey, JSON.stringify(challenge));
    }
  }, [challenge, isLoaded]);

  const handleStartChallenge = (settings: {
    quantity: number;
    increment: number;
  }) => {
    console.log("Página Home recebeu o chamado para iniciar com:", settings);
    const newChallenge: Challenge = {
      settings,
      completed: [],
    };
    setChallenge(newChallenge);
  };

  const handleDepositClick = (value: number) => {
    if (!challenge) return;

    const newCompleted = challenge.completed.includes(value)
      ? challenge.completed.filter((item) => item !== value)
      : [...challenge.completed, value];

    setChallenge({
      ...challenge,
      completed: newCompleted,
    });
  };

  if (!isLoaded) {
    return <div className="min-h-screen bg-gray-900"></div>; // Ou um componente de "Carregando..."
  }
  if (!challenge) {
    return <ChallengeSetup onStartChallenge={handleStartChallenge} />;
  }

  const deposits = Array.from(
    { length: challenge.settings.quantity },
    (_, i) => (i + 1) * challenge.settings.increment
  );
  const completedCount = challenge.completed.length;
  const totalSaved = challenge.completed.reduce((sum, value) => sum + value, 0);
  const totalGoal = deposits.reduce((sum, value) => sum + value, 0);
  const progressPercentage = totalGoal > 0 ? (totalSaved / totalGoal) * 100 : 0;

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-12">
      <h1 className="mb-8 text-4xl font-bold text-white">Depositaí</h1>
      <p>Seu desafio de {challenge.settings.quantity} depósitos</p>

      <ProgressSummary
        completedCount={completedCount}
        totalCount={challenge.settings.quantity}
        totalSaved={totalSaved}
        totalGoal={totalGoal}
        progressPercentage={progressPercentage}
      />

      <div className="flex max-w-4xl flex-wrap justify-center gap-2">
        {deposits.map((value) => (
          <DepositBox
            key={value}
            value={value}
            isCompleted={challenge.completed.includes(value)}
            onClick={handleDepositClick}
          />
        ))}
      </div>
    </main>
  );
}
