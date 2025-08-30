"use client";

import { useState } from "react";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount);
};

type ChallengeSetupProps = {
  onStartChallenge: (settings: { quantity: number; increment: number }) => void;
};

export default function ChallengeSetup({
  onStartChallenge,
}: ChallengeSetupProps) {
  const [quantity, setQuantity] = useState("100");
  const [increment, setIncrement] = useState("1");

  const numQuantity = parseInt(quantity) || 0;
  const numIncrement = parseInt(increment) || 0;

  const totalGoal =
    (numQuantity / 2) * (2 * numIncrement + (numQuantity - 1) * numIncrement);

  const handleStartClick = () => {
    console.log("Botão 'Iniciar Desafio' foi clicado");
    if (numQuantity > 0 && numIncrement > 0) {
      onStartChallenge({ quantity: numQuantity, increment: numIncrement });
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg bg-gray-800 p-8 text-white shadow-lg">
        <h1 className="mb-4 text-center text-3xl font-bold">
          Crie seu Desafio
        </h1>
        <p className="mb-8 text-center text-gray-400">
          Defina as metas para começar a poupar.
        </p>

        <div className="mb-6">
          <label
            htmlFor="quantity"
            className="mb-2 block font-bold text-gray-300"
          >
            Quantidade de Depósitos
          </label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full rounded bg-gray-700 p-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mb-8">
          <label
            htmlFor="increment"
            className="mb-2 block font-bold text-gray-300"
          >
            Valor do Incremento (começa com este valor e soma a cada depósito)
          </label>
          <input
            type="number"
            id="increment"
            value={increment}
            onChange={(e) => setIncrement(e.target.value)}
            className="w-full rounded bg-gray-700 p-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mb-8 rounded-md bg-gray-700 p-4 text-center">
          <p className="text-gray-400">Total a ser poupado:</p>
          <p className="text-3xl font-bold text-green-400">
            {formatCurrency(totalGoal)}
          </p>
        </div>

        <button
          onClick={handleStartClick}
          className="w-full rounded-md bg-green-600 p-4 font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-500"
          disabled={numQuantity <= 0 || numIncrement <= 0}
        >
          Iniciar Desafio
        </button>
      </div>
    </main>
  );
}
