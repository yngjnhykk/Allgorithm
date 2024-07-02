import React, { useState } from "react";
import InputOption from "./InputOption";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

function Input({
  input,
  detail,
  inputIndex,

  removeInput,
  updateInputTitle,

  addOption,
  removeOption,
  updateDetail,

  updateOption,
}) {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={`${isVisible ? "mt-8" : ""} ${isVisible ? "mb-4" : ""}   p-2 border rounded`} key={inputIndex}>
      {/* 입력값 이름 */}
      <div className="flex flex-row justify-between mb-2">
        <input
          type="text"
          placeholder="입력값..."
          value={input.name}
          name={input.name}
          onChange={(e) => updateInputTitle(inputIndex, e.target.value)}
          className="mb-2 p-1 text-xl border-none rounded"
        />
        <div className="flex flex-row gap-4">
          <button
            className="w-10 h-10 rounded text-black border flex items-center justify-center"
            onClick={() => toggleVisibility(input.name)}
          >
            {isVisible ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </button>
          <button
            className="bg-red-500 w-10 h-10 rounded text-white "
            onClick={() => removeInput(inputIndex)}
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
            placeholder="소제목"
            value={detail.title}
            onChange={(e) => updateDetail(inputIndex, "title", e.target.value)}
            className="flex-1 p-1 h-14 text-center border-[1px] border-gray-300 rounded w-full"
          />
          {/* 변수명 */}
          <input
            type="text"
            placeholder="변수명"
            value={detail.parameter_name}
            onChange={(e) =>
              updateDetail(inputIndex, "parameter_name", e.target.value)
            }
            className="flex-1 p-1 h-14 text-center border-[1px] border-gray-300 rounded w-full"
          />
          {/* 타입 */}
          <select
            value={detail.type}
            onChange={(e) => updateDetail(inputIndex, "type", e.target.value)}
            className="flex-1 p-1 h-14 text-center border-[1px] border-gray-300 rounded w-full"
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="object">Object</option>
            <option value="select">Select</option>
          </select>

          {/* 예제 */}
          {detail.type !== "object" && (
            <input
              type="text"
              placeholder="예제 값"
              value={detail.example}
              onChange={(e) =>
                updateDetail(
                  inputIndex,

                  "example",
                  e.target.value
                )
              }
              className="flex-1 p-1 h-14 text-center border-[1px] border-gray-300 rounded w-full"
            />
          )}
        </div>
      )}
      {(detail.type === "object" || detail.type === "select") &&
        isVisible &&
        detail.options.map((option, index) => (
          <InputOption
            option={option}
            options={detail.options}
            detail={detail}
            inputIndex={inputIndex}
            optionIndex={index}
            addOption={addOption}
            removeOption={removeOption}
            updateDetail={updateDetail}
            updateOption={updateOption}
          />
        ))}
    </div>
  );
}

export default Input;
