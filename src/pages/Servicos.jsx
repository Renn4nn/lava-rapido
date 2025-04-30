import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  AlignJustify,
  Calendar,
  Database,
  CircleUser,
} from "lucide-react";
import { motion } from "framer-motion";

const Servicos = () => {
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);
  const toggleMenu = () => setMenuAberto(!menuAberto);

  const [servicos, setServicos] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [carro, setCarro] = useState("");
  const [placa, setPlaca] = useState("");
  const [dono, setDono] = useState("");
  const [funcionario, setFuncionario] = useState("");
  const [dataHora, setDataHora] = useState("");

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

        setServicos(servicosFormatados);
      } catch (err) {
        console.error("Erro ao buscar serviços:", err);
      }
    };

    buscarServicos();
  }, []);

  const adicionarServico = async () => {
    if (
      nome.trim() === "" ||
      preco.trim() === "" ||
      carro.trim() === "" ||
      placa.trim() === "" ||
      dono.trim() === "" ||
      funcionario.trim() === "" ||
      dataHora === ""
    ) {
      alert("Preencha todos os campos antes de continuar.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8800/servicos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tipoServico: nome,
          placa: placa,
          modelo: carro,
          preco: preco,
          cliente: dono,
          funcionario: funcionario,
          dataHora: dataHora,
        }),
      });

      const result = await res.json();

      if (res.status === 201) {
        alert("Serviço registrado com sucesso!");

        const novoServico = {
          id: Date.now(),
          nome,
          preco,
          carro,
          placa,
          dono,
          funcionario,
          dataHora,
        };
        setServicos([...servicos, novoServico]);

        setNome("");
        setPreco("");
        setCarro("");
        setPlaca("");
        setDono("");
        setFuncionario("");
        setDataHora("");
      } else {
        alert(
          "Erro ao registrar serviço: " + (result.error || "Tente novamente.")
        );
      }
    } catch (err) {
      console.log("Erro:", err);
      alert("Erro na requisição.");
    }
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
        <h1 className="text-[#283D3B] text-2xl font-bold ml-3">Serviços</h1>
        <div className="flex justify-end w-full pr-6 gap-2">
          <button
            onClick={toggleMenu}
            className="w-12 h-12 bg-[#27548A] hover:bg-[#1f2f2d] text-white rounded-md flex items-center justify-center"
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
            <Link
              to="/home"
              className="flex flex-col items-center"
              onClick={() => setMenuAberto(false)}
            >
              <AlignJustify className="text-[#283D3B] mb-1" />
              <span className="text-sm text-[#283D3B]">Home</span>
            </Link>
            <Link
              to="/servicos"
              className="flex flex-col items-center"
              onClick={() => setMenuAberto(false)}
            >
              <Calendar className="text-[#283D3B] mb-1" />
              <span className="text-sm text-[#283D3B]">Agendamentos</span>
            </Link>
            <Link
              to="/admUsuarios"
              className="flex flex-col items-center"
              onClick={() => setMenuAberto(false)}
            >
              <Database className="text-[#283D3B] mb-1" />
              <span className="text-sm text-[#283D3B]">Adm. Usuarios</span>
            </Link>
            <Link
              to="/perfil"
              className="flex flex-col items-center"
              onClick={() => setMenuAberto(false)}
            >
              <CircleUser className="text-[#283D3B] mb-1" />
              <span className="text-sm text-[#283D3B]">Perfil</span>
            </Link>
          </div>
        </motion.div>
      )}

      {/* Cadastro */}
      <div className="fixed top-20 left-6 bg-[#67B99A] p-6 rounded-lg shadow-2xl w-96">
        <h2 className="text-white font-bold text-xl mb-4">Cadastrar Serviço</h2>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Tipo do serviço"
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
            placeholder="Nome do dono do carro"
            className="w-full p-3 rounded bg-white text-black text-sm"
            value={dono}
            onChange={(e) => setDono(e.target.value)}
          />
          <input
            type="text"
            placeholder="Funcionário responsável"
            className="w-full p-3 rounded bg-white text-black text-sm"
            value={funcionario}
            onChange={(e) => setFuncionario(e.target.value)}
          />
          <input
            type="datetime-local"
            className="w-full p-3 rounded bg-white text-black text-sm"
            value={dataHora}
            onChange={(e) => setDataHora(e.target.value)}
          />
          <button
            onClick={adicionarServico}
            className="w-full bg-[#283D3B] hover:bg-[#1f2f2d] text-white p-3 mt-2 rounded-md font-semibold"
          >
            Adicionar
          </button>
        </div>
      </div>

      {/* Lista de serviços */}
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
                  <div className="font-medium">Funcionário responsável:</div>
                  <div>{s.funcionario}</div>
                  <div className="font-medium">Data e hora:</div>
                  <div>{s.dataHora}</div>
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
