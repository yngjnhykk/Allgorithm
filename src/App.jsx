import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import Header from "./components/Header";

function App() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ width: "100%" }}>
          <BrowserRouter>
            <Header />
            <Router />
          </BrowserRouter>
        </div>
      </div>
    </>
  );
}

export default App;
