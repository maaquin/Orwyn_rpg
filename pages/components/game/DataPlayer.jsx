import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { Inventory } from "./Inventory";

export const DataPlayer = ({ dataGame, toggleExpanded, isExpanded }) => {
    const { t } = useTranslation();
    const [player, setPlayer] = useState(null);
    const [inventory, setInventory] = useState(new Array(12).fill(null));

    useEffect(() => {
        if (dataGame) {
            setPlayer(dataGame.playerData);

            const filledInventory = Array.from({ length: 12 }, (_, i) => {
                return dataGame.inventory[i] ?? { name: "empty", id: i };
            });

            setInventory(filledInventory);
        }
    }, [dataGame]);

    if (!player) {
        return null
    }

    const infoRace = () => {
        return `${t('racee')}: ${t(player.race)}`;
    };

    const infoClass = () => {
        return `${t('classs')}: ${t(player.class)}`;
    };

    const infoNature = () => {
        return `${t('nature')}: ${t(player.nature)}`;
    };

    return (
        <div className="inventory">
            {dataGame && player && inventory && (
                <>
                    <div className="player-block">
                        <div className="info-player">
                            <div className="name-image-player">
                                <div className={`player-image ${isExpanded ? 'expanded' : ''}`}>
                                    <div className="player">
                                        <img src={`images/races/fullbody/${player.sex}_${player.race}.webp`} alt="player" />
                                    </div>
                                    <img src="images/backgrounds/player-container.webp" alt="player-container" className="container-player" />
                                </div>
                                <div className={`name-health-bar-player ${isExpanded ? 'expanded' : ''}`}>
                                    <span className="name-player-title">{player.name}</span>

                                    <div className="health-player">
                                        <div className="health-bar">
                                            <div className="hp-fill" style={{ width: `calc(100% * ${player.hp} / ${player.stats.health})` }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`class-race-nature ${isExpanded ? 'expanded' : ''}`}>
                                <div className="class-race-nature-div">
                                    {t('racee')}
                                    <img title={infoRace} src={`images/icons/${player.race}.webp`} alt={player.class} />
                                </div>
                                <div className="class-race-nature-div">
                                    {t('classs')}
                                    <img title={infoClass} src={`images/icons/${player.class}.webp`} alt={player.class} />
                                </div>
                                <div className="class-race-nature-div">
                                    {t('nature')}
                                    <img title={infoNature} src={`images/icons/${player.nature}.webp`} alt={player.class} />
                                </div>
                            </div>
                            <div className={`stats-icons-player ${isExpanded ? 'expanded' : ''}`}>
                                <div className="stat-icon-name" title={t('atk')}>
                                    <img src={'images/icons/attack.webp'} alt='attack' />
                                    : {player.stats.attack}
                                </div>
                                <div className="stat-icon-name" title={t('def')}>
                                    <img src={'images/icons/defense.webp'} alt='defense' />
                                    : {player.stats.defense}
                                </div>
                                <div className="stat-icon-name" title={t('spd')}>
                                    <img src={'images/icons/speed.webp'} alt='speed' />
                                    : {player.stats.speed}
                                </div>
                                <div className="stat-icon-name" title={t('mat')}>
                                    <img src={'images/icons/magic_attack.webp'} alt='magic attack' />
                                    : {player.stats.magic_attack}
                                </div>
                                <div className="stat-icon-name" title={t('mdf')}>
                                    <img src={'images/icons/magic_defense.webp'} alt='magic defense' />
                                    : {player.stats.magic_defense}
                                </div>
                                <div className="stat-icon-name" title={t('acc')}>
                                    <img src={'images/icons/accuracy.webp'} alt='accuracy' />
                                    : {player.stats.accuracy}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`inventory-block ${isExpanded ? 'expanded' : ''}`}>
                        <span className='items-title-span'>{t('items')}</span>
                        <Inventory
                            inventory={inventory}
                            player={player}
                            toggleExpanded={toggleExpanded}
                            isExpanded={isExpanded}
                        />
                    </div>
                </>
            )}
        </div>
    )
}