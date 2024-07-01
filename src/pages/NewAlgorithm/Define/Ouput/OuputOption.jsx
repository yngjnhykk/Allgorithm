import React from "react";

function OutputOption({
  option,
  options,
  optionIndex,
  inputIndex,
  addOutputOption,
  updateOutputOption,
  removeOutputOption,
}) {
  return (
    <>
      {option.type === "select" && (
        <div className="flex gap-2 mt-6">
          <input
            type="text"
            placeholder="option"
            value={option.value}
            onChange={(e) =>
              updateOutputOption(inputIndex, optionIndex, e.target.value)
            }
            className="flex-1 p-1 border rounded"
          />
          <div className="flex items-center">
            {optionIndex === options.length - 1 && (
              <button
                className="bg-blue-500 w-10 h-10 rounded text-white mr-1"
                onClick={() => addOutputOption(inputIndex)}
              >
                +
              </button>
            )}
            <button
              onClick={() => removeOutputOption(inputIndex, optionIndex)}
              className="p-1 w-10 h-10 bg-red-500 text-white rounded"
            >
              -
            </button>
          </div>
        </div>
      )}

      {option.type === "object" && (
        <div className="flex gap-2 mt-6">
          <input
            type="text"
            placeholder="key"
            value={option.name}
            onChange={(e) =>
              updateOutputOption(inputIndex, optionIndex, {
                ...option,
                name: e.target.value,
              })
            }
            className="flex-1 p-1 border rounded"
          />
          <input
            type="text"
            placeholder="변수 명"
            value={option.parameter_name}
            onChange={(e) =>
              updateOutputOption(inputIndex, optionIndex, {
                ...option,
                parameter_name: e.target.value,
              })
            }
            className="flex-1 p-1 border rounded"
          />
          <input
            type="text"
            placeholder="예제 값"
            value={option.value}
            onChange={(e) =>
              updateOutputOption(inputIndex, optionIndex, {
                ...option,
                value: e.target.value,
              })
            }
            className="flex-1 p-1 border rounded"
          />
          <div className="flex items-center">
            {optionIndex === options.length - 1 && (
              <button
                className="bg-blue-500 w-10 h-10 rounded text-white mr-1"
                onClick={() => addOutputOption(inputIndex)}
              >
                +
              </button>
            )}
            <button
              onClick={() => removeOutputOption(inputIndex, optionIndex)}
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

export default OutputOption;
