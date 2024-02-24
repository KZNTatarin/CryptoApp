import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Layouts from "./components/Layouts";

function App() {
  return (
    <>
      <BrowserRouter>
        <Layouts />
      </BrowserRouter>
    </>
  );
}

export default App;
