import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import TemplatePage from "./template/Template"; // Create this component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/template/:id" element={<TemplatePage />} />
      </Routes>
    </Router>
  );
}

export default App;
