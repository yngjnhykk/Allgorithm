import {useState} from 'react';
import data from './temp.json';
import axios from "axios";

// 입력 필드 요소 생성
function renderInput(input, key, formData, handleChange) {
  if (!input) return null; // input 빈값 처리

  switch (input.detail.form_type) {
    case 'input': // form_type : input
      return (
        <div key={key} className="flex mb-2.5">
          <label className="w-1/2 block my-auto">{input.name}</label>
          <input
            type={input.detail.type}
            name={input.detail.parameter_name}
            value={formData[input.detail.parameter_name] || ''}
            onChange={handleChange}
            className="w-1/2 p-1.5 ps-2 border rounded text-right"
          />
        </div>
      );
    case 'select': // form_type : select
      return (
        <div key={key} className="flex mb-2.5">
          <label className="w-1/2 block my-auto">{input.name}</label>
          <select
            name={input.detail.parameter_name}
            value={formData[input.detail.parameter_name] || ''}
            onChange={handleChange}
            className="w-1/2 p-1.5 ps-2 border rounded"
          >
            {input.detail.options && input.detail.options.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
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
// eslint-disable-next-line react/prop-types
function FormGenerator({data, formData, handleChange}) {
  // eslint-disable-next-line react/prop-types
  if (!data || !data.input) return null; // 빈값 처리

  const groupedInputs = groupInputs(data.input);

  return (
    <form>
      {Object.keys(groupedInputs).map((title, index) => (
        <div key={index}>
          <h3 className="text-2xl font-black mb-3 mt-6">{title}</h3>
          {groupedInputs[title].map((input, inputIndex) =>
            renderInput(input, inputIndex, formData, handleChange)
          )}
        </div>
      ))}
    </form>
  );
}

// 메인 섹션 컴포넌트
function MainSection2() {

  // 필드 state 통합관리
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // 알고리즘 실행 버튼
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // 데이터 처리 여기서
    axios.post('http://192.168.219.178:1880/allgo', formData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  };

  return (
    <div className="bg-gray-100 p-4 rounded">
      {/* 시뮬레이터 제목 */}
      <h2 className="text-2xl font-bold mb-8 pb-0">[시뮬레이터] {data.name}</h2>
      <div className="grid grid-cols-12 p-3 bg-white rounded-xl">

        {/* 입력 섹션 */}
        <div className="col-span-6 m-4 p-4 border-2 border-gray-300 rounded-lg">
          <h3 className="font-bold mb-2">입력</h3>
          {/* 입력 폼 생성기 */}
          <FormGenerator data={data} formData={formData} handleChange={handleChange}/>
          <div className={'flex justify-center'}>
            <button type="button" onClick={handleSubmit}
                    className="w-3/5 mt-6 p-2 bg-Cmain text-white font-black text-lg rounded-xl">알고리즘 실행
            </button>
          </div>
        </div>

        {/* 출력 섹션 */}
        <div className="col-span-6 m-4 p-4 border-2 border-gray-300 rounded-lg">
          <h3 className="font-bold mb-2">출력</h3>
          <div className={'flex mb-2'}>
            <label className="w-1/2 block my-2">Required CII</label>
            <input type="text" value={data.return.required_cii} className="w-1/2 p-2 border rounded" readOnly/>
          </div>
          <div className={'flex mb-2'}>
            <label className="w-1/2 block my-2">Attained CII</label>
            <input type="text" value={data.return.attained_cii} className="w-1/2 p-2 border rounded" readOnly/>
          </div>
          <div className={'flex mb-2'}>
            <label className="w-1/2 block my-2">Grade</label>
            <input type="text" value={data.return.grade} className="w-1/2 p-2 border rounded" readOnly/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainSection2;
