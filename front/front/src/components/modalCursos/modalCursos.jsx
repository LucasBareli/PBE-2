import React, { useEffect, useState } from "react";
import "./modalCursos.css";

const ModalCursos = ({
  isOpen,
  onClose,
  cursoSelecionado,
  criar,
  atualizar,
}) => {
  if (!isOpen) return null;

  console.log("Curso Selecionado: ", cursoSelecionado);

  const [id, setId] = useState(cursoSelecionado?.id || "");
  const [codigo, setCodigo] = useState(cursoSelecionado?.codigo || "");
  const [curso, setCurso] = useState(cursoSelecionado?.curso || "");
  const [tipo, setTipo] = useState(cursoSelecionado?.tipo || "");
  const [ha, setHa] = useState(cursoSelecionado?.ha || "");
  const [sigla, setSigla] = useState(
    cursoSelecionado?.codigo || ""
  );

  useEffect(() => {
    if (cursoSelecionado) {
      setId(cursoSelecionado.id || "");
      setCodigo(cursoSelecionado.codigo || "");
      setCurso(cursoSelecionado.curso || "");
      setTipo(cursoSelecionado.tipo || "");
      setHa(cursoSelecionado.ha || "");
      setSigla(cursoSelecionado.sigla || "");
    } else {
      setId("");
      setCodigo("");
      setCurso("");
      setTipo("");
      setHa("");
      setSigla("");
    }
  }, [cursoSelecionado]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const novoscursos = {codigo, curso, tipo, ha, sigla };
    if (cursoSelecionado) {
      atualizar({ ...cursoSelecionado, ...novoscursos });
    } else {
      criar(novoscursos);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal_container">
        <button className="close_button" onClick={onClose}>X</button>
        <h2>{cursoSelecionado ? "Editar cursos" : "Cadastrar cursos"}</h2>
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
                className="curso_modal"
                value={curso}
                onChange={(e) => setCurso(e.target.value)}
                placeholder="curso"
              />
              <input
                className="tipo_modal"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                placeholder="Tipo"
              />
              <input
                className="ha_modal"
                value={ha}
                onChange={(e) => setHa(e.target.value)}
                placeholder="Horas/Aula"
              />
              <input
                className="sigla_modal"
                value={sigla}
                onChange={(e) => setSigla(e.target.value)}
                placeholder="Sigla"
              />
              <button type="submit">
                {cursoSelecionado ? "Atualizar" : "Salvar"}
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

export default ModalCursos;