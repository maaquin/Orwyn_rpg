import { Sidebar } from './Sidebar';
import { Text } from './Text';
import { useEffect, useState, useRef } from 'react';
import { getValdoren, getDrakmir, getMyrrwood, getNymbria, getSylvareth, mapaData, acciones } from '../../../utils/data';

const cities = {
  valdoren: getValdoren,
  drakmir: getDrakmir,
  myrrwood: getMyrrwood,
  nymbria: getNymbria,
  sylvareth: getSylvareth
}

export const Game = () => {
  const [dataGame, setDataGame] = useState(null);
  const [mapData, setMapData] = useState(null);
  const [cityData, setCityData] = useState(null);
  const [showFadeOnLoad, setShowFadeOnLoad] = useState(true);
  const [settings, setSettings] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const data = localStorage.getItem("partida");
    if (data) {
      const parsed = JSON.parse(data);
      setDataGame(parsed);
      fetchMapAndCity(parsed.location);
    }
  }, []);

  useEffect(() => {
    const settings2 = localStorage.getItem('settings');
    setSettings(JSON.parse(settings2))
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowFadeOnLoad(false), 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7
    }
  }, [settings])

  function getMoves(categoria, estructuras) {
    const accionesCategoria = acciones[categoria];

    if (!accionesCategoria) {
      throw new Error(`Categoría "${categoria}" no encontrada.`);
    }

    const resultado = {};

    for (const [clave, entrada] of Object.entries(accionesCategoria)) {
      if (typeof entrada === "function") {
        const frases = entrada(estructuras);
        resultado[clave] = frases;
      } else if (Array.isArray(entrada)) {
        resultado[clave] = entrada[Math.floor(Math.random() * entrada.length)];
      } else {
        console.warn(`Entrada inesperada en acciones["${categoria}"]["${clave}"]`);
      }
    }

    return resultado;
  }

  const fetchMapAndCity = ([x, y]) => {
    const positions = {
      actual: [x, y],
      norte: [x, y - 1],
      sur: [x, y + 1],
      oeste: [x - 1, y],
      este: [x + 1, y],
    };

    const coordStrings = Object.fromEntries(
      Object.entries(positions).map(([key, [cx, cy]]) => [key, `${cx},${cy}`])
    );

    const nearbyData = mapaData.filter(tile => Object.values(coordStrings).includes(tile.coordinate));

    const mapaConPosiciones = {};
    for (const [pos, coordStr] of Object.entries(coordStrings)) {
      const tile = nearbyData.find(t => t.coordinate === coordStr);
      if (tile) {
        mapaConPosiciones[pos] = tile;
      }
    }

    setMapData({ map: mapaConPosiciones, city: mapaConPosiciones.actual?.city, structures: mapaConPosiciones.actual?.structure || null });

    if (mapaConPosiciones.actual?.city) {
      const ciudadInfo = cities[mapaConPosiciones.actual?.city.toLowerCase()]
      setCityData(ciudadInfo || null);
    } else {
      setCityData(null);
    }
  };

  return (
    <div className='game-container'>

      {settings && (
        <video autoPlay loop muted className="background-video" ref={videoRef} src={`/videos/${settings.theme}.mp4`}></video>
      )}
      {showFadeOnLoad && (
        <div className="overlay-fade-onload" />
      )}

      <Sidebar />
      <div className='game'>
        <Text
          dataGame={dataGame}
          mapData={mapData}
          cityData={cityData}
          moves={getMoves}
        />
      </div>
    </div>
  );
};