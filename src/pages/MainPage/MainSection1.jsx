import {algorithmList, getAlgorithmById} from "../../api/mainPage.js";
import {useEffect, useState} from "react";

function MainSection1({ setSelectedAlgorithm, refreshKey }) {
  const [algoList, setAlgoList] = useState([]);

  const getList = async () => {
    try {
      const list = await algorithmList();
      const formattedList = list.map(item => {
        return {"name": item.algorithm_name, "info": item.algorithm_info, "id" : item.algorithm_id};
      });
      setAlgoList(formattedList); // 상태 업데이트
    } catch (error) {
      console.error("Failed to fetch algorithm list:", error);
    }
  };

  const getAlgorithm = async (id) => {
    try {
      const algorithmDetails = await getAlgorithmById(id); // API call to get details by ID
      setSelectedAlgorithm(algorithmDetails);
    } catch (error) {
      console.error("Failed to fetch algorithm details:", error);
    }
  };

  useEffect(() => {
    getList(); // 컴포넌트가 마운트될 때 리스트 가져오기
  }, [refreshKey]);

  return (
    <div className="bg-gray-100 p-4 min-h-full">
      <h2 className="text-2xl font-bold mb-8">[알고리즘 목록]</h2>
      <ul>
        {algoList.length > 0 ? (
          algoList.map((item, idx) => (
            <button key={idx} className="bg-white px-4 py-6 mb-6 shadow-md rounded-xl text-start w-full" onClick={() => getAlgorithm(item.id)}>
              <div className="mb-2">
                <h3 className="font-bold text-xl mb-4">{item.name}</h3>
                <p>{item.info}</p>
              </div>
            </button>
          ))
        ) : (
          <p>No algorithms found</p>
        )}
      </ul>
    </div>
  );
}

export default MainSection1;
