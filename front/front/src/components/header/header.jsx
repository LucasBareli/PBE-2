import React from "react";
import './header.css';

export default function Header() {
    return (
        <header className="container_header">
            <div className="content">
                <div className="title">
                    <h2>Professores</h2>
                </div>
                <nav className="nav">
                    <span>Create</span>
                    <span>Read</span>
                    <span>Update</span>
                    <span>Delete</span>
                </nav>
            </div>
        </header>
    );
}