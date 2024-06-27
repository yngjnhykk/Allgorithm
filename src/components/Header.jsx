import React from "react";

function Header() {
  return (
    <div className="flex flex-row justify-between items-center bg-Cmain text-white h-[70px] px-[50px]">
      <div className="text-[32px]">Allgorithm</div>
      <div className="flex gap-[50px] text-[20px] items-center">
        <div>데이터 관리</div>
        <div>시뮬레이터</div>
        <button className="bg-white text-Cmain w-[10rem] h-[3rem] rounded-sm pointer font-[32px]">
          + 새 알고리즘
        </button>
      </div>
    </div>
  );
}

export default Header;
