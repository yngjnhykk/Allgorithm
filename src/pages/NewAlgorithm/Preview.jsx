import React from "react";

function Preview({ sections }) {
  console.log(sections);
  return (
    <div className="bg-white p-6  border-2 rounded-lg space-y-6 border-gray-300 border-solid">
      <div className="text-2xl font-semibold">Function Creator</div>
      <div>
        <div className="text-xl">function ( )</div>
      </div>
    </div>
  );
}

export default Preview;
