import Navbar from "./MyComponents/Navbar";
import HomePage from "./MyComponents/HomePage";
import CreatePage from "./MyComponents/CreatePage";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </>
  );
}

export default App;
