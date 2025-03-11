import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Disciplinas.css';
import ModalDisciplinas from '../modalDisciplinas/modalDisciplinas';

const Disciplinas = () => {
  const [disciplinas, setDisciplinas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentDisciplina, setCurrentDisciplina] = useState(null);

  // Carregar as disciplinas
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/disciplinas')
      .then(response => setDisciplinas(response.data))
      .catch(error => console.error("Erro ao carregar disciplinas", error));
  }, []);

  // Funções de manipulação de dados
  const handleCreate = (disciplina) => {
    axios.post('http://127.0.0.1:8000/api/disciplinas', disciplina)
      .then(response => {
        setDisciplinas([...disciplinas, response.data]);
        setShowModal(false);
      })
      .catch(error => console.error("Erro ao criar disciplina", error));
  };

  const handleUpdate = (id, disciplina) => {
    axios.put(`http://127.0.0.1:8000/api/disciplinas/${id}`, disciplina)
      .then(response => {
        setDisciplinas(disciplinas.map(d => (d.id === id ? response.data : d)));
        setShowModal(false);
      })
      .catch(error => console.error("Erro ao atualizar disciplina", error));
  };

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/disciplinas/${id}`)
      .then(() => {
        setDisciplinas(disciplinas.filter(d => d.id !== id));
      })
      .catch(error => console.error("Erro ao excluir disciplina", error));
  };

  const openModal = (disciplina = null) => {
    setCurrentDisciplina(disciplina);
    setShowModal(true);
  };

  return (
    <div className="disciplinas-container">
      <h1>Gestão de Disciplinas</h1>
      <button className="btn" onClick={() => openModal()}>Adicionar Disciplina</button>
      <div className="disciplinas-list">
        {disciplinas.map(disciplina => (
          <div className="disciplina-item" key={disciplina.id}>
            <span>{disciplina.nome}</span>
            <button className="btn edit" onClick={() => openModal(disciplina)}>Editar</button>
            <button className="btn delete" onClick={() => handleDelete(disciplina.id)}>Excluir</button>
          </div>
        ))}
      </div>
      {showModal && (
        <ModalDisciplinas
          disciplina={currentDisciplina}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default Disciplinas;
