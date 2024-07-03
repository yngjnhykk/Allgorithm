import Input from "./Input/Input";
import Output from "./Ouput/Ouput";

function Define({
  name,
  updateName,

  info,
  updateInfo,

  inputs,
  addInput,
  removeInput,
  updateInputTitle,

  outputs,
  addOutput,
  removeOutput,
  updateOutput,
  addOutputOption,
  removeOutputOption,
  updateOutputOption,

  addOption,
  removeOption,
  updateDetail,

  updateOption,

  content,
  updateContent,

  onClickRegisterBtn,
}) {
  return (
    <div className="bg-white p-6 rounded-lg space-y-6 border-solid border-2 border-gray-300">
      <div className="text-2xl font-semibold">알고리즘 설정</div>
      <div className=" space-y-4 flex flex-col gap-[50px]">
        {/* Name */}
        <div className="flex items-center mt-9">
          <div className="w-1/3 text-xl">알고리즘 이름</div>
          <input
            type="text"
            className="w-2/3 p-3 border rounded"
            placeholder="알고리즘 이름"
            value={name}
            onChange={(e) => {
              updateName(e.target.value);
            }}
          />
        </div>

        {/* 소개 */}
        <div className="flex items-center mt-10 ">
          <div className="w-1/3 text-xl">알고리즘 소개</div>
          <input
            type="text"
            className="w-2/3 p-3 border rounded "
            placeholder="알고리즘 소개"
            value={info}
            maxLength="20"
            onChange={(e) => {
              updateInfo(e.target.value);
            }}
          />
        </div>

        {/* 입력 값 */}
        <div className="flex flex-col w-full">
          <div className="text-xl mb-8">입력 값</div>
          {inputs.map((input, index) => (
            <div key={index}>
              <Input
                input={input}
                inputIndex={index}
                detail={input.detail}
                removeInput={removeInput}
                updateInputTitle={updateInputTitle}
                removeOption={removeOption}
                addOption={addOption}
                updateDetail={updateDetail}
                updateOption={updateOption}
              />
            </div>
          ))}

          {/* input 추가 버튼 */}
          <div className="flex items-center justify-center mt-14">
            <div className="flex-grow border-t border-gray-300" />
            <button
              onClick={addInput}
              className="px-40 py-3 border rounded-full font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:Cmain"
            >
              + 입력 값
            </button>
            <div className="flex-grow border-t border-gray-300" />
          </div>
        </div>

        {/* 출력 값 */}
        <div className="flex flex-col w-full">
          <div className="text-[22px] mb-8">출력 값</div>
          {outputs.map((output, index) => (
            <Output
              output={output}
              outputIndex={index}
              removeOutput={removeOutput}
              updateOutput={updateOutput}
              addOutputOption={addOutputOption}
              removeOutputOption={removeOutputOption}
              updateOutputOption={updateOutputOption}
              key={index}
            />
          ))}

          {/* output 추가 버튼 */}
          <div className="flex items-center justify-center mt-14">
            <div className="flex-grow border-t border-gray-300" />
            <button
              onClick={addOutput}
              className="px-40 py-3 border rounded-full font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:Cmain"
            >
              + 출력 값
            </button>
            <div className="flex-grow border-t border-gray-300" />
          </div>
        </div>

        {/* Content */}

        <div>
          <div className="text-[22px]">알고리즘 내용</div>
          <textarea
            className="w-full h-48 p-2 border rounded mt-8"
            placeholder="함수 내용에 들어갈 코드를 입력해주세요"
            value={content}
            onChange={(e) => {
              updateContent(e.target.value);
            }}
          />
        </div>
      </div>

      {/* 확인 버튼 */}
      <div className="flex items-center justify-center">
        <button
          className="bg-Cmain w-40 h-11 rounded-md text-white"
          onClick={onClickRegisterBtn}
        >
          알고리즘 확인
        </button>
      </div>
    </div>
  );
}

export default Define;
