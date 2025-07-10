import { useTranslation } from 'react-i18next';
import { Handles } from '../functions/Handles';

export const Ask = ({ dataGame, input, setInput, mapData, cityData }) => {

    const { t } = useTranslation();
    const { handleAsk } = Handles({ dataGame, mapData, cityData, input });

    return (
        <>
            {(dataGame.playerData.status === 'npc' || dataGame.playerData.status === 'bonfire') && (
                <div className='player_ask_to_npc'>
                    <input
                        type="text"
                        placeholder={t('ask_player')}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <div className='option_move'>
                        <img
                            src="images/ornaments/option_move.webp"
                            className='separator-game-header'
                            alt="option image"
                        />
                        <button
                            disabled={!input.trim()}
                            onClick={handleAsk}
                        >
                            {t('talk')}
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}