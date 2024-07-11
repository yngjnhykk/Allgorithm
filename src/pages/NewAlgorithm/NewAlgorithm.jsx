import React, {useEffect, useState} from "react";
import Preview from "./Preview";
import Define from "./Define/Define";
import { postAlgorithm } from "../../api/newAlgorithm";
import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router-dom/dist";
// import { ciiTestData } from "../../api/test";

function NewAlgorithm() {
  const location = useLocation();
  const reUse = location.state?.data; // 전달받은 데이터
  // const reUse = ciiTestData;
  // console.log(reUse);

  const [name, setName] = useState(reUse?.name || "");
  const [info, setInfo] = useState(reUse?.info || "");
  const [inputs, setInputs] = useState(reUse?.inputs || []);
  const [parameterNames, setParameterNames] = useState(reUse?.parameterNames || []);

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

  useEffect(() => {
    setParameterNames(inputs.map(item => item.detail.parameter_name))
  }, [inputs]);

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

  const updateOption = (sectionIndex, newValue, optionIndex, field) => {
    const newinputs = inputs.map((section, idx) => {
      if (idx === sectionIndex) {
        // options 배열의 특정 인덱스의 값을 객체 형태로 업데이트
        const newOptions = section.detail.options.map((option, optIdx) => {
          if (optIdx === optionIndex) {
            if (field) {
              // 객체 형태의 옵션 (object 타입) 업데이트
              return {
                ...option,
                [field]: newValue
              };
            } else {
              // 단순 값의 옵션 (select 타입) 업데이트
              return newValue;
            }
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

  // 예제 값으로 예제 객체 데이터 생성 ------------------------------------------------

  function createDataObject(inputs) {
    const data = {};

    inputs.forEach((input) => {

      const parameterName = input.detail.parameter_name;
      const exampleValue = input.detail.example;

      if (
        input.detail.type === "object" &&
        Array.isArray(input.detail.options)
      ) {
        const objectData = {};
        input.detail.options.forEach((option) => {
          objectData[option.parameter_name] = option.value;
        });
        data[parameterName] = objectData;

      } else if (parameterName && exampleValue !== undefined) {
        data[parameterName] = exampleValue;
      }
    });

    return data;
  }

  const checkResult = useMutation(
    (newAlgorithm) => postAlgorithm(newAlgorithm),
    {
      onSuccess: (data) => {


        let resultMessage = `입력하신 예제 값에 대한 결과입니다. 맞으시다면, '확인' 버튼을 눌러 다음 단계(알고리즘 확인)로 이동하세요.\n\n`;

        for (const [key, value] of Object.entries(data)) {
          resultMessage += `${key}: ${value}\n`;
        }
        const isConfirmed = window.confirm(resultMessage);
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
                parameterNames
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
      parameter: [...parameterNames],
      content: functionString,
      example: createDataObject(inputs),
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
