import MainSection1 from "./MainSection1.jsx";
import MainSection2 from "./MainSection2.jsx";

function MainPage() {
  return (
    <div className="grid grid-cols-12 gap-6 m-8">
      <div className={'col-span-3'}>
        <MainSection1/>
      </div>
      <div className={'col-span-9'}>
        <MainSection2/>
      </div>
    </div>
  )
}

export default MainPage