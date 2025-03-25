import React, { useEffect, useState } from "react";
import "./ModalAmbiente.css";

const ModalAmbiente = ({
  isOpen,
  onClose,
  ambienteSelecionado,
  criar,
  atualizar,
}) => {
  if (!isOpen) return null;

  console.log("Ambiente Selecionado: ", ambienteSelecionado);

  const [id, setId] = useState(ambienteSelecionado?.id || "");
  const [codigo, setCodigo] = useState(ambienteSelecionado?.codigo || "");
  const [ambiente, setAmbiente] = useState(ambienteSelecionado?.ambiente || "");
  const [capacidade, setCapacidade] = useState(ambienteSelecionado?.capacidade || "");
  const [responsavel, setResponsavel] = useState(ambienteSelecionado?.responsavel || "");
  const [periodo, setPeriodo] = useState(ambienteSelecionado?.periodo || "")

  useEffect(() => {
    if (ambienteSelecionado) {
      setId(ambienteSelecionado.id || "");
      setCodigo(ambienteSelecionado.codigo || "");
      setAmbiente(ambienteSelecionado.ambiente || "");
      setCapacidade(ambienteSelecionado.capacidade || "");
      setResponsavel(ambienteSelecionado.responsavel || "");
      setPeriodo(ambienteSelecionado.periodo || "");
    } else {
      setId("");
      setCodigo("");
      setAmbiente("");
      setCapacidade("");
      setResponsavel("");
      setPeriodo("")
    }
  }, [ambienteSelecionado]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const novoAmbiente = {id, codigo, ambiente, capacidade, responsavel, periodo};
    if (ambienteSelecionado) {
      atualizar({ ...ambienteSelecionado, ...novoAmbiente });
    } else {
      criar(novoAmbiente);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal_container">
        <button className="close_button" onClick={onClose}>X</button>
        <h2>{ambienteSelecionado ? "Editar turmas" : "Cadastrar turmas"}</h2>
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
                className="sala_modal"
                value={ambiente}
                onChange={(e) => setAmbiente(e.target.value)}
                placeholder="sala"
              />
              <input
                className="capacidade_modal"
                value={capacidade}
                onChange={(e) => setCapacidade(e.target.value)}
                placeholder="capacidade"
              />
              <input
                className="responsavel_modal"
                value={responsavel}
                onChange={(e) => setResponsavel(e.target.value)}
                placeholder="responsavel"
              />
              <input
                className="periodo_modal"
                value={periodo}
                onChange={(e) => setPeriodo(e.target.value)}
                placeholder="periodo"
              />
              <button type="submit">
                {ambienteSelecionado ? "Atualizar" : "Salvar"}
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

export default ModalAmbiente;