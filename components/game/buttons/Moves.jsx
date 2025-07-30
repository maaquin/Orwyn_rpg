import { Handles } from "../functions/Handles"

export const Moves = ({ buttons, dataGame, mapData, cityData, setEvent, askLLM, setHandle, handle, setAction, setAnimKey, disabled }) => {
    const { handleOptionClick } = Handles({
        dataGame, mapData, cityData, setEvent,
        askLLM, setHandle, handle, setAction, setAnimKey
    });

    return (
        <div className='moves-text-rpg-game'>
            {buttons.map((btn, index) => (
                <div className={disabled ? 'option_move disabled' : 'option_move'}>
                    <img
                        src="images/ornaments/option_move.webp"
                        className='separator-game-header'
                        alt="option image"
                    />
                    <button
                        key={index}
                        onClick={() => handleOptionClick(btn)}
                        disabled={disabled}
                    >
                        {btn.message}
                    </button>
                </div>
            ))}
        </div>
    )
}