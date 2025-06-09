import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Modal from "react-modal";

// setAppElement dentro do useEffect pra evitar quebra

const Servicos = () => {
  const navigate = useNavigate();

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);
  

  const [servicos, setServicos] = useState([]);
  const [servicoSelecionado, setServicoSelecionado] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  const ExcluirServico = async (id) => {
    try {
      const res = await fetch("http://localhost:8800/excluirServico", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("Erro ao remover serviço");

      alert("Serviço removido com sucesso!");
      setServicos((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Erro:", err);
      alert("Erro ao remover serviço.");
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

  // Inputs controlados para edição
  const handleChange = (e) => {
    const { name, value } = e.target;
    setServicoSelecionado((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSalvarEdicao = () => {
    // Aqui você faria a chamada de API pra salvar no backend
    console.log("Serviço atualizado:", servicoSelecionado);
    alert("Serviço editado (mock)!");
    setIsOpen(false);
  };

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
        <h1 className="text-[#283D3B] text-2xl font-bold ml-3">Editar Serviços</h1>
      </div>

      {/* Lista de serviços */}
      <div className="pt-24 pr-6 ml-5">
        <h3 className="text-2xl font-semibold mb-2">Serviços cadastrados</h3>

        {/* Modal de edição */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setIsOpen(false)}
          className="bg-white p-6 rounded-lg max-w-md mx-auto mt-20 shadow-lg outline-none"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50"
        >
          {servicoSelecionado ? (
            <>
              <h2 className="text-xl font-bold mb-4">Editando: {servicoSelecionado.nome}</h2>
              <div className="flex flex-col gap-4">
                <label>
                  Nome:
                  <input
                    type="text"
                    name="nome"
                    value={servicoSelecionado.nome}
                    onChange={handleChange}
                    className="w-full border p-2 rounded mt-1"
                  />
                </label>
                <label>
                  Preço:
                  <input
                    type="number"
                    name="preco"
                    value={servicoSelecionado.preco}
                    onChange={handleChange}
                    className="w-full border p-2 rounded mt-1"
                  />
                </label>
                <label>
                  Modelo do Carro:
                  <input
                    type="text"
                    name="carro"
                    value={servicoSelecionado.carro}
                    onChange={handleChange}
                    className="w-full border p-2 rounded mt-1"
                  />
                </label>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-400 rounded text-white hover:bg-gray-500"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSalvarEdicao}
                  className="px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-700"
                >
                  Salvar
                </button>
              </div>
            </>
          ) : (
            <p>Carregando...</p>
          )}
        </Modal>

        {servicos.length === 0 ? (
          <p className="text-gray-400">Nenhum serviço cadastrado ainda.</p>
        ) : (
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
                  <div className="font-medium">Funcionário:</div>
                  <div>{s.funcionario}</div>
                  <div className="font-medium">Data:</div>
                  <div>{s.dataHora}</div>
                </div>
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => {
                      setServicoSelecionado(s);
                      setIsOpen(true);
                    }}
                    className="w-[200px] h-10 bg-[#32a8db] hover:bg-[#3793C4] text-white rounded-md flex items-center justify-center mt-5"
                  >
                    Editar Serviço
                  </button>
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
