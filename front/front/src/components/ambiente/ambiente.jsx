import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ambiente.css";
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import ModalAmbiente from "../modalAmbiente/modalAmbiente";

export default function Ambiente() {
  const [dados, setDados] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [ambienteSelecionado, setambienteSelecionado] = useState(null);
  const [busca, setBusca] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/ambientes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDados(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [token]);

  const atualizar = async (ambienteSelecionado) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/ambientes/${ambienteSelecionado.id}`,
        {
          codigo : ambienteSelecionado.codigo,
          ambiente : ambienteSelecionado.ambiente,
          capacidade : ambienteSelecionado.capacidade,
          responsavel : ambienteSelecionado.responsavel,
          periodo : ambienteSelecionado.periodo
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDados(
        dados.map((ambiente) =>
          ambiente.id === ambienteSelecionado.id
            ? ambienteSelecionado
            : ambiente
        )
      );
      setModalOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar ambiente:", error);
    }
  };

  const apagar = async (id) => {
    if (window.confirm("Tem certeza que deseja apagar?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/ambientes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDados(dados.filter((ambiente) => ambiente.id !== id));
      } catch (error) {
        console.error("Erro ao apagar ambiente:", error);
      }
    }
  };

  const criar = async (novoAmbiente) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/ambientes",
        {
            codigo : novoAmbiente.codigo,
            ambiente : novoAmbiente.ambiente,
            capacidade : novoAmbiente.capacidade,
            responsavel : novoAmbiente.responsavel,
            periodo : novoAmbiente.periodo
        },
        {
          headers: { Authorization: `Bearer ${token}` }, 
        }
      );
      setDados([...dados, response.data]);
      setModalOpen(false);
    } catch (error) {
      console.error("Erro ao criar ambiente:", error);
    }
  };

  console.log("Dados recebidos:", dados[0])
  
   const ambientesFiltrados = dados.filter((ambientes) =>
     ambientes.ambiente.toLowerCase().includes(busca.toLowerCase())
    
   );
   

  return (
    <div className="ambientes-container">
      <h1>Gestão de ambiente</h1>
        <button
          className="btn-adicionar"
          onClick={() => {
            setModalOpen(true);
            setambienteSelecionado(null);
          }}
        >
          <FaPlus />
        </button>
        <input
          type="text"
          placeholder="Buscar ambiente"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <FaSearch />
      <div className="ambientes-list">
        <div className="table-header">
            <div className="col-header">Código</div>
            <div className="col-header">Sala</div>
            <div className="col-header">Capacidade</div>
            <div className="col-header">Reponsavel</div>
            <div className="col-header">Periodo</div>
            <div className="col-header">Editar</div>
            <div className="col-header">Apagar</div>
          </div>
        {ambientesFiltrados.length ? (
          ambientesFiltrados.map((ambiente) => (
            <div className="ambientes-item" key={ambiente.id}>
                <span>{ambiente.codigo}</span>
                <span>{ambiente.ambiente}</span>
                <span>{ambiente.capacidade}</span>
                <span>{ambiente.responsavel}</span>
                <span>{ambiente.periodo}</span>
              <button
                className="btn edit"
                onClick={() => {
                  setModalOpen(true);
                  setambienteSelecionado(ambiente);
                }}
              >
                <FaEdit />
              </button>
              <button
                className="btn delete"
                onClick={() => apagar(ambiente.id)}
              >
                <FaTrash />
              </button>
            </div>
          ))
        ) : (
          <p>Nenhum ambiente encontrado.</p>
        )}
      </div>
      {modalOpen && (
        <ModalAmbiente
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          ambienteSelecionado={ambienteSelecionado}
          criar={criar}
          atualizar={atualizar}
        />
      )}
    </div>
  );
}
