import React from 'react';
import './Cabecalho.css';
import logo from "./logo-blue.gif"


export default (props) =>  
    <header className="header">
      
      <img src={logo} className="logo"></img>

      <h1>{props.titulo}</h1>

      <ul className="opcoes">
        <li>Home</li>
        <li>Inserir</li>
      </ul>

    </header>

