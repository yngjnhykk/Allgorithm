import React from "react";
import {useNavigate} from "react-router";

function Header() {

  const navi = useNavigate();

  return (
    <div className="flex flex-row justify-between items-center bg-Cmain text-white h-[70px] px-[50px]">
      <div className="text-[32px]"><button onClick={() => {navi('/')}}>Allgorithm</button></div>
      <div className="flex gap-[50px] text-[20px] items-center">
        {/*<div>데이터 관리</div>*/}
        <div>
          <button className="" onClick={() => {navi('/')}}>
            시뮬레이터
          </button>
        </div>
        <button className="bg-white text-Cmain w-[10rem] h-[3rem] rounded-sm pointer font-[32px]" onClick={() => {
          navi('/NewAlgorithm')}}>
          + 새 알고리즘
        </button>
      </div>
    </div>
  );
}

export default Header;
