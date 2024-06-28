function Preview({ name, inputs }) {
  const parameterNames = inputs.map((item) => item.detail.parameter_name);
  const parametersDisplay = parameterNames.join(", ");
  const content = "내용";

  return (
    <div className="bg-white p-6 border-2 rounded-lg space-y-6 border-gray-300 border-solid">
      <div className="text-2xl font-semibold">알고리즘 Preview</div>
      <div>
        <div className="text-xl">
          function {name} ({parametersDisplay}) {"{"} {content} {"}"}
        </div>
      </div>
    </div>
  );
}

export default Preview;
