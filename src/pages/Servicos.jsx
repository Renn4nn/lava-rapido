import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Servicos = () => {
  const navigate = useNavigate();

  const [servicos, setServicos] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");

  const adicionarServico = () => {
    if (nome.trim() === "" || preco.trim() === "") return;

    const novoServico = {
      id: Date.now(),
      nome,
      preco,
    };

    setServicos([...servicos, novoServico]);
    setNome("");
    setPreco("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFFFC] text-[#283D3B]">
      <div className="fixed top-0 left-0 w-full bg-[#ffffff] border-b shadow-md z-50 flex items-center h-16 px-4">
        <button onClick={() => navigate(-1)} className="text-[#283D3B] text-xl p-2">
          <ArrowLeft />
        </button>
        <h1 className="text-[#283D3B] text-xl font-bold ml-2">Serviços</h1>
      </div>

      {/* Mini Cadastro no canto esquerdo */}
      <div className="fixed top-20 left-4 bg-[#67B99A] p-4 rounded-lg shadow-lg w-64">
        <h2 className="text-[#FDFFFC] font-bold text-lg mb-2">Cadastrar Serviço</h2>
        <input
          type="text"
          placeholder="Nome do serviço"
          className="w-full p-2 mb-2 rounded bg-[#ffffff] text-black"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="text"
          placeholder="Preço (R$)"
          className="w-full p-2 mb-4 rounded bg-[#ffffff] text-black"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />
        <button
          onClick={adicionarServico}
          className="w-full bg-[#283D3B] text-[#FDFFFC] p-2 rounded-md"
        >
          Adicionar
        </button>
      </div>

      {/* Lista de serviços cadastrados */}
      <div className="pt-20 px-6 mt-6 ml-72">
        <h3 className="text-xl font-semibold mb-4">Serviços cadastrados:</h3>
        {servicos.length === 0 ? (
          <p className="text-gray-400">Nenhum serviço cadastrado ainda.</p>
        ) : (
          <div className="space-y-4">
            {servicos.map((s) => (
              <div
                key={s.id}
                className="bg-[#283D3B] p-4 rounded-md shadow-md"
              >
                <table className="w-full">
                  <tbody>
                    <tr>
                      <td className="text-white font-medium">Nome:</td>
                      <td className="text-white">{s.nome}</td>
                    </tr>
                    <tr>
                      <td className="text-white font-medium">Preço:</td>
                      <td className="text-white">R$ {s.preco}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Servicos;
