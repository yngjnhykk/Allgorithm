import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom/dist";
import {runAlgorithm} from "../../api/mainPage.js";
import {registerAlgorithm} from "../../api/algorithmTest.js";

// form_type별 입력 필드 요소 생성
function renderInput(input, key, formData, handleChange) {
  if (!input) return null; // input 빈값 처리

  const val = input.detail.example || '';

  switch (input.detail.type) {
    case 'text': // form_type : input
      return (
        <div key={key} className="flex mb-2.5">
          <label className="ms-3 w-1/2 block my-auto">{input.name}</label>
          <input
            placeholder={input.detail.example}
            name={input.detail.parameter_name}
            value={formData[input.detail.parameter_name] || val}
            onChange={handleChange}
            className="w-1/2 p-1.5 ps-2 border rounded text-right"
          />
        </div>
      );
    case 'select': // form_type : select
      return (
        <div key={key} className="flex mb-2.5">
          <label className="ms-3 w-1/2 block my-auto">{input.name}</label>
          <select
            name={input.detail.parameter_name}
            value={formData[input.detail.parameter_name] || val}
            onChange={handleChange}
            className="w-1/2 p-1.5 ps-2 border rounded"
          >
            <option hidden>Select {input.name}</option>
            {input.detail.options && input.detail.options.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      );
    case 'object': // form_type : object
      return (
        <>
          {input.detail.options && input.detail.options.map((option, optionIndex) => (
            <div key={`${key}-${optionIndex}`} className="flex mb-2.5">
              <label className="ms-3 w-1/2 block my-auto">{option.name}</label>
              <input
                placeholder={option.value}
                name={option.parameter_name}
                value={formData[option.parameter_name] || option.value}
                onChange={handleChange}
                className="w-1/2 p-1.5 ps-2 border rounded text-right"
              />
            </div>
          ))}
        </>
      );
    default:
      return null; // 다른 form_type 추가 가능
  }
}

// 입력 필드 그룹화 detail.title 기준
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

// 입력 폼 동적으로 생성
function FormGenerator({ data, formData, handleChange }) {

  if (!data || !data.inputs) return null; // 빈값 처리

  const groupedInputs = groupInputs(data.inputs);

  return (
    <form>
      {Object.keys(groupedInputs).map((title, index) => (
        <div key={index}>
          <h3 className="text-2xl font-black mb-3 mt-6">{title}</h3>
          {groupedInputs[title].map((input, inputIndex) => (
            renderInput(input, inputIndex, formData, handleChange) // renderInput 함수의 반환값을 사용
          ))}
        </div>
      ))}
    </form>
  );
}

// 메인 섹션 컴포넌트
function AlgorithmTest() {
  const [formData, setFormData] = useState({});
  const [output, setOutput] = useState([]);
  const navi = useNavigate();
  const location = useLocation();
  const reUse = location.state?.data; // 전달받은 데이터
  const [data, setData] = useState();

  useEffect(() => {
    if (reUse) {
      setData(reUse);

      const initialFormData = {};
      if (reUse.inputs) {
        reUse.inputs.forEach(input => {
          if (input.detail.type === 'object') {
            input.detail.options.forEach(option => {
              initialFormData[option.parameter_name] = option.value || '';
            });
          } else {
            initialFormData[input.detail.parameter_name] = input.detail.example || '';
          }
        });
      }
      setFormData(initialFormData);
    }
  }, [reUse]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const goBack = () => {
    navi('/newAlgorithm', { state: { data: reUse } });
  }

  const register = async() => {
    if (confirm('정말 등록 하시겠습니까?')) {
      try {

        const response = await registerAlgorithm(data);
        alert('정상적으로 등록되었습니다.')
      } catch (error) {
        alert('등록 실패')
        console.error('Error running algorithm:', error);
      }

      navi('/');
    }
  };

  const transformFormData = (formData, data) => {
    const transformedData = {
      name: data.name,
      datas: {
      }
    };

    data.inputs.forEach(input => {
      if (input.detail.type === 'object') {
        transformedData.datas[input.detail.parameter_name] = {};
        input.detail.options.forEach(option => {
          transformedData.datas[input.detail.parameter_name][option.parameter_name] = formData[option.parameter_name] || '';
        });
      } else {
        transformedData.datas[input.detail.parameter_name] = formData[input.detail.parameter_name] || '';
      }
    });
    return transformedData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const transformedData = transformFormData(formData, data);

      const response = await runAlgorithm(transformedData);

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

  return (
    <div className="p-12">
      <div className="my-10 text-3xl font-medium">
        [새 알고리즘]
        <span className="ml-5">입력값, 출력값 확인</span>
      </div>

      <div className="bg-gray-100 p-8 rounded">
        {/* 시뮬레이터 제목 */}
        <h2 className="text-2xl font-bold mb-8 pb-0">[시뮬레이터] {data?.name}</h2>
        <div className="grid grid-cols-12 p-3 bg-white rounded-xl">
          {/* 입력 섹션 */}
          <div className="col-span-6 m-4 p-4 border-2 border-gray-300 rounded-lg">
            <h3 className="font-bold mb-2">입력</h3>
            {/* 입력 폼 생성기 */}
            {data && <FormGenerator data={data} formData={formData} handleChange={handleChange} />}
            <div className="flex justify-center">
              <button type="button" onClick={handleSubmit}
                      className="w-3/5 mt-6 p-2 bg-Cmain text-white font-black text-lg rounded-xl">
                알고리즘 실행
              </button>
            </div>
          </div>

          {/* 출력 섹션 */}
          <div className="col-span-6 m-4 p-4 border-2 border-gray-300 rounded-lg">
            <h3 className="font-bold mb-2">출력</h3>
            {data?.outputs.map((item, idx) => (
              <div key={idx} className="flex mb-2">
                <label className="w-1/2 block my-2">{Object.values(item)[0]}</label>
                <input
                  value={Object.values(output)[idx] || ''}
                  readOnly
                  className="w-1/2 p-1.5 ps-2 border rounded text-right"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button onClick={goBack} className="w-1/4 p-2 bg-red-400 text-white font-black text-lg rounded-xl mr-4">
          뒤로가기
        </button>
        <button onClick={register} className="w-1/4 p-2 bg-Cmain text-white font-black text-lg rounded-xl">
          등록
        </button>
      </div>
    </div>
  );
}

export default AlgorithmTest;