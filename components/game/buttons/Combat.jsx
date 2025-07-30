import { useEffect, useRef, useState } from "react"
import { itemsData } from "@/utils/data";
import { CombatManager } from "../functions/CombatManager";
import { Moves } from "./Moves";

export const Combat = ({ mapData, dataGame, mons, buttons, setEvent, handle }) => {
    const [img, setImg] = useState(null);
    const [player, setPlayer] = useState(null);
    const [monster, setMonster] = useState(null);
    const [equipment, setEquipment] = useState({ left: null, right: null, armor: null });
    const [inventory, setInventory] = useState(null)
    const [combatManager, setCombatManager] = useState(null);
    const [turn, setTurn] = useState("player");
    const [isActionInProgress, setIsActionInProgress] = useState(false);
    const [hpPlayer, setHpPlayer] = useState(null);
    const [hpMonster, setHpMonster] = useState(null);
    const [action, setAction] = useState(null);
    const [animKey, setAnimKey] = useState(0);
    const [selectConsumable, setSelectConsumable] = useState(false);
    const type = useRef(null);

    console.log(action)

    // Cargar monstruo desde prop o localStorage
    useEffect(() => {
        if (mons) {
            setMonster(mons);
            setHpMonster(mons.hp);
            localStorage.setItem('monster', JSON.stringify(mons))
        } else {
            const data = localStorage.getItem("monster");
            if (data) {
                const object = JSON.parse(data);
                setMonster(object);
                setHpMonster(object.hp);
            }
        }
    }, [mons]);

    // Cargar jugador y equipo
    useEffect(() => {
        if (mapData) setImg(mapData.map?.actual?.img);

        if (dataGame) {
            const p = dataGame.playerData;
            setPlayer(p);
            setHpPlayer(p.hp);

            const leftItem = itemsData[dataGame.equipment?.leftHand] || null;
            const rightItem = itemsData[dataGame.equipment?.rightHand] || null;
            const armor = itemsData[dataGame.equipment?.armor] || null;

            setEquipment({ left: leftItem, right: rightItem, armor });

            setInventory(dataGame.inventory);
        }
    }, [mapData, dataGame]);

    // Crear CombatManager una vez tengamos player + monster + equipo
    useEffect(() => {
        if (player && monster && equipment) {
            const manager = new CombatManager({
                player: { ...player, hp: hpPlayer },
                monster: { ...monster, hp: hpMonster },
                equipment,
                onUpdate: ({ player, monster }) => {
                    setHpPlayer(player.hp);
                    setHpMonster(monster.hp);
                    setPlayer(player);
                    setMonster(monster);
                }
            });

            setCombatManager(manager);
        }
    }, [player, monster, equipment]);


    useEffect(() => {
        if (!combatManager || !action) return;

        let item = equipment[action] || null;
        let actionType;
        

        if (action === 'left' || action === 'rigth') {
            if (item) {
                actionType = getActionTypeFromItem(item);
            } else {

                item = {
                    effect: [{ stat: "damage", value: 0 }],
                    name: "punch"
                };
                actionType = "attack";
            }
            

        console.log('effect: ',actionType)

            type.current = actionType;
            setIsActionInProgress(true);

            combatManager.performTurn({
                actor: turn === "player" ? combatManager.player : combatManager.monster,
                target: turn === "player" ? combatManager.monster : combatManager.player,
                item,
                type: actionType
            });

            setTimeout(() => {
                setTurn(prev => prev === "player" ? "enemy" : "player");
                setIsActionInProgress(false);
            }, 1000);
        } else if (action === "consumable") {
            setSelectConsumable(true);
        }
    }, [action, animKey]);

    useEffect(() => {
        if (!combatManager || turn !== "enemy" || isActionInProgress) return;

        setIsActionInProgress(true);

        // Simular IA enemiga: elegir acción (aquí siempre ataque físico por ejemplo)
        const enemyItem = {
            effect: [{ stat: "damage", value: 0 }]
        };

        combatManager.performTurn({
            actor: combatManager.monster,
            target: combatManager.player,
            item: enemyItem,
            type: "attack"
        });

        setTimeout(() => {
            setTurn("player");
            setIsActionInProgress(false);
        }, 1000);
    }, [turn, combatManager]);

    // Utilidad: determinar tipo de ataque
    const getActionTypeFromItem = (item) => {
        if (!item?.effect) return null;
        for (const effect of item.effect) {
            if (effect.stat === 'damage') return 'attack';
            if (effect.stat === 'magic_damage') return 'magic';
            if (effect.stat === 'defense') return 'defense';
        }
        return null;
    };

    const animation = (accion) => {
        switch (accion) {
            case "attack": return "attack-animation";
            case "magic": return "magic-float";
            case "defense": return "defense-stance";
            default: return "attack-animation";
        }
    };

    const itemAnimation = (type) => {
        switch (type) {
            case "attack":
            case "magic":
                return "attack-animation-item";
            case "defense":
                return "defense-stance-item";
            default:
                return "";
        }
    };

    const renderItem = (item, slot) => {
        if (!item) return null;
        const typeFromItem = getActionTypeFromItem(item);
        return (
            <img
                key={`${slot}${animKey}`}
                className={`sprite item-combat ${itemAnimation(typeFromItem)}`}
                src={`images/items/${item.img}.webp`}
                alt={item.name}
            />
        );
    };

    async function handleUseConsumable(item) {
        setSelectConsumable(false);
        setIsActionInProgress(true);

        combatManager.performTurn({
            actor: combatManager.player,
            target: combatManager.player,
            item,
            type: "consumable"
        });

        setTimeout(() => {
            setTurn("enemy");
            setIsActionInProgress(false);
        }, 1000);
    }

    return (
        mapData && player && monster &&
        <>
            <div className='p-container'>
                <div className="combat-layout">
                    <div className="combat-info">
                        <div className="player-combat-info">
                            <span>{player.name}</span>
                            <div className="health-bar-combat">
                                <div className="hp-fill-combat" style={{ width: `calc(100% * ${hpPlayer} / ${player.stats.health})` }}>
                                    <p>{hpPlayer} / {player.stats.health}</p>
                                </div>
                            </div>
                        </div>
                        <div className="enemy-combat-info">
                            <span>{monster.name}</span>
                            <div className="health-bar-combat-enemy">
                                <div className="hp-fill-combat" style={{ width: `calc(100% * ${hpMonster} / ${monster.stats.health})` }}>
                                    <p>{hpMonster} / {monster.stats.health}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="combat-container">
                        <img src={`images/combat/${img}.webp`} className="background-combat" alt="background" />

                        <img
                            key={animKey}
                            src={`images/races/fullbody/${player.sex}_${player.race}.webp`}
                            className={`sprite player-combat ${animation(type.current)}`}
                            alt="player"
                        />

                        {renderItem(equipment[action], action)}

                        <img
                            src={`images/monsters/${monster.img}.webp`}
                            className="sprite enemy-combat"
                            alt="enemy"
                        />
                    </div>
                </div>
            </div>
            <div className='separator-moves-text' />
            <Moves
                buttons={buttons}
                dataGame={dataGame}
                mapData={mapData}
                setAction={setAction}
                setAnimKey={setAnimKey}
                disabled={isActionInProgress}
                setEvent={setEvent}
                handle={handle}
            />

            {selectConsumable && (
                <div className="modal-overlay-combat-consumables" onClick={() => setSelectConsumable(false)}>
                    <div className="modal-content-combat" onClick={e => e.stopPropagation()}>
                        <h3>Elige un consumible</h3>
                        {inventory
                            .filter(item => item.type === "consumables")
                            .map((item, index) => (
                                <button key={index} className="modal-item" onClick={() => handleUseConsumable(item)}>
                                    {item.name} - {item.effect.map(e => `${e.stat} +${e.value}`).join(", ")}
                                </button>
                            ))}
                    </div>
                </div>
            )}
        </>
    );
}