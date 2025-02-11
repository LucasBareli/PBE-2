import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import './home.css';
import ModalProfessores from "../modal/modal";

export default function Home() {
    const [dados, setDados] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [professorSelecionado, setProfessorSelecionado] = useState(null);
    const [busca, setBusca] = useState("");
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) return;

        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/professores", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDados(response.data);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };

        fetchData();
    }, [token]);

    const atualizar = async (professorAtualizado) => {
        try {
            await axios.put(`http://127.0.0.1:8000/api/id/${professorAtualizado.id}`,
                {
                    ni: professorAtualizado.ni,
                    nome: professorAtualizado.nome,
                    email: professorAtualizado.email,
                    cel: professorAtualizado.cel,
                    ocup: professorAtualizado.ocup,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setDados(dados.map((professor) => professor.id === professorAtualizado.id ? professorAtualizado : professor));
            setModalOpen(false);
        } catch (error) {
            console.error("Erro ao atualizar professor:", error);
        }
    };

    const apagar = async (id) => {
        if (window.confirm("Tem certeza que deseja apagar?")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/id/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDados(dados.filter((professor) => professor.id !== id));
            } catch (error) {
                console.error("Erro ao apagar professor:", error);
            }
        }
    };

    const criar = async (novoProfessor) => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/professores",
                {
                    ni: novoProfessor.ni,
                    nome: novoProfessor.nome,
                    email: novoProfessor.email,
                    cel: novoProfessor.cel,
                    ocup: novoProfessor.ocup,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setDados([...dados, response.data]);
            setModalOpen(false);
        } catch (error) {
            console.error("Erro ao criar professor:", error);
        }
    };

    const professoresFiltrados = dados.filter((professor) =>
        professor.nome.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <main className="main">
            <div className="container-home">
                <h1>Gerenciamento de Professores</h1>
                <div className="btn1">
                        <FaPlus className="adicionar" onClick={() => { setModalOpen(true); setProfessorSelecionado(null); }} />
                    </div>
                    <div className="btn2">
                        <FaSearch className="procurar" />
                <div className="footer">
                        <input
                            type="text"
                            placeholder="Buscar professor"
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                        />
                    </div>
                </div>
                <section className="section-home">
                    <div className="table">
                        {professoresFiltrados.length ? professoresFiltrados.map((professor) => (
                            <div key={professor.id} className="lista">
                                <div className="col1">
                                    <FaEdit className="edit" onClick={() => { setModalOpen(true); setProfessorSelecionado(professor); }} />
                                </div>
                                <div className="col2">
                                    <FaTrash className="delete" onClick={() => apagar(professor.id)} />
                                </div>
                                <div className="col3">
                                    <span className="id">{professor.id}</span>
                                </div>
                                <div className="col4">
                                    <span className="ni">{professor.ni}</span>
                                </div>
                                <div className="col5">
                                    <span className="nome">{professor.nome}</span>
                                </div>
                                <div className="col6">
                                    <span className="email">{professor.email}</span>
                                </div>
                                <div className="col7">
                                    <span className="cel">{professor.cel}</span>
                                </div>
                                <div className="col8">
                                    <span className="ocup">{professor.ocup}</span>
                                </div>
                            </div>
                        )) : <p>Nenhum professor encontrado.</p>}
                    </div>
                </section>
                <ModalProfessores
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    professorSelecionado={professorSelecionado}
                    setProfessorSelecionado={setProfessorSelecionado}
                    criar={criar}
                    atualizar={atualizar}
                />
            </div>
        </main>
    );
}