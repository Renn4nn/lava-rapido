import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, AlignJustify, Calendar, Database, CircleUser } from "lucide-react";
import { motion } from "framer-motion";

const Perfil = () => {
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <div className="min-h-screen flex flex-col text-[#283D3B] relative">
      {/* Topbar */}
      <div className="fixed top-0 left-0 w-full bg-white border-b shadow-md z-50 flex items-center h-16 px-6">
        <button
          onClick={() => navigate("/home")}
          className="text-[#283D3B] text-xl p-2"
        >
          <ArrowLeft />
        </button>
        <h1 className="text-[#283D3B] text-2xl font-bold ml-3">Perfil</h1>
        <div className="flex justify-end w-full pr-6 gap-2">
          <button
            className="w-12 h-12 bg-[#27548A] hover:bg-[#1f2f2d] text-white rounded-md flex items-center justify-center"
            onClick={toggleMenu}
          >
            <AlignJustify />
          </button>
        </div>
      </div>

      {/* Menu Animado */}
      {menuAberto && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="fixed top-16 left-0 w-full bg-[#FDFFFC] shadow-xl rounded-b-2xl p-4 z-40"
        >
          <div className="grid grid-cols-4 gap-6 text-center">
            <Link to="/home" className="flex flex-col items-center">
              <AlignJustify className="text-[#283D3B] mb-1" />
              <span className="text-sm text-[#283D3B]">Home</span>
            </Link>
            <Link to="/servicos" className="flex flex-col items-center">
              <Calendar className="text-[#283D3B] mb-1" />
              <span className="text-sm text-[#283D3B]">Agendamentos</span>
            </Link>
            <Link to="/admUsuarios" className="flex flex-col items-center">
              <Database className="text-[#283D3B] mb-1" />
              <span className="text-sm text-[#283D3B]">Adm. Usuarios</span>
            </Link>
            <Link to="/perfil" className="flex flex-col items-center">
              <CircleUser className="text-[#283D3B] mb-1" />
              <span className="text-sm text-[#283D3B]">Perfil</span>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Perfil;
