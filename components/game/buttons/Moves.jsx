import { Handles } from "../functions/Handles"

export const Moves = ({ response, visibleTexto, buttons, dataGame, mapData, cityData, setEvent, askLLM, setHandle, handle, setAction, setAnimKey }) => {
    const { handleOptionClick } = Handles({
        dataGame, mapData, cityData, setEvent,
        askLLM, setHandle, handle, setAction, setAnimKey
    });

    return (
        <div className={response.length == visibleTexto.length ? 'moves-text-rpg-game' : 'moves-text-rpg-game ocult'}>
            {buttons.map((btn, index) => (
                <div className='option_move'>
                    <img
                        src="images/ornaments/option_move.webp"
                        className='separator-game-header'
                        alt="option image"
                    />
                    <button
                        key={index}
                        onClick={() => handleOptionClick(btn)}
                    >
                        {btn.message}
                    </button>
                </div>
            ))}
        </div>
    )
}