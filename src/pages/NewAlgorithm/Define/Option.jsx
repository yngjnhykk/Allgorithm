import React from "react";

function Option({
  option,
  options,
  detail,
  optionIndex,
  inputIndex,
  addOption,
  updateOption,
  removeOption,
}) {
  console.log(detail.form_type);
  return (
    <>
      {/* 셀렉트 */}
      {detail.form_type === "select" && (
        <div className="flex gap-2 mt-6">
          <input
            type="text"
            placeholder="option"
            value={option}
            onChange={(e) => updateOption(inputIndex, e.target.value)}
            className="flex-1 p-1 border rounded"
          />
          <div className="flex items-center">
            {optionIndex === options.length - 1 && (
              <button
                className="bg-blue-500 w-10 h-10 rounded text-white mr-1"
                onClick={() => addOption(inputIndex)}
              >
                +
              </button>
            )}
            <button
              onClick={() => removeOption(inputIndex, optionIndex)}
              className="p-1 w-10 h-10 bg-red-500 text-white rounded"
            >
              -
            </button>
          </div>
        </div>
      )}

      {/* 오브젝트 */}
      {detail.form_type === "object" && (
        <div className="flex gap-2 mt-6">
          <input
            type="text"
            placeholder="key"
            value={option.name}
            onChange={(e) =>
              updateOption(inputIndex, optionIndex, e.target.value)
            }
            className="flex-1 p-1 border rounded"
          />
          <input
            type="text"
            placeholder="변수 명"
            value={option.parameter_name}
            onChange={(e) =>
              updateOption(inputIndex, optionIndex, e.target.value)
            }
            className="flex-1 p-1 border rounded"
          />
          <input
            type="text"
            placeholder="예제 값"
            value={option.value}
            onChange={(e) =>
              updateOption(inputIndex, optionIndex, e.target.value)
            }
            className="flex-1 p-1 border rounded"
          />
          <div className="flex items-center">
            {optionIndex === options.length - 1 && (
              <button
                className="bg-blue-500 w-10 h-10 rounded text-white mr-1"
                onClick={() => addOption(inputIndex)}
              >
                +
              </button>
            )}
            <button
              onClick={() => removeOption(inputIndex, optionIndex)}
              className="p-1 w-10 h-10 bg-red-500 text-white rounded"
            >
              -
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Option;
