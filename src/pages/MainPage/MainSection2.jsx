import {useEffect, useState} from 'react';
import {runAlgorithm} from '../../api/mainPage.js';

// 입력 필드별 컴포넌트 생성
function renderInput(input, key, formData, handleChange) {
  if (!input) return null;

  switch (input.detail.type) {
    case 'string' :
      return (
        <div key={key} className="flex mb-2.5">
          <label className="w-1/2 block my-auto">{input.name}</label>
          <input
            type="text"
            name={input.detail.parameter_name}
            value={formData[input.detail.parameter_name] || ''}
            onChange={handleChange}
            placeholder={input.detail.example}
            className="w-1/2 p-1.5 ps-2 border rounded text-right"
          />
        </div>
      );
    case 'select':
      return (
        <div key={key} className="flex mb-2.5">
          <label className="w-1/2 block my-auto">{input.name}</label>
          <select
            name={input.detail.parameter_name}
            value={formData[input.detail.parameter_name] || ''}
            onChange={handleChange}
            className="w-1/2 p-1.5 ps-2 border rounded"
          >
            <option value="" hidden>Select {input.name}</option>
            {input.detail.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      );
    case 'object':
      return (
        <div key={key}>
          {input.detail.options.map((option, index) => (
            <div key={`${key}-${index}`} className="flex mb-2.5">
              <label className="w-1/2 block my-auto">{option.name}</label>
              <input
                type="text"
                name={option.parameter_name}
                value={formData[option.parameter_name] || ''}
                onChange={handleChange}
                placeholder={option.value}
                className="w-1/2 p-1.5 ps-2 border rounded text-right"
              />
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
}

// 입력 필드를 title로 그룹화
function groupInputs(inputs) {
  const grouped = {};
  inputs.forEach((input) => {
    const title = input.detail.title;
    if (!grouped[title]) {
      grouped[title] = [];
    }
    grouped[title].push(input);
  });
  return grouped;
}

// 입력 폼 생성기
function FormGenerator({algorithmData, formData, handleChange}) {
  console.log(algorithmData)
  if (!algorithmData || !algorithmData.algorithm_input) return null;

  const groupedInputs = groupInputs(algorithmData.algorithm_input);

  return (
    <form>
      {Object.keys(groupedInputs).map((title, index) => (
        <div key={index}>
          <h3 className="text-lg font-bold mb-3 mt-6">{title}</h3>
          {groupedInputs[title].map((input, inputIndex) =>
            renderInput(input, inputIndex, formData, handleChange)
          )}
        </div>
      ))}
    </form>
  );
}

// 메인 섹션 컴포넌트
function MainSection2({selectedAlgorithm}) {
  const [formData, setFormData] = useState({});
  const [output, setOutput] = useState({});

  useEffect(() => {
    console.log(selectedAlgorithm);
  }, [selectedAlgorithm]);

  // 폼 데이터 변경 핸들러
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // formData를 원하는 형태로 변환하는 함수
  const transformFormData = (formData) => {
    const transformedData = {...formData};

    // fuels 데이터 추출 및 처리
    const fuels = {};
    for (const key in transformedData) {
      if (["diesel", "hfo", "lfo", "lpg-p", "lpg-b", "lng", "methanol", "ethanol"].includes(key)) {
        fuels[key] = transformedData[key];
        delete transformedData[key]; // 폼 데이터에서 fuels 키 제거
      }
    }

    transformedData.name = selectedAlgorithm.algorithm_name;
    transformedData.fuels = fuels;
    return transformedData;
  };

  // 알고리즘 실행 버튼 클릭 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);

    try {
      const transformedData = transformFormData(formData, selectedAlgorithm);
      console.log('Transformed Form Data:', transformedData);

      const response = await runAlgorithm(transformedData);
      console.log('Algorithm result:', response);

      // response가 유효한지 확인
      if (response) {
        setOutput(response); // 결과를 상태에 설정
      } else {
        console.error('API returned undefined data');
      }
    } catch (error) {
      console.error('Error running algorithm:', error);
    }
  };

  if (selectedAlgorithm !== null)
    return (
      <div className="bg-gray-100 p-4 rounded h-full">
        <h2 className="text-2xl font-bold mb-8 pb-0">{selectedAlgorithm.algorithm_name}</h2>
        <div className="grid grid-cols-12 p-3 bg-white rounded-xl">

          {/* 입력 섹션 */}
          <div className="col-span-6 m-4 p-4 border-2 border-gray-300 rounded-lg">
            <h3 className="font-bold mb-2">입력</h3>
            <FormGenerator algorithmData={selectedAlgorithm} formData={formData} handleChange={handleChange}/>
            <div className="flex justify-center">
              <button onClick={handleSubmit}
                      className="w-3/5 mt-6 p-2 bg-Cmain text-white font-bold text-lg rounded-xl">
                알고리즘 실행
              </button>
            </div>
          </div>

          {/* 출력 섹션 */}
          <div className="col-span-6 m-4 p-4 border-2 border-gray-300 rounded-lg">
            <h3 className="font-bold mb-2">출력</h3>
            {selectedAlgorithm.algorithm_output.map((item, idx) => (
              <div key={idx} className="flex mb-2.5">
                <label className="w-1/2 block my-2">{item.name || ''}</label>
                <input
                  type="text"
                  value={Object.values(output)[idx] || ''}
                  className="w-1/2 p-2 border rounded text-right"
                  readOnly
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    );
  else return (
    <div className={"bg-gray-100 p-4 rounded h-full flex justify-center"}>
      <h2 className={'text-3xl my-auto'}>알고리즘을 선택하세요</h2>
    </div>
  )
}

export default MainSection2;
