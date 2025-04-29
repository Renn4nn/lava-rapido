import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Servicos = () => {
  const navigate = useNavigate();

  const [servicos, setServicos] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [carro, setCarro] = useState("");
  const [placa, setPlaca] = useState("");
  const [dono, setDono] = useState("");

  const adicionarServico = () => {
    if (
      nome.trim() === "" ||
      preco.trim() === "" ||
      carro.trim() === "" ||
      placa.trim() === "" ||
      dono.trim() === ""
    )
      return;

    const novoServico = {
      id: Date.now(),
      nome,
      preco,
      carro,
      placa,
      dono,
    };

    setServicos([...servicos, novoServico]);
    setNome("");
    setPreco("");
    setCarro("");
    setPlaca("");
    setDono("");
  };

  return (
    <div className="min-h-screen flex flex-col text-[#283D3B]">
      {/* Topbar */}
      <div className="fixed top-0 left-0 w-full bg-white border-b shadow-md z-50 flex items-center h-16 px-6">
        <button onClick={() => navigate(-1)} className="text-[#283D3B] text-xl p-2">
          <ArrowLeft />
        </button>
        <h1 className="text-[#283D3B] text-2xl font-bold ml-3">Serviços</h1>
      </div>

      {/* Cadastro */}
      <div className="fixed top-20 left-6 bg-[#67B99A] p-6 rounded-lg shadow-2xl w-96">
        <h2 className="text-white font-bold text-xl mb-4">Cadastrar Serviço</h2>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Nome do serviço"
            className="w-full p-3 rounded bg-white text-black text-sm"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="text"
            placeholder="Preço (R$)"
            className="w-full p-3 rounded bg-white text-black text-sm"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
          />
          <input
            type="text"
            placeholder="Carro"
            className="w-full p-3 rounded bg-white text-black text-sm"
            value={carro}
            onChange={(e) => setCarro(e.target.value)}
          />
          <input
            type="text"
            placeholder="Placa"
            className="w-full p-3 rounded bg-white text-black text-sm"
            value={placa}
            onChange={(e) => setPlaca(e.target.value)}
          />
          <input
            type="text"
            placeholder="Nome do dono"
            className="w-full p-3 rounded bg-white text-black text-sm"
            value={dono}
            onChange={(e) => setDono(e.target.value)}
          />
          <button
            onClick={adicionarServico}
            className="w-full bg-[#283D3B] hover:bg-[#1f2f2d] text-white p-3 mt-2 rounded-md font-semibold"
          >
            Adicionar
          </button>
        </div>
      </div>

   {/* Lista de serviços (quebra automática de linha) */}
<div className="pt-24 pl-[26rem] pr-6">
  <h3 className="text-2xl font-semibold mb-6">Serviços cadastrados</h3>
  {servicos.length === 0 ? (
    <p className="text-gray-400">Nenhum serviço cadastrado ainda.</p>
  ) : (
    <div className="flex flex-wrap gap-6">
      {servicos.map((s) => (
        <div
          key={s.id}
          className="bg-[#283D3B] text-white p-6 rounded-lg shadow-lg w-[280px]"
        >
          <h4 className="text-xl font-bold mb-2">{s.nome}</h4>
          <div className="grid grid-cols-2 gap-y-2 text-sm">
            <div className="font-medium">Preço:</div>
            <div>R$ {s.preco}</div>
            <div className="font-medium">Carro:</div>
            <div>{s.carro}</div>
            <div className="font-medium">Placa:</div>
            <div>{s.placa}</div>
            <div className="font-medium">Dono:</div>
            <div>{s.dono}</div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

    </div>
  );
};

export default Servicos;
