import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Reset from "./Reset/Reset";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define your routes */}
        <Route path="/" element={<Home />} />
        <Route path="/reset" element={<Reset />} />
      </Routes>
    </Router>
  );
};

export default App;
