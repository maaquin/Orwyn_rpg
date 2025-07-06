import { ChatComponent } from "./ChatComponent";

export const Text = ({ dataGame, mapData, cityData, moves, handle, items }) => {

  return (
    <div className='text-container'>
      <img src="images/ornaments/separator.webp" className='separator-game-header' alt="separator" />
      <ChatComponent
        dataGame={dataGame}
        mapData={mapData}
        moves={moves}
        cityData={cityData}
        handle={handle}
        items={items}
      />
    </div>
  );
};