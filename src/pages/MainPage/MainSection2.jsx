import React, {useEffect, useState, useRef} from 'react';
import {deleteAlgorithm, runAlgorithm} from '../../api/mainPage.js';
import {useNavigate} from 'react-router-dom';
import {IoMdClose} from 'react-icons/io';
import {FaCopy} from 'react-icons/fa';

// 입력 필드별 컴포넌트 생성
function renderInput(input, key, formData, handleChange) {
  if (!input) return null;

  switch (input.detail.type) {
    case 'text':
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

// 모달 컴포넌트
function Modal({isOpen, onClose, children}) {
  const modalRef = useRef();

  useEffect(() => {
    // 모달 바깥을 클릭했을 때 모달 닫기
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div ref={modalRef} className="bg-gray-100 p-8 rounded-lg z-50 w-1/2">
        <div className={'w-full text-right -mt-5'}>
          <button
            onClick={onClose}
            className="relative text-black text-xl -m-5"
          >
            <IoMdClose/>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

// 메인 섹션 컴포넌트
function MainSection2({selectedAlgorithm, onDelete}) {
  const [formData, setFormData] = useState({});
  const [output, setOutput] = useState({});

  // api 관련
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiContent, setApiContent] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [editableApiContent, setEditableApiContent] = useState("");
  const [apiUrl, setApiUrl] = useState("");

  const textareaRef = useRef(null);
  const navi = useNavigate();

  // 알고리즘 선택시 초기화
  useEffect(() => {
    setFormData({});
    setOutput({});
    setApiContent("");
  }, [selectedAlgorithm]);


  // Api설정 textarea 크기 조정
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [apiContent, isModalOpen]);

  // 라디오 옵션 변경
  useEffect(() => {
    setApiContent("")
    setEditableApiContent("")
    if (selectedOption === 'GET') {
      const transformedData = transformFormData(formData, selectedAlgorithm);
      const url = generateGetURL(transformedData);
      setApiContent(url)
      setEditableApiContent(url)
      setApiUrl(""); // GET 방식에서는 전체 URL이 editableApiContent에 들어가므로 apiUrl은 비웁니다.
    } else if(selectedOption === "POST"){
      const transformedData = transformFormData(formData, selectedAlgorithm);
      const apiContentString = JSON.stringify(transformedData, null, 2);
      setApiContent(apiContentString);
      setEditableApiContent(apiContentString);
      setApiUrl("http://118.129.145.84:1880/allgo_run"); // POST 방식에서는 기본 URL을 apiUrl에 설정합니다.
    }
  }, [selectedOption]);

  // 폼 데이터 변경 핸들러
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // GET 방식으로 전달할 URL을 생성하는 함수
  const generateGetURL = (data) => {
    let baseUrl = "http://118.129.145.84:1880/allgo_run";

    function encodeObject(obj, prefix = '') {
      return Object.entries(obj).map(([key, value]) => {
        const fullKey = prefix ? `${prefix}[${encodeURIComponent(key)}]` : encodeURIComponent(key);

        if (value === null || value === undefined || value === '') {
          return `${fullKey}=`;
        } else if (typeof value === 'object') {
          return encodeObject(value, fullKey);
        } else {
          return `${fullKey}=${encodeURIComponent(value)}`;
        }
      }).join('&');
    }

    const queryString = encodeObject(data);
    return `${baseUrl}?${queryString}`;

  };

  // formData를 원하는 형태로 변환하는 함수
  const transformFormData = (formData, data) => {
    const transformedData = {
      name: data.algorithm_name,
      datas: {}
    };

    data.algorithm_input.forEach(input => {
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

  // 수정버튼 클릭
  const editHandler = () => {
    const transformData = {
      name: selectedAlgorithm.algorithm_name,
      info: selectedAlgorithm.algorithm_info,
      inputs: selectedAlgorithm.algorithm_input,
      outputs: selectedAlgorithm.algorithm_output,
      content: selectedAlgorithm.algorithm_content,
    };
    navi('/newAlgorithm', {state: {data: transformData}});
  };
  // 삭제버튼 클릭
  const deleteHandler = () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      deleteAlgorithm(selectedAlgorithm.algorithm_id);
      alert('삭제되었습니다.');
      onDelete();
    }
  };

  // 알고리즘 실행 버튼 클릭 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const transformedData = transformFormData(formData, selectedAlgorithm);

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

  // 복사
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(editableApiContent);
      alert('내용이 클립보드에 복사되었습니다.');
    } catch (err) {
      console.error('Failed to copy text: ', err);
      alert('텍스트를 클립보드에 복사하는데 실패했습니다.');
    }
  };
  // 라디오 옵션 변경
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // apiContent 수정
  const handleApiContentChange = (e) => {
    setEditableApiContent(e.target.value);
  };

  const openModal = () => {
    setSelectedOption(null)
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-2xl font-bold mb-4">API 설정</h2>

        <div className="flex my-2">
          <div className="flex items-center me-4">
            <input type="radio" value="GET" name="inline-radio-group" onChange={handleOptionChange}
                   checked={selectedOption === 'GET'}
                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">GET</label>
          </div>
          <div className="flex items-center me-4">
            <input type="radio" value="POST" name="inline-radio-group" onChange={handleOptionChange}
                   checked={selectedOption === 'POST'}
                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">POST</label>
          </div>
        </div>

        {apiUrl && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">API URL:</label>
            <input
              type="text"
              value={apiUrl}
              readOnly
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        )}

        <div className="relative mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {selectedOption === 'GET' ? 'Full URL :' : 'Request Body :'}
          </label>
          <textarea
            ref={textareaRef}
            className={'p-2 bg-white w-full pr-12 border border-gray-300 rounded-md shadow-sm'}
            value={editableApiContent}
            onChange={handleApiContentChange}
            rows={10}
          />
          <button
            onClick={copyToClipboard}
            className="absolute right-2 top-8 text-gray-600 hover:text-gray-800"
            title="복사하기"
          >
            <FaCopy size={20}/>
          </button>
        </div>
      </Modal>

      {selectedAlgorithm !== null ? (
        <div className="bg-gray-100 p-4 rounded h-full">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold mt-2 ms-4 mb-8 pb-0">{selectedAlgorithm.algorithm_name}</h2>
            <div>
              <button className="bg-Cmain rounded-2xl p-3 text-xl font-black text-white me-4"
                      onClick={openModal}
              >API 설정
              </button>
              <button className="bg-Cmain rounded-2xl p-3 text-xl font-black text-white me-4"
                      onClick={editHandler}
              >알고리즘 수정
              </button>
              <button className="bg-red-500 rounded-2xl p-3 text-xl font-black text-white"
                      onClick={deleteHandler}
              >알고리즘 삭제
              </button>
            </div>
          </div>
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
      ) : (
        <div className="bg-gray-100 p-4 rounded h-full flex justify-center">
          <h2 className="text-3xl my-auto">알고리즘을 선택하세요</h2>
        </div>
      )}
    </>
  );
}

export default MainSection2;
