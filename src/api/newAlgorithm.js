import axios from "axios";

const convertEscapedStringToCode = (escapedString) => {
  return escapedString
    .replace(/\\n/g, "\n")
    .replace(/\\"/g, '"')
    .replace(/\\t/g, "\t");
};

export const postAlgorithm = async (newAlgorithm) => {
  const wrappedContent = `\`${newAlgorithm.content}\``;

  const data = {
    name: "CII",
    parameter: ["data"],
    content: convertEscapedStringToCode(wrappedContent),
  };

  const response = await axios.post("http://127.0.0.1:1880/allgorithm", {
    data,
  });
  console.log(response.data);
  alert(`RequiredCII: ${response.data.requiredCII}`);
  return response;
};
