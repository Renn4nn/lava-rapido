import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Servicos = () => {
  const navigate = useNavigate();

  const handleVoltar = () => {
    navigate(-1); 
  };

  return (
    <div>
    
      <div className="fixed top-0 left-0 w-full bg-[#FDFFFC] border-b shadow-md z-50 flex items-center h-16 px-4">
        <button onClick={handleVoltar} className="text-[#283D3B] text-xl p-2">
          <ArrowLeft />
        </button>
        <h1 className="text-[#283D3B] text-xl font-bold ml-2">Serviços</h1>
      </div>
      <div className="pt-20 px-6">
        <h2 className="text-2xl font-bold mb-4">Escolha um serviço</h2>
      </div>
    </div>
  );
};

export default Servicos;
