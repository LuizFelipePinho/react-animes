import React, { useState, useEffect } from "react";
import "./App.css";
import Cabecalho from "./components/layout/header/Cabecalho";

export default function App() {
  const [animes, setAnimes] = useState([
    {
      id: 1,
      nome: "Tokyo Revengers",
      imagemUrl:
        "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/e77ZdXs1tFmpTOiFfEZSlcz9ZWN.jpg",
      genero: "Ficção científica",
      link: "https://animesonline.org/animes/tokyo-revengers/",
    },
    {
      id: 2,
      nome: "tensei shitara slime datta ken",
      imagemUrl:
        "https://cdn.fstatic.com/media/movies/covers/2019/12/tWJRkoAMGTLLT8q8IIahJWpvb1n_Ov6ZjP6.jpg",
      genero: "Isekai",
      link: "https://animesonline.org/animes/tensei-shitara-slime-datta-ken/",
    },
    {
      id: 3,
      nome: "kaifuku jutsushi no yarinaoshi",
      imagemUrl:
        "https://animesonehd.xyz/wp-content/uploads/2020/12/Kaifuku-Jutsushi-no-Yarinaoshi-online-em-HD.jpg",
      genero: "Fantasia sombria",
      link: "https://animesonline.org/animes/kaifuku-jutsushi-no-yarinaoshi/",
    },
  ]);

  const [nomeAnime, setNomeAnime] = useState("");
  const [generoAnime, setGeneroAnime] = useState("");
  const [imagemUrlAnime, setUrlAnime] = useState("");

  const [editando, setEditando] = useState(false);
  const [indiceEditando, setIndiceEditando] = useState(null);
  const [formularioAtivo, ativaFormulario] = useState(false);

  // ele fica ouvindo se editar foi acionado, se for ele vai devolver para o input o elemento q foi selecionado
  useEffect(() => {

    if (indiceEditando !== null && editando) {
      ligarBotao(false)
      setNomeAnime(animes[indiceEditando].nome);
      setGeneroAnime(animes[indiceEditando].genero)
      setUrlAnime(animes[indiceEditando].imagemUrl);
    }
  }, [indiceEditando]);

  const atualizarNomeAnime = (evento) => {
    setNomeAnime(evento.target.value);
    console.log(evento.target.value);
  };

  const atualizaGeneroAnime = (evento) => {
    setGeneroAnime(evento.target.value);
    console.log(evento.target.value);
  }

  const atualizarUrlAnime = (evento) => {
    setUrlAnime(evento.target.value);
    console.log(evento.target.value);
  };

  const deletarAnime = (indice) => {
    setAnimes(animes.filter((anime, indiceAnime) => indiceAnime !== indice));
  };


  const verificaExisteAnime = () =>
    animes.some(
      (anime) => anime.nome === nomeAnime && anime.genero === generoAnime && anime.imagemUrl === imagemUrlAnime
    );

  const verificaInputVazio = () =>{
    if(!nomeAnime || !generoAnime || !imagemUrlAnime){
      return true
    }
  }

  const editaAnime = () => {
    if (verificaExisteAnime()) {
      alert("Já existe um anime cadastrado com essas informações");
    } else {
      const animesAtualizados = animes.map((anime, indice) => {
        if (indiceEditando === indice) {
          anime.nome = nomeAnime;
          anime.genero = generoAnime;
          anime.imagemUrl = imagemUrlAnime;
        }
        return anime;
      });

      setAnimes(animesAtualizados);

      setEditando(false);
      setIndiceEditando(null);
      limpaInput();
      ativaFormulario(false);
      ligarBotao(true)
    }
  };

  const limpaInput = () => {
    setNomeAnime("");
    setGeneroAnime("")
    setUrlAnime("");
  };

  const Adiciona = () => {

   if (verificaInputVazio()) {
     alert("Insira as informações corretamente")
   } else {
    setAnimes([
      ...animes,
      {
        nome: nomeAnime,
        genero: generoAnime,
        imagemUrl: imagemUrlAnime,
      },
    ]);
    limpaInput();
    ligarBotao(true)
    ativaFormulario(false)


   }

   
  };

  const adicionaAnime = (evento) => {
    evento.preventDefault();

    editando ? editaAnime() : Adiciona();
  };

  const [botaoAdicionaLigado, ligarBotao] = useState(true)



  

  return (
    <>
      <Cabecalho titulo="AnimeBox" />

      <div className="Container">
        {animes.map((anime, indice) => (
          <>
            <div className="Box" keys={anime.id}>
              <h3>{anime.nome}</h3>
              <img src={anime.imagemUrl} alt={anime.nome} />

              <p className="genero">{anime.genero}</p>
              <div className="botoes">
                <a href={anime.link}>
                  <button>Assistir</button>
                </a>
                <button type="button" onClick={() => deletarAnime(indice)}>
                  Excluir
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setEditando(true);
                    setIndiceEditando(indice);
                    ativaFormulario(true)
                  }}
                >
                  Editar
                </button>
              </div>
            </div>

          </>
        ))}
      </div>
      
      <div className="Container " >
       
      { botaoAdicionaLigado ? 
      <button className="adicionaAnime" onClick={ () => { 
        ativaFormulario(true)
        ligarBotao(false)} }>Adicione um novo anime</button>
      : console.log("botao desativado")
    
      } 
      
      




      {
        formularioAtivo ?  
        <div >

        <form onSubmit={adicionaAnime} className="formulario">
          <input
            type="text"
            placeholder="Nome do anime"
            value={nomeAnime}
            onChange={(evento) => {
              atualizarNomeAnime(evento);
            }}
          />

          <input 
            type="text"
            placeholder="Genero"
            value={generoAnime}
            onChange= { (evento) => {
              atualizaGeneroAnime(evento);

            }}
          />

          <input
            type="text"
            placeholder="Url da capa"
            value={imagemUrlAnime}
            onChange={(evento) => {
              atualizarUrlAnime(evento);
            }}
          />

          <br />
          <button type="submit">Salvar</button>
        </form>
      </div> : console.log("clique em editar para abrir o formulário de cadastro de anime")

      }
           
    
       </div>

     
    </>
  );
}
