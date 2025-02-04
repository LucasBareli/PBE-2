import React, { useState, useEffect } from "react"
import axios from "axios"
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import './home.css'
import ModalProfessores from "../modal/modal"

export default function Home() {
    const [dados, setDados] = useState([])
    const [modalOpen, setModalOpen] = useState(false);
    const token = localStorage.getItem('token')
    console.log("TokenHome:", token)

    useEffect(() => {

        if (!token) return;

        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/professores", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setDados(response.data);
                console.log("Response Data:", response.data);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };

        fetchData();
    }, []);

    const editar = (id) => {

    }

    const apagar = async (id) => {
        if(window.confirm("Tem certeza? ")){
            try {
                await axios.delete(`http://127.0.0.1:8000/api/id/${id}`,{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                setDados(dados.filter(professor => professor.id !== id))
            } 
            
            catch (error) {
                console.error(error)
            }
        }


    }

    const ModalProfessores = ({ isOpen, onClose }) => {
        if (!isOpen) return null;
      
        return (
          <div className="modal-overlay">
            <div className="modal-container">
              <button className="close-button" onClick={onClose}>×</button>
              <h2>Cadastro de Professor</h2>
              <form>
                <input type="text" placeholder="NI" />
                <input type="text" placeholder="Nome" />
                <input type="email" placeholder="Email" />
                <input type="tel" placeholder="Celular" />
                <input type="text" placeholder="Ocupação" />
                <button type="submit">Salvar</button>
              </form>
            </div>
          </div>
        );
      };


    return (
        <div className="container_home">
            <div className="body">
                <h2>Lista de Professores</h2>
                {dados.map((professor) => (
                    <div key={professor.id} className="lista">
                        <FaEdit className="edit" onClick={() => editar(professor.id)} />
                        <FaTrash className="delete" onClick={() => apagar(professor.id)} />
                        <span className="id">{professor.id}</span>
                        <span className="ni">{professor.ni}</span>
                        <span className="nome">{professor.nome}</span>
                    </div>
                ))}
            </div>
            <div className="footer">
                <FaPlus className="adicionar" onClick={()=>setModalOpen(true)}/>
                <FaSearch className="procurar" />
            </div>
            <ModalProfessores isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </div>
    );
}