import React, { useEffect, useState } from "react";
import "./modalDisciplinas.css";

const ModalDisciplinas = ({
  isOpen,
  onClose,
  disciplinaSelecionada,
  criar,
  atualizar,
}) => {
  if (!isOpen) return null;

  console.log("Disciplina Selecionada: ", disciplinaSelecionada);

  const [id, setId] = useState(disciplinaSelecionada?.id || "");
  const [sigla, setSigla] = useState(disciplinaSelecionada?.sigla || "");
  const [disciplina, setDisciplina] = useState(disciplinaSelecionada?.disciplina || "");
  const [curso, setCurso] = useState(disciplinaSelecionada?.curso || "");
  const [semestre, setSemestre] = useState(disciplinaSelecionada?.semestre || "");
  const [cargaHoraria, setCargaHoraria] = useState(
    disciplinaSelecionada?.carga_horaria || ""
  );

  useEffect(() => {
    if (disciplinaSelecionada) {
      setId(disciplinaSelecionada.id || "");
      setSigla(disciplinaSelecionada.sigla || "");
      setDisciplina(disciplinaSelecionada.disciplina || "");
      setCurso(disciplinaSelecionada.curso || "");
      setSemestre(disciplinaSelecionada.semestre || "");
      setCargaHoraria(disciplinaSelecionada.carga_horaria || "");
    } else {
      setId("");
      setSigla("");
      setDisciplina("");
      setCurso("");
      setSemestre("");
      setCargaHoraria("");
    }
  }, [disciplinaSelecionada]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const novaDisciplina = { sigla, disciplina, curso, semestre, carga_horaria: cargaHoraria };
    if (disciplinaSelecionada) {
      atualizar({ ...disciplinaSelecionada, ...novaDisciplina });
    } else {
      criar(novaDisciplina);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal_container">
        <button className="close_button" onClick={onClose}>X</button>
        <h2>{disciplinaSelecionada ? "Editar Disciplina" : "Cadastrar Disciplina"}</h2>
        <div className="body_modal">
          <div className="caixa1">
            <form onSubmit={handleSubmit}>
              <input
                className="sigla_modal"
                value={sigla}
                onChange={(e) => setSigla(e.target.value)}
                placeholder="SIGLA"
              />
              <input
                className="disciplina_modal"
                value={disciplina}
                onChange={(e) => setDisciplina(e.target.value)}
                placeholder="DISCIPLINA"
              />
              <input
                className="curso_modal"
                value={curso}
                onChange={(e) => setCurso(e.target.value)}
                placeholder="CURSO"
              />
              <input
                className="semestre_modal"
                value={semestre}
                onChange={(e) => setSemestre(e.target.value)}
                placeholder="SEMESTRE"
              />
              <input
                className="carga_horaria_modal"
                value={cargaHoraria}
                onChange={(e) => setCargaHoraria(e.target.value)}
                placeholder="CARGA HORÁRIA"
              />
              <button type="submit">
                {disciplinaSelecionada ? "Atualizar" : "Salvar"}
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

export default ModalDisciplinas;