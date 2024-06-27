import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ maxWidth: 1728, width: "100%" }}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </div>
      </div>
    </>
  );
}

export default App;
