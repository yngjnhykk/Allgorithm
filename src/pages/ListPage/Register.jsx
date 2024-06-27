// eslint-disable-next-line no-unused-vars
import React from "react";

function Register() {
  return (
    <div className="grid grid-cols-12 gap-4 mx-auto bg-white p-6 rounded-lg">
      <div className={"col-start-2 col-span-10 p-2"}>
        <h2 className="text-2xl font-bold mb-16">[아이템 관리] 아이템 등록</h2>
        <form className={'border border-gray-200 p-12 shadow-lg'}>
          <div className="mb-6 flex border-b-2 pb-6">
            <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"/>
            <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"/>
            <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"/>
          </div>
          <div className="mb-6 flex border-b-2 pb-6">
            <label className="block text-gray-700 text-xl font-bold mb-2 w-full" htmlFor="shipType">
              선박 종류
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight "
            >
              <option value="">선택하세요</option>
              {/* Add more options here */}
            </select>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
