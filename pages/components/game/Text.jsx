import { useEffect, useMemo, useState } from "react";
import { ChatComponent } from "./ChatComponent";
import { generarContexto } from "./GenerateContext";

export const Text = ({ dataGame, mapData, cityData, moves, handle }) => {
  const [contexto, setContexto] = useState("");

  useEffect(() => {
    const contextoTemp = generarContexto(dataGame, mapData, cityData);
    setContexto(contextoTemp);

  }, [dataGame, mapData, cityData]);

  return (
    <div className='text-container'>
      <img src="images/ornaments/separator.webp" className='separator-game-header' alt="separator" />
      <ChatComponent
        contexto={contexto}
        dataGame={dataGame}
        mapData={mapData}
        moves={moves}
        cityData={cityData}
        handle={handle}
      />
    </div>
  );
};