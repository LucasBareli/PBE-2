import React, { useEffect, useState } from "react";
import "./ModalTurmas.css";

const ModalTurmas = ({
  isOpen,
  onClose,
  turmaSelecionada,
  criar,
  atualizar,
}) => {
  if (!isOpen) return null;

  console.log("Turma Selecionada: ", turmaSelecionada);

  const [id, setId] = useState(turmaSelecionada?.id || "");
  const [codigo, setCodigo] = useState(turmaSelecionada?.codigo || "");
  const [turma, setTurma] = useState(turmaSelecionada?.turma || "");

  useEffect(() => {
    if (turmaSelecionada) {
      setId(turmaSelecionada.id || "");
      setCodigo(turmaSelecionada.codigo || "");
      setTurma(turmaSelecionada.turma || "");
    } else {
      setId("");
      setCodigo("");
      setTurma("");
    }
  }, [turmaSelecionada]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const novaTurma = {id, codigo, turma};
    if (turmaSelecionada) {
      atualizar({ ...turmaSelecionada, ...novaTurma });
    } else {
      criar(novaTurma);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal_container">
        <button className="close_button" onClick={onClose}>X</button>
        <h2>{turmaSelecionada ? "Editar turmas" : "Cadastrar turmas"}</h2>
        <div className="body_modal">
          <div className="caixa1">
            <form onSubmit={handleSubmit}>
              <input
                className="codigo_modal"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                placeholder="codigo"
              />
              <input
                className="turma_modal"
                value={turma}
                onChange={(e) => setTurma(e.target.value)}
                placeholder="turma"
              />
              <button type="submit">
                {turmaSelecionada ? "Atualizar" : "Salvar"}
              </button>
            </form>
          </div>
          <div className="caixa2">
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalTurmas;