import React, { useState, useEffect } from "react";
import axios from "axios";
import "./disciplinas.css";
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import ModalDisciplinas from "../modalDisciplinas/modalDisciplinas";

export default function Disciplinas() {
  const [dados, setDados] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState(null);
  const [busca, setBusca] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/disciplinas", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDados(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [token]);

  const atualizar = async (disciplinaAtualizada) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/disciplinas/${disciplinaAtualizada.id}`,
        {
          disciplina: disciplinaAtualizada.disciplina,
          sigla: disciplinaAtualizada.sigla,
          curso: disciplinaAtualizada.curso,
          semestre: disciplinaAtualizada.semestre,
          carga_horaria: disciplinaAtualizada.carga_horaria,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDados(
        dados.map((disciplina) =>
          disciplina.id === disciplinaAtualizada.id
            ? disciplinaAtualizada
            : disciplina
        )
      );
      setModalOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar disciplina:", error);
    }
  };

  const apagar = async (id) => {
    if (window.confirm("Tem certeza que deseja apagar?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/disciplinas/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDados(dados.filter((disciplina) => disciplina.id !== id));
      } catch (error) {
        console.error("Erro ao apagar disciplina:", error);
      }
    }
  };

  const criar = async (novaDisciplina) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/disciplinas",
        {
          disciplina: novaDisciplina.disciplina,
          sigla: novaDisciplina.sigla,
          curso: novaDisciplina.curso,
          semestre: novaDisciplina.semestre,
          carga_horaria: novaDisciplina.carga_horaria,
        },
        {
          headers: { Authorization: `Bearer ${token}` }, 
        }
      );
      setDados([...dados, response.data]);
      setModalOpen(false);
    } catch (error) {
      console.error("Erro ao criar disciplina:", error);
    }
  };

  const disciplinasFiltradas = dados.filter((disciplina) =>
    disciplina.disciplina.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="disciplinas-container">
      <h1>Gestão de Disciplinas</h1>
        <button
          className="btn-adicionar"
          onClick={() => {
            setModalOpen(true);
            setDisciplinaSelecionada(null);
          }}
        >
          <FaPlus />
        </button>
        <input
          type="text"
          placeholder="Buscar disciplina"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <FaSearch />
      <div className="disciplinas-list">
        <div className="table-header">
            <div className="col-header">Matéria</div>
            <div className="col-header">Sigla</div>
            <div className="col-header">Disciplina</div>
            <div className="col-header">Semestre</div>
            <div className="col-header">Carga Horária</div>
            <div className="col-header">Editar</div>
            <div className="col-header">Deletar</div>
          </div>
        {disciplinasFiltradas.length ? (
          disciplinasFiltradas.map((disciplina) => (
            <div className="disciplina-item" key={disciplina.id}>
              <span>{disciplina.disciplina}</span>
              <span>{disciplina.sigla}</span>
              <span>{disciplina.curso}</span>
              <span>{disciplina.semestre}</span>
              <span>{disciplina.carga_horaria}</span>
              <button
                className="btn edit"
                onClick={() => {
                  setModalOpen(true);
                  setDisciplinaSelecionada(disciplina);
                }}
              >
                <FaEdit />
              </button>
              <button
                className="btn delete"
                onClick={() => apagar(disciplina.id)}
              >
                <FaTrash />
              </button>
            </div>
          ))
        ) : (
          <p>Nenhuma disciplina encontrada.</p>
        )}
      </div>
      {modalOpen && (
        <ModalDisciplinas
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          disciplinaSelecionada={disciplinaSelecionada}
          criar={criar}
          atualizar={atualizar}
        />
      )}
    </div>
  );
}
