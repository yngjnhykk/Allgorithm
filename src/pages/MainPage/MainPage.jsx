import {useState} from 'react';
import MainSection1 from "./MainSection1.jsx";
import MainSection2 from "./MainSection2.jsx";

function MainPage() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleDelete = () => {
    setSelectedAlgorithm(null); // 선택된 알고리즘 초기화
    setRefreshKey(oldKey => oldKey + 1); // 상태를 변경하여 MainSection1을 다시 렌더링
  };

  return (
    <div className={`grid grid-cols-12 gap-6 m-8 `} style={{height : `${!selectedAlgorithm ? "49rem" : ""}`}}>
      <div className={'col-span-3'}>
        <MainSection1 setSelectedAlgorithm={setSelectedAlgorithm} refreshKey={refreshKey} />
      </div>
      <div className={'col-span-9'}>
        <MainSection2 selectedAlgorithm={selectedAlgorithm} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default MainPage;
