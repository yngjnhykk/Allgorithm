import React, { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import OutputOption from "./OuputOption";

function Output({
  output,
  outputIndex,
  removeOutput,
  updateOutput,
  addOutputOption,
  removeOutputOption,
  updateOutputOption,
}) {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div
      className={`${isVisible ? "mt-8" : ""} ${
        isVisible ? "mb-4" : ""
      }   p-2 border rounded`}
      key={outputIndex}
    >
      {/* 입력값 이름 */}
      <div className="flex flex-row justify-between mb-2">
        <input
          type="text"
          placeholder="출력값..."
          value={output.name}
          name="name"
          onChange={(e) => updateOutput(outputIndex, "name", e.target.value)}
          className="mb-2 p-1 text-xl border-none rounded "
        />
        <div className="flex flex-row gap-4">
          <button
            className="w-10 h-10 rounded text-black border flex items-center justify-center"
            onClick={() => toggleVisibility(output.name)}
          >
            {isVisible ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </button>
          <button
            className="bg-red-500 w-10 h-10 rounded text-white "
            onClick={() => removeOutput(outputIndex)}
          >
            -
          </button>
        </div>
      </div>

      {isVisible && (
        <div className="flex gap-2">
          {/* 소제목 */}
          <input
            type="text"
            placeholder="이름"
            value={output.name}
            onChange={(e) => updateOutput(outputIndex, "title", e.target.value)}
            className="flex-1 p-1 h-14 text-center border-[1px] border-gray-300 rounded w-full"
          />
          {/* 변수명 */}
          <input
            type="text"
            placeholder="변수명"
            value={output.parameter_name}
            onChange={(e) =>
              updateOutput(outputIndex, "parameter_name", e.target.value)
            }
            className="flex-1 p-1 h-14 text-center border-[1px] border-gray-300 rounded w-full"
          />
          {/* 타입 */}
          <select
            value={output.type}
            onChange={(e) => updateOutput(outputIndex, "type", e.target.value)}
            className="flex-1 p-1 h-14 text-center border-[1px] border-gray-300 rounded w-full"
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="object">Object</option>
            <option value="select">Select</option>
          </select>
        </div>
      )}
      {(output.type === "object" || output.type === "select") &&
        isVisible &&
        output.options.map((option, index) => (
          <OutputOption
            option={option}
            options={output.options}
            outputIndex={outputIndex}
            optionIndex={index}
            addOutputOption={addOutputOption}
            removeOutputOption={removeOutputOption}
            updateOutputOption={updateOutputOption}
          />
        ))}
    </div>
  );
}

export default Output;
