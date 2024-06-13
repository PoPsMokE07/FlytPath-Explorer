import { Routes, Route } from "react-router-dom";
import Map from "./component/Map";
import { useSelector } from "react-redux";
import { selector } from "./utils/selector";
import Navigation from "./component/Navigation";

function App() {
  const { paths } = useSelector(selector);
  console.log(paths);
  return (
    <div className="App">
      <Routes>
        <Route element={<Navigation />} path="/1" />
        <Route element={<Map />} path="/" />
      </Routes>
    </div>
  );
}

export default App;
