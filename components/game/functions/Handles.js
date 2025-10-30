import { responseMove } from './MoveTrue';
import { generarContexto } from "./GenerateContext";
import { combate } from './CombatManager';
import { data } from 'react-router';

export const Handles = ({ setEvent, askLLM, dataGame, setDataGame, mapData, cityData, setHola,
    handle, input, setInput, settings, setAction, setAnimKey }) => {

    function getNamesByKey(objects, targetKey) {
        return Object.values(objects)
            .filter(object => {
                if (Array.isArray(object.key)) {
                    return object.key.includes(targetKey);
                }
                return object.key === targetKey;
            })
            .map(object => object.name);
    }

    function getNamesByKeyAndCity(objects, targetKey, targetCity) {
        return Object.values(objects)
            .filter(object => {
                const keyMatch = Array.isArray(object.key) && object.key.includes(targetKey);
                const cityMatch = Array.isArray(object.city) && object.city.includes(targetCity);
                return keyMatch && cityMatch;
            })
            .map(object => object.name);
    }

    function filterNonStackableDuplicates(items, inventory) {
        const result = {};

        for (const [id, itemData] of Object.entries(items)) {
            const isInInventory = inventory.some(invItem => invItem.id === id);
            const isStackable = itemData.stackable ?? true;

            if (!isInInventory || isStackable) {
                result[id] = itemData;
            }
        }

        return result;
    }

    function getRandomUniqueItems(array, count) {
        const shuffled = [...array].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, count);
    }

    const handleAsk = () => {
        if (input.trim() === '') return;

        const contextoTemp = generarContexto(dataGame, mapData, cityData);
        setEvent(contextoTemp.event);

        askLLM(`${contextoTemp.contexto}\n Inicio diálogo jugador: ${input}\n Fin diálogo jugador`);
        setInput('');
    };

    const handleOptionClick = async (action) => {

        const result = await responseMove({ key: action.key, action: action.action || '', dataGame, setDataGame });
        let combat = null;

        if (result === 'inventory_full') {
            const contextoTemp = generarContexto(dataGame, mapData, cityData, 'inventory_full');
            setEvent(contextoTemp.event);
            askLLM(contextoTemp.contexto);
            return;

        } else if (result === 'no_money') {
            const contextoTemp = generarContexto(dataGame, mapData, cityData, 'no_money');
            setEvent(contextoTemp.event);
            askLLM(contextoTemp.contexto);
            return;

        } else if (result === 'left') {
            setAction('left');
            setAnimKey(prev => prev + 1);
            return;

        } else if (result === 'right') {
            setAction('right');
            setAnimKey(prev => prev + 1);
            return;

        } else if (result === 'consumable') {
            setAction('consumable');
            setAnimKey(prev => prev + 1);
            return;

        } else if (action.key === 'ruin' || action.key === 'corpse') {
            const res = Array.isArray(action.action) && action.action.length > 0
                ? action.action.map(i => i.name).join(", ")
                : null;
            const contextoTemp = generarContexto(dataGame, mapData, cityData, 'rewards', res);
            setEvent(contextoTemp.event);

            setHola(true)
            handle(true);

            askLLM(contextoTemp.contexto);
            return;
        } else if (action.key === 'monster') {
            const player = dataGame.playerData;
            const monster = action.monster;

            combat = combate({ player, monster, setDataGame })
        }


        const contextoTemp = generarContexto(dataGame, mapData, cityData);
        setEvent(contextoTemp.event);

        if (action.narrative) {
            askLLM(`${contextoTemp.contexto}\nAcción escogida: ${action.message} ${combat ? `\nEL resultado del combate fué: ${combat}` : ''}`);
        }

        handle(true);
    }

    function fontSize(isMobile) {
        if (!settings || !settings.fontSize) return 1;

        if (isMobile) {
            switch (settings.fontSize.toLowerCase()) {
                case 'small':
                    return .8;
                case 'medium':
                    return 1;
                case 'large':
                    return 1.2;
                default:
                    return 1;
            }
        } else {
            switch (settings.fontSize.toLowerCase()) {
                case 'small':
                    return .9;
                case 'medium':
                    return 1.2;
                case 'large':
                    return 1.4;
                default:
                    return 1.2;
            }
        }
    }

    function textSpeed() {
        if (!settings || !settings.textSpeed) return 1;

        switch (settings.textSpeed.toLowerCase()) {
            case 'slow':
                return 90;
            case 'normal':
                return 40;
            case 'fast':
                return 20;
            default:
                return 40;
        }
    }

    return {
        getNamesByKey,
        getNamesByKeyAndCity,
        getRandomUniqueItems,
        filterNonStackableDuplicates,
        fontSize,
        textSpeed,
        handleAsk,
        handleOptionClick
    }
} 