import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { GeneratedData } from "./GeneretedData";
import { player } from "./player";
import { itemsData } from "@/utils/data";

// Modal de selección (imagen + label)
const Modal = ({ isOpen, onClose, options, onSelect, grid }) => {
    const [show, setShow] = useState(false);
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setShow(true);
            setTimeout(() => setActive(true), 10);
        } else {
            setActive(false);
            setTimeout(() => setShow(false), 300);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className={`modal-overlay ${active ? 'active' : ''}`}>
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>×</button>
                <div className="options-grid" style={{ gridTemplateColumns: `repeat(${grid}, 1fr)` }}>
                    {options.map((opt) => (
                        <div key={opt.id} className="option-item" onClick={() => { onSelect(opt.id); onClose(); }}>
                            <img src={opt.img} alt={opt.label} />
                            <p>{opt.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const NewCharacter = () => {
    const { t } = useTranslation();
    const navigate = useRouter();
    const videoRef = useRef(null);
    const [settings, setSettings] = useState(null);
    const [showFadeOnLoad, setShowFadeOnLoad] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const settings2 = localStorage.getItem('settings');
        setSettings(JSON.parse(settings2))
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => setShowFadeOnLoad(false), 400);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.7
        }
    }, [settings])

    const [playerData, setPlayerData] = useState({
        name: "",
        sex: "",
        class: "",
        race: ""
    });

    const races = [
        { id: "human", img: playerData.sex ? `images/races/${playerData.sex}_human.webp` : `images/races/male_human.webp`, label: t('human') },
        { id: "elf", img: playerData.sex ? `images/races/${playerData.sex}_elf.webp` : `images/races/male_elf.webp`, label: t('elf') },
        { id: "seafolk", img: playerData.sex ? `images/races/${playerData.sex}_seafolk.webp` : `images/races/male_seafolk.webp`, label: t('seafolk') },
        { id: "warewolf", img: playerData.sex ? `images/races/${playerData.sex}_warewolf.webp` : `images/races/male_warewolf.webp`, label: t('warewolf') },
        { id: "dwarf", img: playerData.sex ? `images/races/${playerData.sex}_dwarf.webp` : `images/races/male_dwarf.webp`, label: t('dwarf') },
        { id: "sprite", img: playerData.sex ? `images/races/${playerData.sex}_sprite.webp` : `images/races/male_sprite.webp`, label: t('sprite') }
    ];

    const classes = [
        { id: "hermit", img: 'images/items/hermit.webp', label: t('hermit') },
        { id: "wizard", img: 'images/items/wizard.webp', label: t('wizard') },
        { id: "hunter", img: 'images/items/bow.webp', label: t('hunter') },
        { id: "squire", img: 'images/items/wooden_shield.webp', label: t('squire') },
    ];

    const coordenadasPorCiudad = {
        Valdoren: [5, 4],
        Drakmir: [1, 4],
        Myrrwood: [6, 3],
        Nymbria: [9, 7],
        Silvareth: [8, 8]
    };

    function getObjetosIniciales(padreProfesion, madreProfesion) {
        const objetos = new Map();

        const mapaObjetos = {
            "Consejero": 'item24',
            "Guardia": 'item40',
            "Comerciante": 'item26',
            "Hechicero": 'item31',
            "Noble": 'item24',
            "Tabernero": 'item8',
            "Herrero": 'item40',
            "Explorador": 'item26',
            "Sanador": 'item5',
            "Recolector": 'item32',
            "Artesano": 'item40',
            "Narrador": 'item26',
            "Cocinero": 'item14',
            "Guardabosques": 'item32',
            "Pescador": 'item33',
            "Gobernador": 'item24',
            "Carpintero": 'item40',
            "Sacerdote": 'item31',
            "Erudito": 'item24',
            "Maestro de magia": 'item5',
            "Trovador": 'item27',
            "Custodio del Monolito": 'item40'
        };

        for (const profesion of [padreProfesion, madreProfesion]) {
            for (const clave in mapaObjetos) {
                if (profesion.includes(clave)) {
                    const itemId = mapaObjetos[clave];
                    const itemData = itemsData[itemId];

                    if (itemData && !objetos.has(itemId)) {
                        objetos.set(itemId, {
                            id: itemId,
                            name: itemData.name,
                            img: itemData.img,
                            description: itemData.description,
                            price: itemData.price,
                            quantity: 1,
                            effect: itemData.effect ?? [],
                            type: itemData.type
                        });
                    }

                    break;
                }
            }
        }

        return Array.from(objetos.values()).slice(0, 2);
    }

    const [showRaceModal, setShowRaceModal] = useState(false);
    const [showClassModal, setShowClassModal] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPlayerData({ ...playerData, [name]: value });
    };

    const selectRaza = (raceId) => {
        setPlayerData({ ...playerData, race: raceId });
    };

    const selectClass = (classId) => {
        setPlayerData({ ...playerData, class: classId });
    };

    const handleCancel = () => {
        navigate.push('/');
    }

    const startGame = async ({ defaultData }) => {
        try {
            const res = await fetch('/api/player/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(defaultData),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('playerId', data.playerId);
            } else {
                console.error("Fallo al crear jugador:", data.message);
            }
        } catch (err) {
            console.error("Error al crear jugador:", err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!playerData.name || !playerData.sex || !playerData.class || !playerData.race) {
            setErrorMessage("⚠️ Campos incompletos");
            setTimeout(() => setErrorMessage(""), 3000);
            return;
        }

        try {
            const defaultData = player;

            defaultData.playerData.race = playerData.race;
            defaultData.playerData.class = playerData.class;
            defaultData.playerData.name = playerData.name;
            defaultData.playerData.sex = playerData.sex;

            const extraData = GeneratedData(playerData);
            defaultData.location = coordenadasPorCiudad[extraData.hometown] || [5, 4];

            const objetosIniciales = getObjetosIniciales(extraData.parents.father.profession, extraData.parents.mother.profession);
            defaultData.inventory = objetosIniciales;

            defaultData.playerData.hp = extraData.stats.health;

            defaultData.playerData = {
                ...defaultData.playerData,
                ...extraData
            };

            localStorage.removeItem("llm_iniciado");
            await startGame({ defaultData });

            navigate.push('/orwyn-game');
        } catch (error) {
            console.error("Error al crear personaje:", error);
        }
    };

    return (
        <div className="new-container">

            {errorMessage && (
                <div className="toast-notification">
                    {errorMessage}
                </div>
            )}

            {settings && (
                <video autoPlay loop muted className="background-video" ref={videoRef} src={`/videos/${settings.theme}.mp4`}></video>
            )}
            {showFadeOnLoad && (
                <div className="overlay-fade-onload" />
            )}

            <div className="new-card">
                <p className="title-new-character">{t('data_player')}</p>
                <div className="new-sub-container">
                    {/* Selección de Raza */}
                    <div className="race-container">
                        <div onClick={() => setShowRaceModal(true)} className={playerData.race ? ("selected-image-display-true") : ("selected-image-display")}>
                            {playerData.race ? (
                                <img src={races.find(r => r.id === playerData.race)?.img} alt="selected race" />
                            ) : (
                                <img src="images/placeholder/race.webp" />
                            )}
                        </div>

                        <div className="section-info-new-character">
                            <h1>{races.find(c => c.id === playerData.race)?.label}</h1>
                            {playerData.race ? (
                                <p>{t(`description${playerData.race.charAt(0).toUpperCase() + playerData.race.slice(1)}Race`)}</p>
                            ) : (
                                <p>{t('noRaceSelected')}</p>
                            )}
                        </div>
                    </div>

                    {/* Selección de Clase */}
                    <div className="race-container">
                        <div onClick={() => setShowClassModal(true)} className={playerData.class ? ("selected-image-display-true") : ("selected-image-display")}>
                            {playerData.class ? (
                                <img src={classes.find(c => c.id === playerData.class)?.img} alt="selected class" />
                            ) : (
                                <img src="images/placeholder/class.webp" />
                            )}
                        </div>

                        <div className="section-info-new-character">
                            <h1>{classes.find(c => c.id === playerData.class)?.label}</h1>
                            {playerData.class ? (
                                <p>{t(`description${playerData.class.charAt(0).toUpperCase() + playerData.class.slice(1)}Class`)}</p>
                            ) : (
                                <p>{t('noClassSelected')}</p>
                            )}
                        </div>
                    </div>

                    {/* Descripción de raza y clase */}
                    <div className="data-player-container">
                        {/* Formulario */}
                        <form>
                            <input
                                type="text"
                                name="name"
                                placeholder={t('name')}
                                value={playerData.name}
                                onChange={handleInputChange}
                            />

                            <select name="sex" value={playerData.sex} onChange={handleInputChange}>
                                <option value="">{t('sex')}</option>
                                <option value="male">Masculino</option>
                                <option value="female">Femenino</option>
                            </select>
                            <div className="buttons-new-character">
                                <button onClick={handleSubmit} type="submit">{t('done')}</button>
                                <button onClick={handleCancel} type="button">{t('back')}</button>
                            </div>
                        </form>
                    </div>

                    {/* Modals */}
                    <Modal
                        isOpen={showRaceModal}
                        onClose={() => setShowRaceModal(false)}
                        options={races}
                        onSelect={selectRaza}
                        grid={3}
                    />
                    <Modal
                        isOpen={showClassModal}
                        onClose={() => setShowClassModal(false)}
                        options={classes}
                        onSelect={selectClass}
                        grid={2}
                    />
                </div>
            </div>
        </div>
    );
};
