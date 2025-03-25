import React, { useState, useEffect } from "react";
import axios from "axios";
import "./turmas.css";
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import Modalturmas from "../modalTurmas/modalTurmas";

export default function Turmas() {
  const [dados, setDados] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [turmaSelecionada, setturmaSelecionada] = useState(null);
  const [busca, setBusca] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/turmas", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDados(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [token]);

  const atualizar = async (turmasAtualizadas) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/turmas/${turmasAtualizadas.id}`,
        {
          codigo : turmasAtualizadas.codigo,
          turma : turmasAtualizadas.turma,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDados(
        dados.map((turmas) =>
          turmas.id === turmasAtualizadas.id
            ? turmasAtualizadas
            : turmas
        )
      );
      setModalOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar turmas:", error);
    }
  };

  const apagar = async (id) => {
    if (window.confirm("Tem certeza que deseja apagar?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/turmas/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDados(dados.filter((turmas) => turmas.id !== id));
      } catch (error) {
        console.error("Erro ao apagar turmas:", error);
      }
    }
  };

  const criar = async (novaTurma) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/turmas",
        {
            codigo : novaTurma.codigo,
            turma : novaTurma.turma,
        },
        {
          headers: { Authorization: `Bearer ${token}` }, 
        }
      );
      setDados([...dados, response.data]);
      setModalOpen(false);
    } catch (error) {
      console.error("Erro ao criar turmas:", error);
    }
  };

  const turmasFiltradas = dados.filter((turmas) =>
    turmas.turma.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="turmas-container">
      <h1>Gestão de turmas</h1>
        <button
          className="btn-adicionar"
          onClick={() => {
            setModalOpen(true);
            setturmaSelecionada(null);
          }}
        >
          <FaPlus />
        </button>
        <input
          type="text"
          placeholder="Buscar turmas"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <FaSearch />
      <div className="turmas-list">
        <div className="table-header">
            <div className="col-header">Código</div>
            <div className="col-header">Turma</div>
            <div className="col-header">Editar</div>
            <div className="col-header">Apagar</div>
          </div>
        {turmasFiltradas.length ? (
          turmasFiltradas.map((turmas) => (
            <div className="turmas-item" key={turmas.id}>
                <span>{turmas.codigo}</span>
                <span>{turmas.turma}</span>
              <button
                className="btn edit"
                onClick={() => {
                  setModalOpen(true);
                  setturmaSelecionada(turmas);
                }}
              >
                <FaEdit />
              </button>
              <button
                className="btn delete"
                onClick={() => apagar(turmas.id)}
              >
                <FaTrash />
              </button>
            </div>
          ))
        ) : (
          <p>Nenhuma turmas encontrada.</p>
        )}
      </div>
      {modalOpen && (
        <Modalturmas
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          turmaSelecionada={turmaSelecionada}
          criar={criar}
          atualizar={atualizar}
        />
      )}
    </div>
  );
}
