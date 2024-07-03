import {useState} from 'react';
import MainSection1 from "./MainSection1.jsx";
import MainSection2 from "./MainSection2.jsx";

function MainPage() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);

  return (
    <div className={`grid grid-cols-12 gap-6 m-8 `} style={{height : `${!selectedAlgorithm ? "49rem" : ""}`}}>
      <div className={'col-span-3'}>
        <MainSection1 setSelectedAlgorithm={setSelectedAlgorithm} />
      </div>
      <div className={'col-span-9'}>
        <MainSection2 selectedAlgorithm={selectedAlgorithm} />
      </div>
    </div>
  );
}

export default MainPage;
