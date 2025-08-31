import { formatCurrency } from "../utils/formatCurrency";

type ProgressSummaryProps = {
  completedCount: number;
  totalCount: number;
  totalSaved: number;
  totalGoal: number;
  progressPercentage: number;
};

export default function ProgressSummary({
  completedCount,
  totalCount,
  totalSaved,
  totalGoal,
  progressPercentage,
}: ProgressSummaryProps) {
  if (progressPercentage > 100) {
    progressPercentage = 100;
  }

  return (
    <div className="mb-8 w-full max-w-4xl rounded-lg bg-gray-800 p-6 shadow-lg">
      <div className="mb-4 flex items-center justify-between text-white">
        <div className="flex flex-col">
          <span className="text-lg font-bold" data-testid="total-saved">
            {formatCurrency(totalSaved)}
          </span>
          <span className="text-sm text-gray-400" data-testid="total-goal">
            de {formatCurrency(totalGoal)}
          </span>
        </div>
        <div className="text-right" data-testid="deposit-counts">
          <span className="text-lg font-bold">{completedCount}</span>
          <span className="text-sm text-gray-400">/{totalCount} depósitos</span>
        </div>
      </div>
      <div
        className="h-4 w-full rounded-full bg-gray-600"
        role="progressBar"
        aria-label="Progresso do desafio"
        aria-valuenow={totalSaved}
        aria-valuemin={0}
        aria-valuemax={totalGoal}
      >
        <div
          className="h-4 rounded-full bg-green-500 transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
}
