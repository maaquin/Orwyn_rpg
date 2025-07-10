import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { Inventory } from "./Inventory";

export const DataPlayer = ({ dataGame, toggleExpanded, isExpanded }) => {
    const { t } = useTranslation();
    const [player, setPlayer] = useState(null);
    const [info, setInfo] = useState(false);
    const [inventory, setInventory] = useState(new Array(12).fill(null));
    const [equipment, setEquipment] = useState({
        left: null,
        right: null,
        chest: null
    });

    useEffect(() => {
        async function handleEquipment() {
            try {
                await fetch(`/api/player/${dataGame._id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        equipment: {
                            leftHand: equipment.left?.id,
                            rightHand: equipment.right?.id,
                            armor: equipment.chest?.id
                        }
                    })
                });
            } catch (e) {
                console.error('Error: ',e)
            }
        }

        handleEquipment()
    }, [equipment])

    useEffect(() => {
        if (dataGame) {
            setPlayer(dataGame.playerData);

            const filledInventory = Array.from({ length: 12 }, (_, i) => {
                return dataGame.inventory[i] ?? { name: "empty", id: i };
            });

            setInventory(filledInventory);


            let left = dataGame.equipment.leftHand;
            let right = dataGame.equipment.rightHand;
            let chest = dataGame.equipment.armor;

            let l = filledInventory.find(item => item.id === left);
            let r = filledInventory.find(item => item.id === right);
            let c = filledInventory.find(item => item.id === chest);

            setEquipment(prev => ({ ...prev, ['left']: l }));
            setEquipment(prev => ({ ...prev, ['right']: r }));
            setEquipment(prev => ({ ...prev, ['chest']: c }));
        }
    }, [dataGame]);

    if (!player) {
        return null
    }

    const handleInfo = () => {
        if (info) {
            setInfo(false);
        } else {
            setInfo(true);
        }
    }

    return (
        <div className={`inventory ${isExpanded ? 'expanded' : ''}`}>
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
                                    {!isExpanded && (
                                        <span className="player-stats-info" onClick={handleInfo}>
                                            <img src="images/icons/info.webp" alt="info" />
                                            {info ? 'Equiped' : 'Stats'}
                                        </span>
                                    )}
                                    <span className="name-player-title">{player.name}</span>

                                    <div className="health-player">
                                        <div className="health-bar">
                                            <div className="hp-fill" style={{ width: `calc(100% * ${player.hp} / ${player.stats.health})` }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {info ? (
                                <>
                                    <div className={`class-race-nature ${isExpanded ? 'expanded' : ''}`}>
                                        <div className="class-race-nature-div">
                                            <div className="class-race-nature-span">
                                                <span>
                                                    {t('racee')}:
                                                </span>
                                                {player.race}
                                            </div>
                                            <img src={`images/icons/${player.race}.webp`} alt={player.class} />
                                        </div>
                                        <div className="class-race-nature-div">
                                            <div className="class-race-nature-span">
                                                <span>
                                                    {t('classs')}:
                                                </span>
                                                {player.class}
                                            </div>
                                            <img src={`images/icons/${player.class}.webp`} alt={player.class} />
                                        </div>
                                        <div className="class-race-nature-div">
                                            <div className="class-race-nature-span">
                                                <span>
                                                    {t('nature')}:
                                                </span>
                                                {player.nature}
                                            </div>
                                            <img src={`images/icons/${player.nature}.webp`} alt={player.class} />
                                        </div>
                                    </div>
                                    <div className={`stats-icons-player ${isExpanded ? 'expanded' : ''}`}>
                                        <div className="stat-icon-name-container">
                                            <div className="stat-icon-name">
                                                <img src={'images/icons/attack.webp'} alt='attack' />
                                                : {player.stats.attack}
                                            </div>

                                            <span>{t('atk')}</span>
                                        </div>
                                        <div className="stat-icon-name-container">
                                            <div className="stat-icon-name">
                                                <img src={'images/icons/defense.webp'} alt='defense' />
                                                : {player.stats.defense}
                                            </div>

                                            <span>{t('def')}</span>
                                        </div>
                                        <div className="stat-icon-name-container">
                                            <div className="stat-icon-name">
                                                <img src={'images/icons/speed.webp'} alt='speed' />
                                                : {player.stats.speed}
                                            </div>

                                            <span>{t('spd')}</span>
                                        </div>
                                        <div className="stat-icon-name-container">
                                            <div className="stat-icon-name">
                                                <img src={'images/icons/magic_attack.webp'} alt='magic attack' />
                                                : {player.stats.magic_attack}
                                            </div>

                                            <span>{t('mat')}</span>
                                        </div>
                                        <div className="stat-icon-name-container">
                                            <div className="stat-icon-name">
                                                <img src={'images/icons/magic_defense.webp'} alt='magic defense' />
                                                : {player.stats.magic_defense}
                                            </div>

                                            <span>{t('mdf')}</span>
                                        </div>
                                        <div className="stat-icon-name-container">
                                            <div className="stat-icon-name">
                                                <img src={'images/icons/accuracy.webp'} alt='accuracy' />
                                                : {player.stats.accuracy}
                                            </div>

                                            <span>{t('acc')}</span>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className={`equiped-items-container ${isExpanded ? 'expanded' : ''}`}>
                                    <div className="chest-container">
                                        <div className="chest">
                                            <div className="chest-border">
                                                {equipment.chest ? (
                                                    <img title={`${equipment.chest.name}: ${equipment.chest.description}`} style={{ padding: '5px', boxSizing: 'border-box' }} src={`images/items/${equipment.chest.img}.webp`} alt="chest2" />
                                                ) : (
                                                    <img src="images/icons/chest.webp" alt="chest" />
                                                )}
                                            </div>
                                            Armored
                                        </div>
                                    </div>
                                    <div className="hands-container">
                                        <div className="left-hand">
                                            <div className="left-hand-border">
                                                {equipment.left ? (
                                                    <img title={`${equipment.left.name}: ${equipment.left.description}`} style={{ padding: '5px', boxSizing: 'border-box' }} src={`images/items/${equipment.left.img}.webp`} alt="chest2" />
                                                ) : (
                                                    <img src="images/icons/left.webp" alt="left hand" />
                                                )}
                                            </div>
                                            Left hand
                                        </div>
                                        <div className="right-hand">
                                            <div className="right-hand-border">
                                                {equipment.right ? (
                                                    <img title={`${equipment.right.name}: ${equipment.right.description}`} style={{ padding: '5px', boxSizing: 'border-box' }} src={`images/items/${equipment.right.img}.webp`} alt="chest2" />
                                                ) : (
                                                    <img src="images/icons/right.webp" alt="right hand" />
                                                )}
                                            </div>
                                            Right hand
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={`inventory-block ${isExpanded ? 'expanded' : ''}`}>
                        <div className="inventory-arrow">
                            <span className='items-title-span'>{t('items')}</span>
                            <img
                                src="images/ornaments/arrow_inventory.webp"
                                className={`arrow-expand-inventory ${isExpanded ? 'rotated' : ''}`}
                                onClick={toggleExpanded}
                                style={{ cursor: 'pointer', padding: '0 10px' }}
                                alt="toggle inventory"
                            />
                        </div>

                        <Inventory
                            inventory={inventory}
                            player={player}
                            isExpanded={isExpanded}
                            equipment={setEquipment}
                            e={equipment}
                        />
                    </div>
                </>
            )}
        </div>
    )
}