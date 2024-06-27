import React, { useState } from "react";
import Input from "./Input";

function Define({
  inputs,
  addInput,
  removeInput,
  updateInputTitle,

  addOption,
  removeOption,
  updateDetail,

  updateOption,
}) {
  return (
    <div className="bg-white p-6 rounded-lg space-y-6 border-solid border-2 border-gray-300">
      <div className="text-xl font-semibold">Function Details</div>
      <div className="space-y-4">
        {/* Name */}
        <div className="flex items-center">
          <div className="w-1/3 text-lg">Name</div>
        </div>
        <div>
          <input
            type="text"
            className="w-2/3 p-2 border rounded"
            placeholder="Function Name"
          />
        </div>

        {/* parameter */}
        <div className="flex flex-col w-full" style={{ marginTop: 100 }}>
          <div className="text-lg mb-4">Parameter</div>
          {inputs.map((input, index) => (
            <Input
              input={input}
              inputIndex={index}
              detail={input.detail}
              removeInput={removeInput}
              updateInputTitle={updateInputTitle}
              removeOption={removeOption}
              addOption={addOption}
              updateDetail={updateDetail}
              key={index}
              updateOption={updateOption}
            />
          ))}

          {/* input 추가 버튼 */}
          <div className="flex items-center justify-center mt-14">
            <div className="flex-grow border-t border-gray-300" />
            <button
              onClick={addInput}
              className="px-6 py-2 border rounded-full font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:Cmain"
            >
              + input
            </button>
            <div className="flex-grow border-t border-gray-300" />
          </div>
        </div>

        {/* Content */}

        <div className="text-lg">Content</div>
        <textarea
          className="w-full h-48 p-2 border rounded"
          placeholder="Code..."
        ></textarea>
      </div>
    </div>
  );
}

export default Define;
