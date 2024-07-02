import React, { useState } from "react";
import Preview from "./Preview";
import Define from "./Define/Define";
import { postAlgorithm } from "../../api/newAlgorithm";
import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router-dom/dist";
import { ciiTestData } from "../../api/test";

function NewAlgorithm() {
  const location = useLocation();
  const reUse = location.state?.data; // 전달받은 데이터
  // const reUse = ciiTestData;
  console.log(reUse);

  const [name, setName] = useState(reUse?.name || "");
  const [info, setInfo] = useState(reUse?.info || "");
  const [inputs, setInputs] = useState(reUse?.inputs || []);

  const [outputs, setOutputs] = useState(reUse?.outputs || []);

  const [content, setContent] = useState(reUse?.content || ``);

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
