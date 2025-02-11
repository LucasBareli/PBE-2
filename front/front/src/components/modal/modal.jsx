import React, {useEffect, useState} from "react";
import './modal.css'

const ModalProfessores = ({
  isOpen,
  onClose,
  professorSelecionado,
  criar,
  atualizar
})=>{
  if(!isOpen) return null

  console.log("Prof. Selecionado: ", professorSelecionado)

  const [id, setId] = useState(professorSelecionado?.id || '')
  const [ni, setNi] = useState(professorSelecionado?.ni || '')
  const [nome, setNome] = useState(professorSelecionado?.nome || '')
  const [email, setEmail] = useState(professorSelecionado?.email || '')
  const [cel, setCel] = useState(professorSelecionado?.cel || '')
  const [ocup, setOcup] = useState(professorSelecionado?.ocup || '')

  useEffect(()=>{
    if(professorSelecionado){
      setId(professorSelecionado.id || '')
      setNi(professorSelecionado.ni || '')
      setNome(professorSelecionado.nome || '')
      setEmail(professorSelecionado.email || '')
      setCel(professorSelecionado.cel || '')
      setOcup(professorSelecionado.ocup || '')
    } else{
      setId('')
      setNi('')
      setNome('')
      setCel('')
      setEmail('')
      setOcup('')
    }
  }, [professorSelecionado])

  const handleSubmit = (e)=>{
    e.preventDefault();
    const novoProfessor = {ni, nome, email, cel, ocup}
    if(professorSelecionado){
      atualizar({...professorSelecionado, ...novoProfessor})
    }else{
      criar(novoProfessor)
    }
  }

  return(
    <div className="modal-overlay">
      <div className="modal_container">
        <button className="close_button" onClick={onClose}>X</button>
        <h2>{professorSelecionado ? "Editar": "Cadastrar"}</h2>
        <div className="body_modal">
          <div className="caixa1">
            <form onSubmit={handleSubmit}>
              
              <input
                className="ni_modal"
                value={ni}
                onChange={(e)=>setNi(e.target.value)}
                placeholder="NI"
              />
              <input
                className="nome_modal"
                value={nome}
                onChange={(e)=>setNome(e.target.value)}
                placeholder="NOME"
              />
              <input
                className="email_modal"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="EMAIL"
              />
              <input
                className="cel_modal"
                value={cel}
                onChange={(e)=>setCel(e.target.value)}
                placeholder="CELULAR"
              />
              <input
                className="ocup_modal"
                value={ocup}
                onChange={(e)=>setOcup(e.target.value)}
                placeholder="OCUP"
              />
              <button type="submit">{professorSelecionado ? "Atualizar" : "Salvar"}</button>
            </form>
          </div>
          <div className="caixa2">
            <div className="foto">
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}


export default ModalProfessores