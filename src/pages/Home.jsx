import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, Calendar, CircleUser, Database, AlignJustify } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="relative">
        <div className="fixed top-0 left-0 w-full bg-[#ffffff] border-b shadow-md z-50 flex justify-between items-center h-16 px-4">
          <div className="text-[#283D3B] text-2xl font-bold">WashCar</div>
          <button onClick={toggleMenu} className="text-[#283D3B] text-2xl p-2">
            <Menu />
          </button>
        </div>

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
              <Link to="/servicos" className="flex flex-col items-center">
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
    </div>
  );
};

export default Home;
