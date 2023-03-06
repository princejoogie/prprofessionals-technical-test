import { useRouter } from "next/router";
import { useState } from "react";
import useMeasure from "react-use-measure";

const buttons = [
  { id: "clear", value: "AC", color: "bg-primary-200", type: "function" },
  { id: "negate", value: "+/-", color: "bg-primary-200", type: "function" },
  { id: "percent", value: "%", color: "bg-primary-200", type: "input" },
  { id: "divide", value: "/", color: "bg-primary-100", type: "input" },
  { id: "seven", value: "7", color: "bg-primary-400", type: "input" },
  { id: "eight", value: "8", color: "bg-primary-400", type: "input" },
  { id: "nine", value: "9", color: "bg-primary-400", type: "input" },
  { id: "multiply", value: "*", color: "bg-primary-100", type: "input" },
  { id: "four", value: "4", color: "bg-primary-400", type: "input" },
  { id: "five", value: "5", color: "bg-primary-400", type: "input" },
  { id: "six", value: "6", color: "bg-primary-400", type: "input" },
  { id: "subtract", value: "-", color: "bg-primary-100", type: "input" },
  { id: "one", value: "1", color: "bg-primary-400", type: "input" },
  { id: "two", value: "2", color: "bg-primary-400", type: "input" },
  { id: "three", value: "3", color: "bg-primary-400", type: "input" },
  { id: "add", value: "+", color: "bg-primary-100", type: "input" },
  { id: "decimal", value: ".", color: "bg-primary-400", type: "input" },
  { id: "zero", value: "0", color: "bg-primary-400", type: "input" },
  { id: "history", value: "H", color: "bg-primary-400", type: "function" },
  { id: "equals", value: "=", color: "bg-primary-100", type: "function" },
] as const;

export const getAnswer = (formula: string): number | "Error" => {
  try {
    const ans = eval(formula) as number;
    if (ans.toString().includes(".")) {
      const [, dec] = ans.toString().split(".");
      if (dec && dec.length > 2) {
        return parseFloat(ans.toFixed(2));
      }
      return ans;
    }
    return ans;
  } catch {
    return "Error";
  }
};

export const Calculator = () => {
  const router = useRouter();
  const [ref, { width }] = useMeasure();
  const [isError, setIsError] = useState(false);
  const [input, setInput] = useState("0");
  const [prevInput, setPrevInput] = useState<string | null>(null);

  return (
    <div ref={ref} className="flex flex-1 flex-col">
      <div className="mt-10 p-8">
        <p className="w-full text-end text-5xl text-primary-300">{prevInput}</p>
        <p className="w-full text-end text-8xl">{input}</p>
        {isError && (
          <p className="w-full text-end text-xl text-red-600">Invalid fomula</p>
        )}
      </div>

      <div className="mt-10 grid grid-cols-4 gap-[3px] p-[3px]">
        {buttons.map((btn) => (
          <button
            onClick={() => {
              if (btn.type === "input") {
                const newInput =
                  input === "0" && !prevInput ? btn.value : input + btn.value;
                setInput(newInput);
              } else {
                switch (btn.id) {
                  case "clear": {
                    setPrevInput(null);
                    setInput("0");
                    setIsError(false);
                    break;
                  }
                  case "negate": {
                    let ans = getAnswer(input);
                    if (ans === "Error") {
                      setIsError(true);
                    } else {
                      ans = ans * -1;
                      setIsError(false);
                      setPrevInput(input);
                      setInput(ans.toString());
                    }
                    break;
                  }
                  case "equals": {
                    const ans = getAnswer(input);
                    if (ans === "Error") {
                      setIsError(true);
                    } else {
                      setIsError(false);
                      setPrevInput(input);
                      setInput(ans.toString());
                    }
                    break;
                  }
                  case "history": {
                    void router.push("/history");
                    break;
                  }
                }
              }
            }}
            key={btn.id}
            style={{
              height: (width - 3 * 5) / 4,
            }} /* 10 is the total of gap and padding */
            className={`${btn.color} rounded-3xl text-4xl font-semibold transition-opacity active:opacity-50`}
          >
            {btn.value}
          </button>
        ))}
      </div>
    </div>
  );
};
