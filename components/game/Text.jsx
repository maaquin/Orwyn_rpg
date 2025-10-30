import { ChatComponent } from "./ChatComponent";

export const Text = ({ dataGame, setDataGame, mapData, cityData, moves, handle, items, isMobile }) => {

  return (
    <div className='text-container'>
      <img src="images/ornaments/separator.webp" className='separator-game-header' alt="separator" />
      <ChatComponent
        dataGame={dataGame}
        setDataGame={setDataGame}
        mapData={mapData}
        moves={moves}
        cityData={cityData}
        handle={handle}
        items={items}
        isMobile={isMobile}
      />
    </div>
  );
};