import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Servicos from "./pages/Servicos";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-4">
      <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Servicos" element={<Servicos />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
