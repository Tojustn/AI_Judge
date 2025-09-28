import React from "react";
import { targetModelsArray } from "../../types/types";

interface RadioComponentProps {
  chosen: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const RadioComponent = ({ chosen, onChange }: RadioComponentProps) => {
  return (
    <div className="flex flex-col">
      {targetModelsArray.map((data, index) => (
        <div key={data.id} className="flex items-center">
          <input
            id={`radio-${index}`}
            type="radio"
            name="target-model"
            value={data.id}
            checked={chosen === data.id}
            onChange={onChange}
          />
          <label
            htmlFor={`radio-${index}`}
            className="text-black dark:text-white mx-5"
          >
            {data.name}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RadioComponent;
