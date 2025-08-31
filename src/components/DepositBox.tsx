type DepositBoxProps = {
  value: number;
  isCompleted: boolean;
  onClick?: (value: number) => void;
};

export default function DepositBox({
  value,
  isCompleted,
  onClick,
}: DepositBoxProps) {
  const baseStyle =
    "flex h-16 w-16 cursor-pointer items-center justify-center  rounded-md border-2 text-lg font-bold transition-all";
  const completedStyle = "border-green-500 bg-green-500 text-white";
  const pendingStyle =
    "border-gray-400 bg-gray-700 text-white hover:border-green-400 hover:bg-gray-600";

  const accessibleLabel = `Depósito número ${value}, status: ${
    isCompleted ? "concluído" : "pendente"
  }`;

  const handleClick = () => {
    if (onClick) {
      onClick(value);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={`${baseStyle} ${isCompleted ? completedStyle : pendingStyle}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={accessibleLabel}
    >
      <span aria-hidden={true}>{value}</span>
    </div>
  );
}
