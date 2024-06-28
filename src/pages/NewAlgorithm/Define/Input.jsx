import React from "react";
import Option from "./Option";

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
  // console.log(input);
  // console.log(detail);
  return (
    <div className="mt-12 mb-4 p-2 border rounded">
      {/* 입력값 이름 */}
      <div className="flex flex-row justify-between mb-2">
        <input
          type="text"
          placeholder="입력값..."
          value={input.name}
          onChange={(e) => updateInputTitle(inputIndex, e.target.value)}
          className="mb-2 p-1 text-xl border-none rounded"
        />
        <div>
          <button
            className="bg-red-500 w-10 h-10 rounded text-white "
            onClick={() => removeInput(inputIndex)}
          >
            -
          </button>
        </div>
      </div>

      <div className="flex gap-2">
        {/* 소제목 */}
        <input
          type="text"
          placeholder="소제목"
          value={detail.title}
          onChange={(e) => updateDetail(inputIndex, "title", e.target.value)}
          className="flex-1 p-1 h-14 text-center border-[1px] border-gray-300 rounded"
        />
        {/* 변수명 */}
        <input
          type="text"
          placeholder="변수명"
          value={detail.parameter_name}
          onChange={(e) =>
            updateDetail(inputIndex, "parameter_name", e.target.value)
          }
          className="flex-1 p-1 h-14 text-center border-[1px] border-gray-300 rounded"
        />
        {/* 타입 */}
        <select
          value={detail.form_type}
          onChange={(e) =>
            updateDetail(inputIndex, "form_type", e.target.value)
          }
          className="flex-1 p-1 h-14 text-center border-[1px] border-gray-300 rounded"
        >
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="object">Object</option>
          <option value="select">Select</option>
        </select>

        {/* 예제 */}
        {detail.form_type !== "object" && (
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
            className="flex-1 p-1 h-14 text-center border-[1px] border-gray-300 rounded"
          />
        )}
      </div>
      {(detail.form_type === "object" || detail.form_type === "select") &&
        detail.options.map((option, index) => (
          <Option
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
