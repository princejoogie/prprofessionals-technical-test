import useMeasure from "react-use-measure";

export type Button = {
  id: string;
  value: string;
  color: "bg-primary-200" | "bg-primary-100" | "bg-primary-400";
};

const buttons: Button[] = [
  { id: "clear", value: "AC", color: "bg-primary-200" },
  { id: "negate", value: "+/-", color: "bg-primary-200" },
  { id: "percent", value: "%", color: "bg-primary-200" },
  { id: "divide", value: "/", color: "bg-primary-100" },
  { id: "seven", value: "7", color: "bg-primary-400" },
  { id: "eight", value: "8", color: "bg-primary-400" },
  { id: "nine", value: "9", color: "bg-primary-400" },
  { id: "multiply", value: "x", color: "bg-primary-100" },
  { id: "four", value: "4", color: "bg-primary-400" },
  { id: "five", value: "5", color: "bg-primary-400" },
  { id: "six", value: "6", color: "bg-primary-400" },
  { id: "subtract", value: "-", color: "bg-primary-100" },
  { id: "one", value: "1", color: "bg-primary-400" },
  { id: "two", value: "2", color: "bg-primary-400" },
  { id: "three", value: "3", color: "bg-primary-400" },
  { id: "add", value: "+", color: "bg-primary-100" },
  { id: "decimal", value: ".", color: "bg-primary-400" },
  { id: "zero", value: "0", color: "bg-primary-400" },
  { id: "history", value: "H", color: "bg-primary-400" },
  { id: "equals", value: "=", color: "bg-primary-100" },
];

export const Calculator = () => {
  const [ref, { width }] = useMeasure();

  return (
    <div ref={ref} className="flex flex-1 flex-col">
      <div className="mt-10">Input</div>

      <div className="mt-10 grid grid-cols-4 gap-[3px] p-[3px]">
        {buttons.map((btn) => (
          <button
            key={btn.id}
            style={{
              height: (width - 3 * 5) / 4,
            }} /* 10 is the total of gap and padding */
            className={`${btn.color} rounded-3xl text-2xl font-semibold transition-opacity active:opacity-50`}
          >
            {btn.value}
          </button>
        ))}
      </div>
    </div>
  );
};
