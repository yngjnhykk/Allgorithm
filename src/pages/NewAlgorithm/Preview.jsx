function Preview({ name, inputs, content }) {
  const parameterNames = inputs.map((item) => item.detail.parameter_name);
  const parametersDisplay = parameterNames.join(", ");

  return (
    <div className="bg-white p-6 border-2 rounded-lg space-y-6 border-gray-300 border-solid">
      <div className="text-2xl font-semibold">알고리즘 Preview</div>
      <div>
        <div className="text-sm bg-gray-100 p-4 rounded overflow-x-auto">
          function {name} ({parametersDisplay}) {"{"}
          <pre>{content}</pre>
          {"}"}
        </div>
      </div>
    </div>
  );
}

export default Preview;
