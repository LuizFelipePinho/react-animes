import React, { useState, useEffect } from "react";
import "./App.css";
import "./components/layout/card/Card.css";
// import Card from "./components/layout/card/Card.jsx";
import Cabecalho from "./components/layout/header/Cabecalho";

export default function App() {
  const [animes, setAnimes] = useState([
    {
      id: 1,
      nome: "Tokyo Revengers",
      imagemUrl:
        "https://animesonline.cc/wp-content/uploads/2021/04/e77ZdXs1tFmpTOiFfEZSlcz9ZWN.jpg",
      genero: "Ficção científica",
      link: "https://animesonline.org/animes/tokyo-revengers/",
    },
    {
      id: 2,
      nome: "tensei shitara slime datta ken",
      imagemUrl:
        "https://blogs.opovo.com.br/bancadoanime/wp-content/uploads/sites/59/2019/03/game-740x413.jpg",
      genero: "Isekai",
      link: "https://animesonline.org/animes/tensei-shitara-slime-datta-ken/",
    },
    {
      id: 3,
      nome: "kaifuku jutsushi no yarinaoshi",
      imagemUrl:
        "https://media.fstatic.com/OWKUMNqs2wNbOKSr_2JGbgJ7u6c=/290x478/smart/media/movies/covers/2020/03/Kaifuku-Jutsushi-no-Yarinaoshi-vai-ser-anime-1.jpg",
      genero: "Fantasia sombria",
      link: "https://animesonline.org/animes/kaifuku-jutsushi-no-yarinaoshi/",
    },
  ]);

  const [nomeAnime, setNomeAnime] = useState("");
  const [imagemUrlAnime, setUrlAnime] = useState("");

  const [editando, setEditando] = useState(false);
  const [indiceEditando, setIndiceEditando] = useState(null);

  useEffect(() => {
    if (indiceEditando !== null && editando) {
      setNomeAnime(animes[indiceEditando].nome);
      setUrlAnime(animes[indiceEditando].imagemUrl);
    }
  }, [indiceEditando]);

  const atualizarNomeAnime = (evento) => {
    setNomeAnime(evento.target.value);
    console.log(evento.target.value);
  };

  const atualizarUrlAnime = (evento) => {
    setUrlAnime(evento.target.value);
    console.log(evento.target.value);
  };

  const deletarAnime = (indice) => {
    setAnimes(animes.filter((anime, indiceAnime) => indiceAnime !== indice));
  };

  const verificaExisteAnime = () =>
    animes.some(
      (anime) => anime.nome === nomeAnime && anime.imagemUrl === imagemUrlAnime
    );

  const editaAnime = () => {
    if (verificaExisteAnime()) {
      alert("Já existe um anime cadastrado com essas informações");
    } else {
      const animesAtualizados = animes.map((anime, indice) => {
        if (indiceEditando === indice) {
          anime.nome = nomeAnime;
          anime.imagemUrl = imagemUrlAnime;
        }
        return anime;
      });

      setAnimes(animesAtualizados);
      setEditando(false);
      setIndiceEditando(null);
    }
  };

  const limpaInput = () => {
    setNomeAnime("");
    setUrlAnime("");
  };

  const verificaEAdiciona = () => {
    setAnimes([
      ...animes,
      {
        nome: nomeAnime,
        imagemUrl: imagemUrlAnime,
      },
    ]);
    limpaInput();
  };

  const adicionaAnime = (evento) => {
    evento.preventDefault();

    editando ? editaAnime() : verificaEAdiciona();
  };

  return (
    <>
      <Cabecalho titulo="AnimeBox" />

      <div className="container">
        <h1>Adicione um anime</h1>

        <form onSubmit={adicionaAnime}>
          <input
            type="text"
            placeholder="digite o nome do anime"
            value={nomeAnime}
            onChange={(evento) => {
              atualizarNomeAnime(evento);
            }}
          />
          <br />

          <input
            type="text"
            placeholder="digite a url da capa"
            value={imagemUrlAnime}
            onChange={(evento) => {
              atualizarUrlAnime(evento);
            }}
          />

          <br />
          <button type="submit">Salvar</button>
        </form>
      </div>

      <div className="Container">
        {animes.map((anime, indice) => (
          <>
            <div className="Box" keys={anime.id}>
              <h3>{anime.nome}</h3>
              <img src={anime.imagemUrl} alt={anime.nome} />
              <p>{anime.genero}</p>
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
                }}
              >
                Editar
              </button>
            </div>
          </>
        ))}
      </div>
    </>
  );
}
