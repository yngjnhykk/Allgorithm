import axios from "axios";

const convertEscapedStringToCode = (escapedString) => {
  // 백틱을 제거하고 문자열 내의 모든 필요한 이스케이프 처리를 진행
  return escapedString
    .replace(/\\n/g, "\n")
    .replace(/\\"/g, '"')
    .replace(/\\t/g, "\t");
};

export const postAlgorithm = async (newAlgorithm) => {
  try {
    const wrappedContent = `\`${newAlgorithm.content}\``;

    const data = {
      ...newAlgorithm,
      content: convertEscapedStringToCode(wrappedContent),
    };

    const response = await axios.post("http://118.129.145.84:1880/allgo_test", {
      data,
    });
    console.log(response.data);
    return response.data;
  } catch {
    err;
  }
  {
    console.error(err);
  }
};
