function MainSection1() {

  const data1 = [
    {title : "CII", content : "기업의 탄소 배출 강도를 평가하고 비교하는 데 사용되는 방법론"},
    {title : "Quick Sort", content : "피벗을 기준으로 배열을 분할하고 재귀적으로 정렬하는 분할 정복 알고리즘"},
    {title : "Bubble Sort", content : "피벗을 기준으로 배열을 분할하고 재귀적으로 정렬하는 분할 정복 알고리즘"}
  ]

  return (
    <div className="bg-gray-100 p-4 min-h-full">
      <h2 className="text-2xl font-bold mb-8">[알고리즘 목록]</h2>
      <ul>
        {
          data1.map((item, idx) =>
            <li key={idx} className="bg-white p-4 mb-6 shadow-md rounded-xl">
              <div className="mb-2">
                <h3 className="font-bold text-xl mb-4">{item.title}</h3>
                <p>{item.content}</p>
              </div>
            </li>
          )
        }
      </ul>
    </div>
  )
}

export default MainSection1;
