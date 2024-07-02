import React, { useState } from "react";
import Preview from "./Preview";
import Define from "./Define/Define";
import { postAlgorithm } from "../../api/newAlgorithm";
import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router-dom/dist";

function NewAlgorithm() {
  const [name, setName] = useState("CII");
  const [info, setInfo] = useState(
    "기업의 탄소 배출 강도를 평가하고 비교하는 데 사용되는 방법론"
  );
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

  const [outputs, setOutputs] = useState([
    {
      name: "Required_CII",
      parameter_name: "requiredCII",
      type: "text",
      options: [""],
    },
    {
      name: "Attained_CII",
      parameter_name: "attainedCII",
      type: "text",
      options: [""],
    },
    {
      name: "Grade",
      parameter_name: "grade",
      type: "text",
      options: [""],
    },
  ]);

  const [content, setContent] = useState(``);

  const navigate = useNavigate();

  // ---------------------------------------------------------------------------------
  //
  //
  //   이름, 소개
  //
  //
  // ---------------------------------------------------------------------------------

  const updateName = (newValue) => {
    setName(newValue);
  };

  const updateInfo = (newValue) => {
    setInfo(newValue);
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
  //  입력값 옵션
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

  // ---------------------------------------------------------------------------------
  //
  //
  //   출력값
  //
  //
  // ---------------------------------------------------------------------------------

  const addOutput = () => {
    setOutputs([
      ...outputs,
      {
        name: "",
        parameter_name: "",
        type: "Text",
        options: [""],
      },
    ]);
  };

  const removeOutput = (sectionIndex) => {
    const newinputs = outputs.filter((_, idx) => idx !== sectionIndex);
    setOutputs(newinputs);
  };

  const updateOutput = (index, key, value) => {
    console.log(index, key, value);
    const newOutputs = [...outputs];
    newOutputs[index][key] = value;
    setOutputs(newOutputs);
  };

  // ---------------------------------------------------------------------------------
  //
  //
  //  출력값 옵션
  //
  //
  // ---------------------------------------------------------------------------------

  const addOutputOption = (outputIndex) => {
    console.log("addOption");
    const newOutputs = outputs.map((output, idx) => {
      if (idx === outputIndex) {
        return {
          ...output,
          options: [...output.options, ""],
        };
      }

      return output;
    });

    setInputs(newOutputs);
  };

  // 옵션 제거
  const removeOutputOption = (outputIndex, optionIndex) => {
    const newOutputs = outputs.map((output, idx) => {
      if (idx === outputIndex) {
        const newOptions = output.options.filter(
          (_, optIdx) => optIdx !== optionIndex
        );
        return {
          ...output,
          options: newOptions,
        };
      }
      return output;
    });

    setOutputs(newOutputs);
  };

  const updateOutputOption = (outputIndex, optionIndex, newValue) => {
    const newOutputs = outputs.map((output, idx) => {
      if (idx === outputIndex) {
        const newOptions = output.options.map((option, optIdx) => {
          if (optIdx === optionIndex) {
            return newValue; // 옵션 값 업데이트
          }
          return option;
        });

        return {
          ...output,
          options: newOptions,
        };
      }
      return output;
    });

    setOutputs(newOutputs);
  };

  // content 저장 ----------------------------------------

  const updateContent = (newContent) => {
    setContent(newContent);
  };

  // newAlgorithm 저장 ----------------------------------------

  const outputsDisplay = outputs
    .map((output) => `  ${output.name} : ${output.parameter_name},\n`)
    .join("");

  const functionString = `
    ${content}
    return {
  ${outputsDisplay}
    };
  `;

  const checkResult = useMutation(
    (newAlgorithm) => postAlgorithm(newAlgorithm),
    {
      onSuccess: (data) => {
        console.log(`data: ${data}`);
        const isConfirmed = window.confirm(
          `입력하신 예제 값에 대한 결과입니다. 맞으시다면, '확인' 버튼을 눌러 다음 단계(알고리즘 확인)로 이동하세요.
  
  Required_CII: ${data.Required_CII}
  Attained_CII: ${data.Attained_CII}
  Grade: ${data.Grade}`
        );
        if (isConfirmed) {
          // 상태(state)를 사용하여 데이터 전달
          navigate("/algorithmTest", {
            state: {
              data: {
                name,
                info,
                inputs,
                outputs,
                content,
              },
            },
          });
        }
      },
      onError: (error) => {
        console.error("error", error);
      },
    }
  );

  const onClickRegisterBtn = () => {
    const newAlgorithm = {
      name,
      parameter: ["data"],
      content: functionString,
    };
    // console.log(functionString);
    checkResult.mutate(newAlgorithm);
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
          <Preview
            name={name}
            inputs={inputs}
            content={content}
            outputs={outputs}
          />
        </div>
        <div className="col-span-3">
          <Define
            name={name}
            updateName={updateName}
            info={info}
            updateInfo={updateInfo}
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
            outputs={outputs}
            addOutput={addOutput}
            removeOutput={removeOutput}
            updateOutput={updateOutput}
            addOutputOption={addOutputOption}
            removeOutputOption={removeOutputOption}
            updateOutputOption={updateOutputOption}
          />
        </div>
      </div>
    </div>
  );
}

export default NewAlgorithm;
