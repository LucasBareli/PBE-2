import React, { useState, useEffect } from 'react';
import './ModalDisciplinas.css';

const ModalDisciplinas = ({ disciplina, onCreate, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({ nome: '' });

  useEffect(() => {
    if (disciplina) {
      setFormData({ nome: disciplina.nome });
    }
  }, [disciplina]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (disciplina) {
      onUpdate(disciplina.id, formData);
    } else {
      onCreate(formData);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>{disciplina ? 'Editar' : 'Adicionar'} Disciplina</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nome da Disciplina:</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>
          <button className="btn">Salvar</button>
        </form>
      </div>
    </div>
  );
}

const CloseButton = ({ onClick }) => (
  <span className="close" onClick={onClick}>&times;</span>
);

export default ModalDisciplinas;
