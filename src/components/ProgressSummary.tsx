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
  return (
    <div className="mb-8 w-full max-w-4xl rounded-lg bg-gray-800 p-6 shadow-lg">
      <div className="mb-4 flex items-center justify-between text-white">
        <div className="flex flex-col">
          <span className="text-lg font-bold">
            {formatCurrency(totalSaved)}
          </span>
          <span className="text-sm text-gray-400">
            de {formatCurrency(totalGoal)}
          </span>
        </div>
        <div className="text-right">
          <span className="text-lg font-bold">{completedCount}</span>
          <span className="text-sm text-gray-400">/{totalCount} depósitos</span>
        </div>
      </div>
      <div className="h-4 w-full rounded-full bg-gray-600">
        <div
          className="h-4 rounded-full bg-green-500 transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
}
