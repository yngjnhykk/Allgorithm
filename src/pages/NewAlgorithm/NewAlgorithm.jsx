import React, { useState } from "react";
import Preview from "./Preview";
import Define from "./Define/Define";
import { postAlgorithm } from "../../api/newAlgorithm";

function NewAlgorithm() {
  const [name, setName] = useState("CII");

  const [inputs, setInputs] = useState([
    {
      name: "Ship Type",
      detail: {
        title: "Ship Information",
        parameter_name: "ship_type",
        type: "select",
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
    {
      name: "DWT at Summer Load Draught",
      detail: {
        title: "Ship Information",
        parameter_name: "dwt",
        type: "input",
        example: 69999,
      },
    },
    {
      name: "Gross Tonnage",
      detail: {
        title: "Ship Information",
        parameter_name: "gt",
        type: "input",
        example: 51164,
      },
    },
    {
      name: "Fuels",
      detail: {
        title: "Fuel Information",
        parameter_name: "fuels",
        type: "object",
        options: [
          {
            name: "Diesel/Gas Oil",
            parameter_name: "diesel",
            value: 26,
          },
          {
            name: "Heavy Fuel Oil",
            parameter_name: "hfo",
            value: 0,
          },
          {
            name: "Light Fuel Oil",
            parameter_name: "lfo",
            value: 5693,
          },
          {
            name: "LPG Propane",
            parameter_name: "lpg-p",
            value: 0,
          },
          {
            name: "LPG Butane",
            parameter_name: "lpg-b",
            value: 0,
          },
          {
            name: "Liquefied Natural Gas",
            parameter_name: "lng",
            value: 0,
          },
          {
            name: "Methanol",
            parameter_name: "methanol",
            value: 0,
          },
          {
            name: "Ethanol",
            parameter_name: "ethanol",
            value: 0,
          },
        ],
        example: "",
      },
    },
    {
      name: "Total Distance Traveled",
      detail: {
        title: "Voyage Information",
        parameter_name: "distance",
        type: "input",
        example: 61523,
      },
    },
    {
      name: "Reduction Factor",
      detail: {
        title: "Etc",
        parameter_name: "reduction_factor",
        type: "select",
        options: [
          "2019",
          "2020",
          "2021",
          "2022",
          "2023",
          "2024",
          "2025",
          "2026",
        ],
        example: "2024",
      },
    },
  ]);

  const [content, setContent] = useState(``);

  //   console.log({
  //     name,
  //     inputs,
  //     content,
  //   });
  console.log(content);

  // ---------------------------------------------------------------------------------
  //
  //
  //   이름
  //
  //
  // ---------------------------------------------------------------------------------

  const updateName = (newValue) => {
    setName(newValue);
  };

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

  const updateInputTitle = (sectionIndex, newTitle) => {
    const newInputs = inputs.map((input, index) => {
      if (index === sectionIndex) {
        return {
          ...input,
          name: newTitle,
        };
      }
      return input;
    });

    setInputs(newInputs);
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

  // ---------------------------------------------------------------------------------
  //
  //
  //   옵션
  //
  //
  // ---------------------------------------------------------------------------------

  const addOption = (inputIndex) => {
    console.log("addOption");
    const newinputs = inputs.map((input, idx) => {
      if (idx === inputIndex) {
        return {
          ...input,
          detail: {
            ...input.detail,
            options: [...input.detail.options, ""],
          },
        };
      }
      return input;
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

  const updateContent = (newContent) => {
    setContent(newContent);
  };

  // newAlgorithm 저장 ----------------------------------------

  const onClickRegisterBtn = () => {
    const newAlgorithm = {
      name,
      parameter: ["data"],
      content,
    };
    postAlgorithm(newAlgorithm);
  };

  // ----------------------------------------------------------

  return (
    <div className="p-12 w-full ">
      <div className="mt-10 text-3xl font-medium">
        [새 알고리즘]
        <span className="ml-5">알고리즘 작성</span>
      </div>
      <div className="grid grid-cols-5  mt-6 gap-4">
        <div className="col-span-2">
          <Preview name={name} inputs={inputs} content={content} />
        </div>
        <div className="col-span-3">
          <Define
            name={name}
            updateName={updateName}
            inputs={inputs}
            addInput={addInput}
            removeInput={removeInput}
            updateInputTitle={updateInputTitle}
            addOption={addOption}
            removeOption={removeOption}
            updateDetail={updateDetail}
            updateOption={updateOption}
            content={content}
            updateContent={updateContent}
            onClickRegisterBtn={onClickRegisterBtn}
          />
        </div>
      </div>
    </div>
  );
}

export default NewAlgorithm;
