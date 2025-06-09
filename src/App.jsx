import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Servicos from "./pages/Servicos";
import Perfil from "./pages/Perfil";
import AdmUsuario from "./pages/AdmUsuarios";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ExcluirServico from "./pages/ExcluirServico";
import EditarServico from "./pages/EditarServico"

function App() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-4">
      <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/admUsuarios" element={<AdmUsuario />} />
        <Route path="/excluirServicos" element={<ExcluirServico />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/editarServico" element={<EditarServico />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
