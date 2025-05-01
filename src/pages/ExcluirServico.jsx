import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Servicos = () => {
  const navigate = useNavigate();

  const [servicos, setServicos] = useState([]);
  const [servicoSelecionado, setServicoSelecionado] = useState(null);

  const ExcluirServico = async (id) => {
    try {
      const res = await fetch("http://localhost:8800/removerServicos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        throw new Error("Erro ao remover serviço");
      }

      alert("Serviço removido com sucesso!");
      setServicos((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Erro:", err);
      alert("Erro ao remover serviço.");
    }
  };

  const excluirTodosServicos = async () => {
    if (!window.confirm("Tem certeza que quer DELETAR TODOS OS SERVIÇOS? Isso não tem volta!")) return;

    try {
      const res = await fetch("http://localhost:8800/removerTodosServicos", {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Erro ao excluir todos os serviços");

      alert("Todos os serviços foram excluídos!");
      setServicos([]);
    } catch (err) {
      console.error(err);
      alert("Erro ao tentar excluir todos os serviços.");
    }
  };

  useEffect(() => {
    const buscarServicos = async () => {
      try {
        const res = await fetch("http://localhost:8800/servicosList");
        const servicosLista = await res.json();

        const servicosFormatados = servicosLista.map((s) => {
          const data = new Date(s.data_hora);
          const dataFormatada = data.toLocaleDateString("pt-BR");
          const horaFormatada = data.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          });

          return {
            id: s.id,
            nome: s.tipo_servico,
            servico: s.tipo_servico,
            preco: s.preco,
            carro: s.modelo,
            placa: s.placa,
            dono: s.cliente,
            funcionario: s.funcionario,
            dataHora: `${dataFormatada} ${horaFormatada}`,
          };
        });

        setServicoSelecionado(null);
        setServicos(servicosFormatados);
      } catch (err) {
        console.error("Erro ao buscar serviços: ", err);
      }
    };

    buscarServicos();
  }, []);

  return (
    <div className="min-h-screen flex flex-col text-[#283D3B] relative">
      {/* Topbar */}
      <div className="fixed top-0 left-0 w-full bg-white border-b shadow-md z-50 flex items-center h-16 px-6">
        <button
          onClick={() => navigate(-1)}
          className="text-[#283D3B] text-xl p-2"
        >
          <ArrowLeft />
        </button>
        <h1 className="text-[#283D3B] text-2xl font-bold ml-3">Excluir Serviços</h1>
      </div>

      {/* Lista de serviços */}
      <div className="pt-24 pr-6 ml-5">
        <h3 className="text-2xl font-semibold mb-2">Serviços cadastrados</h3>

        {servicos.length === 0 ? (
          <p className="text-gray-400">Nenhum serviço cadastrado ainda.</p>
        ) : (
          <>
            <button
              onClick={excluirTodosServicos}
              className="w-50 h-10 bg-[#0B3C49] hover:bg-[#393E46] text-white rounded-xl flex items-center justify-center px-5 mb-5 border-2 border-[#222831] shadow-md transition-all duration-200"
            >
              Excluir Todos
            </button>

            <div className="flex flex-wrap gap-6">
              {servicos.map((s) => (
                <div
                  key={s.id}
                  className="bg-[#283D3B] text-white p-6 rounded-lg shadow-lg w-[300px] h-[350px]"
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
                    <div className="font-medium">Funcionário responsável:</div>
                    <div>{s.funcionario}</div>
                    <div className="font-medium">Data e hora:</div>
                    <div>{s.dataHora}</div>
                    <div className="col-span-2 flex justify-center">
                      <button
                        onClick={() => ExcluirServico(s.id)}
                        className="w-300 h-10 bg-[#C5172E] hover:bg-[#7D0A0A] text-white rounded-md flex items-center justify-center px-5 mt-5"
                      >
                        Excluir Serviço
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Servicos;
