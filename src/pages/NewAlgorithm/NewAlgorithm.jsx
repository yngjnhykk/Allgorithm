import React, { useState } from "react";
import Preview from "./Preview";
import Define from "./Define/Define";

function NewAlgorithm() {
  const [inputs, setInputs] = useState([
    {
      name: "Ship Type",
      detail: {
        title: "Ship Information",
        parameter_name: "ship_type",
        type: "string",
        form_type: "select",
        options: [
          "Bulk Carrier",
          "Gas Carrier",
          "Tanker",
          "Container Ship",
          "Refrigerated Cargo Carrier",
          "Combination Carrier",
          "LNG Carrier",
          "Ro-Ro Cargo Ship (Vehicle Carrier)",
          "Ro-Ro Cargo Ship",
          "Ro-Ro Passenger Ship",
          "Cruise Passenger Ship",
        ],
        example: "Bulk Carrier",
      },
    },
  ]);

  // ---------------------------------------------------------------------------------
  //
  //
  //   입력값
  //
  //
  // ---------------------------------------------------------------------------------

  const addInput = () => {
    setInputs([
      ...inputs,
      {
        name: "",
        detail: {
          title: "",
          type: "",
          example: "",
          options: [""],
        },
      },
    ]);
  };

  const removeInput = (sectionIndex) => {
    const newinputs = inputs.filter((_, idx) => idx !== sectionIndex);
    setInputs(newinputs);
  };

  const updateInputTitle = (inputIndex, newTitle) => {
    const newinputs = inputs.map((section, index) => {
      if (index === inputIndex) {
        return { ...inputs, title: newTitle };
      }
      return section;
    });

    setInputs(newinputs);
  };

  // ---------------------------------------------------------------------------------
  //
  //
  //   옵션
  //
  //
  // ---------------------------------------------------------------------------------

  const addOption = (sectionIndex, newOption) => {
    const newinputs = inputs.map((section, idx) => {
      if (idx === sectionIndex) {
        return {
          ...section,
          detail: {
            ...section.detail,
            options: [...section.detail.options, newOption],
          },
        };
      }
      return section;
    });

    setInputs(newinputs);
  };

  const removeOption = (sectionIndex, optionIndex) => {
    const newinputs = inputs.map((section, idx) => {
      if (idx === sectionIndex) {
        const newOptions = section.detail.options.filter(
          (_, optIdx) => optIdx !== optionIndex
        );
        return {
          ...section,
          detail: {
            ...section.detail,
            options: newOptions,
          },
        };
      }
      return section;
    });

    setInputs(newinputs);
  };

  const updateDetail = (inputIndex, key, value) => {
    const newinputs = inputs.map((input, idx) => {
      if (idx === inputIndex) {
        return {
          ...input,
          detail: {
            ...input.detail,
            [key]: value,
          },
        };
      }
      return input;
    });

    setInputs(newinputs);
  };

  // 옵션

  const updateOption = (sectionIndex, optionIndex, newValue) => {
    const newinputs = inputs.map((section, idx) => {
      if (idx === sectionIndex) {
        // options 배열의 특정 인덱스의 값을 업데이트
        const newOptions = section.detail.options.map((option, optIdx) => {
          if (optIdx === optionIndex) {
            return newValue;
          }
          return option;
        });

        // 수정된 options 배열로 detail 객체 업데이트
        return {
          ...section,
          detail: {
            ...section.detail,
            options: newOptions,
          },
        };
      }
      return section;
    });

    setInputs(newinputs);
  };

  return (
    <div className="p-12 w-full ">
      <div className="mt-10 text-3xl font-medium">
        [새 알고리즘]
        <span className="ml-5">알고리즘 작성</span>
      </div>
      <div className="grid grid-cols-5  mt-6 gap-4">
        <div className="col-span-2">
          <Preview inputs={inputs} />
        </div>
        <div className="col-span-3">
          <Define
            inputs={inputs}
            addInput={addInput}
            removeInput={removeInput}
            updateInputTitle={updateInputTitle}
            addOption={addOption}
            removeOption={removeOption}
            updateDetail={updateDetail}
            updateOption={updateOption}
          />
        </div>
      </div>
    </div>
  );
}

export default NewAlgorithm;
