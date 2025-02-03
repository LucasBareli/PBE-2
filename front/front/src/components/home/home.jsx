import React, { useState, useEffect } from "react"
import axios from "axios"

export default function Home() {
    const [dados, setDados] = useState([])
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
    }, []); // Executa quando o token estiver definido

    return (
        <div>
            <h1>HOME</h1>
            <ul>
                {dados.map((professor, index) => (
                    <li key={index}>{professor.nome}</li>
                ))}
            </ul>
        </div>
    );
}