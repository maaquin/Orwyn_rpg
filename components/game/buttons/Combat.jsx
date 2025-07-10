import { useEffect, useState } from "react"
import { itemsData } from "@/utils/data";

export const Combat = ({ mapData, dataGame, monster, action, animKey }) => {
    const [img, setImg] = useState(null);
    const [player, setPlayer] = useState(null);
    const [equipment, setEquipment] = useState(null);
    const [left, setLeft] = useState(null);
    const [right, setRight] = useState(null);

    console.log(action)

    useEffect(() => {
        if (mapData) {
            setImg(mapData.map?.actual?.img)
        }

        if (dataGame) {
            setPlayer(dataGame.playerData);
            setEquipment(dataGame.equipment);
        }
    }, [mapData, dataGame])

    useEffect(() => {
        if (equipment) {
            setLeft(itemsData[equipment.leftHand]);
            setRight(itemsData[equipment.rightHand]);
        }
    })

    const animation = (accion) => {
        switch (accion) {
            case "attack":
                return "attack-animation";
            case "magic":
                return "magic-float";
            case "defense":
                return "defense-stance";
            default:
                return "";
        }
    };

    const itemAnimation = (accion) => {
        switch (accion) {
            case "attack":
                return "attack-animation-item";
            case "magic":
                return "attack-animation-item";
            case "defense":
                return "defense-stance-item";
            case "consumable":
                return "item-use";
            default:
                return "";
        }
    };

    const renderItem = (item, slot) => {
        if (!item) return null;
        const hasEffect = item.effect?.some(e => e.stat === (action === "magic" ? "magic_damage" : "damage"));
        if (!hasEffect) return null;

        return (
            <img
                key={`${slot}${animKey}`}
                className={`sprite item-combat ${itemAnimation(action)}`}
                src={`images/items/${item.img}.webp`}
                alt={item.name}
            />
        );
    };

    return (
        mapData && player && monster &&
        <div className="combat-container">
            <img src={`images/combat/${img}.webp`} className="background-combat" alt="background" />

            <img
                key={animKey}
                src={`images/races/fullbody/${player.sex}_${player.race}.webp`}
                className={`sprite player-combat ${animation(action)}`}
                alt="player"
            />

            {renderItem(left, "left")}
            {renderItem(right, "right")}

            <img
                src={`images/monsters/${monster.img}.webp`}
                className="sprite enemy-combat"
                alt="enemy"
            />
        </div>
    )
}