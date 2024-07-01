import axios from "axios";

const convertEscapedStringToCode = (escapedString) => {
  // 백틱을 제거하고 문자열 내의 모든 필요한 이스케이프 처리를 진행
  return escapedString
    .replace(/\\n/g, "\n")
    .replace(/\\"/g, '"')
    .replace(/\\t/g, "\t");
  // .replace(/`/g, "\\`"); // 백틱 이스케이프 추가
};

export const postAlgorithm = async (newAlgorithm) => {
  const wrappedContent = `\`${newAlgorithm.content}\``;
  console.log(wrappedContent);

  const data = {
    ...newAlgorithm,
    content: convertEscapedStringToCode(wrappedContent),
  };

  const response = await axios.post("http://127.0.0.1:1880/allgorithm", {
    data,
  });
  console.log(response.data);
  alert(`RequiredCII: ${response.data.requiredCII}`);
  return response;
};
