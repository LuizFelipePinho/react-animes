import { READ } from 'eslint-utils';
import React from 'react';
import './Card.css'



export default (props) => 
    <>
        <div className="Box" keys={props.id}>
            <h3>{props.titulo}</h3>
            <img src={props.imagemUrl} alt={props.titulo}/>
            <p>{props.genero}</p>
            <button onClick={ () =>  window.location.href = props.link} >Assistir</button>
        </div>
    </>

