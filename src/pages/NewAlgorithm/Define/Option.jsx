import React from "react";

function Option({
  option,
  options,
  optionIndex,
  sectionIndex,
  addOption,
  updateOption,
  removeOption,
}) {
  return (
    <div className="flex gap-2 mt-6">
      <input
        type="text"
        placeholder="option"
        value={option}
        onChange={(e) =>
          updateOption(sectionIndex, optionIndex, e.target.value)
        }
        className="flex-1 p-1 border rounded"
      />
      <div className="flex items-center">
        {optionIndex === options.length - 1 && (
          <button
            className="bg-blue-500 w-10 h-10 rounded text-white mr-1"
            onClick={() => addOption(sectionIndex)}
          >
            +
          </button>
        )}
        <button
          onClick={() => removeOption(sectionIndex, optionIndex)}
          className="p-1 w-10 h-10 bg-red-500 text-white rounded"
        >
          -
        </button>
      </div>
    </div>
  );
}

export default Option;
