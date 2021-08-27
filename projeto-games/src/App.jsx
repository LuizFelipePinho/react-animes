import React, { useState } from "react";
import "./App.css";
import "./components/layout/card/Card.css"
import Card from './components/layout/card/Card.jsx'
import Cabecalho from "./components/layout/header/Cabecalho";

export default function App() {
  const [animes, setFilmes] = useState([
    {
      id: 1,
      nome: "Tokyo Revengers",
      imagemUrl:
        "https://animesonline.cc/wp-content/uploads/2021/04/e77ZdXs1tFmpTOiFfEZSlcz9ZWN.jpg",
      genero: "Ficção científica",
      link: "https://animesonline.org/animes/tokyo-revengers/"
    },
    {
      id: 2,
      nome: "tensei shitara slime datta ken",
      imagemUrl:
        "https://blogs.opovo.com.br/bancadoanime/wp-content/uploads/sites/59/2019/03/game-740x413.jpg",
      genero: "Isekai",
      link: "https://animesonline.org/animes/tensei-shitara-slime-datta-ken/"
    },
    {
      id: 3,
      nome: "kaifuku jutsushi no yarinaoshi",
      imagemUrl:
        "https://media.fstatic.com/OWKUMNqs2wNbOKSr_2JGbgJ7u6c=/290x478/smart/media/movies/covers/2020/03/Kaifuku-Jutsushi-no-Yarinaoshi-vai-ser-anime-1.jpg",
      genero: "Fantasia sombria",
      link: "https://animesonline.org/animes/kaifuku-jutsushi-no-yarinaoshi/"
    },
    
  ]);

  return (
  
    <>
      <Cabecalho titulo="AnimeBox"/>
      
      <div className="Container">
      
          {animes.map((f) => (
            <Card id={f.id}
            titulo={f.nome}
            imagemUrl={f.imagemUrl}
            genero={f.genero}
            link={f.link} />

          ))}
      </div>
    </>
  );
}
