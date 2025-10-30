import { Handles } from "../functions/Handles"

export const Moves = ({ buttons, dataGame, setDataGame, mapData, cityData, setEvent, askLLM, setHandle, handle, setAction, setAnimKey, isDone, setIsDone, setResponse }) => {
    const { handleOptionClick } = Handles({
        dataGame, setDataGame, mapData, cityData, setEvent,
        askLLM, setHandle, handle, setAction, setAnimKey
    });

    return (
        <div className='moves-text-rpg-game'>
            {buttons.map((btn, index) => (
                <div className={!isDone ? 'option_move disabled' : 'option_move'}>
                    <img
                        src="images/ornaments/option_move.webp"
                        className='separator-game-header'
                        alt="option image"
                    />
                    <button
                        key={index}
                        onClick={() => {handleOptionClick(btn); setIsDone(false); setResponse(false)}}
                        disabled={!isDone}
                    >
                        {btn.message}
                    </button>
                </div>
            ))}
        </div>
    )
}