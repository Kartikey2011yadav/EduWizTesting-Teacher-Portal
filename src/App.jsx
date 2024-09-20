import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
// import './index.css'
// import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define your routes */}
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
