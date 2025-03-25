import React, { useState, useEffect } from "react";
import axios from "axios";
import "./cursos.css";
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import ModalCursos from "../modalCursos/modalCursos";

export default function Cursos() {
  const [dados, setDados] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [cursoSelecionado, setcursoSelecionado] = useState(null);
  const [busca, setBusca] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/cursos", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDados(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [token]);

  const atualizar = async (cursosAtualizados) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/cursos/${cursosAtualizados.id}`,
        {
          codigo : cursosAtualizados.codigo,
          curso : cursosAtualizados.curso,
          tipo : cursosAtualizados.tipo,
          ha : cursosAtualizados.ha,
          sigla : cursosAtualizados.sigla
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDados(
        dados.map((cursos) =>
          cursos.id === cursosAtualizados.id
            ? cursosAtualizados
            : cursos
        )
      );
      setModalOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar cursos:", error);
    }
  };

  const apagar = async (id) => {
    if (window.confirm("Tem certeza que deseja apagar?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/cursos/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDados(dados.filter((cursos) => cursos.id !== id));
      } catch (error) {
        console.error("Erro ao apagar cursos:", error);
      }
    }
  };

  const criar = async (novoCurso) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/cursos",
        {
            codigo : novoCurso.codigo,
            curso : novoCurso.curso,
            tipo : novoCurso.tipo,
            ha : novoCurso.ha,
            sigla : novoCurso.sigla
        },
        {
          headers: { Authorization: `Bearer ${token}` }, 
        }
      );
      setDados([...dados, response.data]);
      setModalOpen(false);
    } catch (error) {
      console.error("Erro ao criar cursos:", error);
    }
  };

  const cursosFiltradas = dados.filter((cursos) =>
    cursos.curso.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="cursos-container">
      <h1>Gestão de cursos</h1>
        <button
          className="btn-adicionar"
          onClick={() => {
            setModalOpen(true);
            setcursoSelecionado(null);
          }}
        >
          <FaPlus />
        </button>
        <input
          type="text"
          placeholder="Buscar cursos"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <FaSearch />
      <div className="cursos-list">
        <div className="table-header">
            <div className="col-header">Código</div>
            <div className="col-header">Curso</div>
            <div className="col-header">Tipo</div>
            <div className="col-header">Hora/Aula</div>
            <div className="col-header">Sigla</div>
            <div className="col-header">Editar</div>
            <div className="col-header">Apagar</div>
          </div>
        {cursosFiltradas.length ? (
          cursosFiltradas.map((cursos) => (
            <div className="cursos-item" key={cursos.id}>
                <span>{cursos.codigo}</span>
                <span>{cursos.curso}</span>
                <span>{cursos.tipo}</span>
                <span>{cursos.ha}</span>
                <span>{cursos.sigla}</span>
              <button
                className="btn edit"
                onClick={() => {
                  setModalOpen(true);
                  setcursoSelecionado(cursos);
                }}
              >
                <FaEdit />
              </button>
              <button
                className="btn delete"
                onClick={() => apagar(cursos.id)}
              >
                <FaTrash />
              </button>
            </div>
          ))
        ) : (
          <p>Nenhuma cursos encontrada.</p>
        )}
      </div>
      {modalOpen && (
        <ModalCursos
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          cursoSelecionado={cursoSelecionado}
          criar={criar}
          atualizar={atualizar}
        />
      )}
    </div>
  );
}
