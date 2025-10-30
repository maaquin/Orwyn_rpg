import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { DataPlayer } from './DataPlayer';
import { Lines } from '../map/Lines';

export const Sidebar = ({ data, isMobile, isPlayer, setIsPlayer, setDataGame }) => {
    const [dataGame, setData] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [modal, setModal] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setData(data);
    }, [data]);

    if (!dataGame || !dataGame.location) return null;

    const [x, y] = dataGame.location;
    const cellSizePercent = 10;

    const adjust = (val) => {
        if (val === 1) return 1;
        if (val === 10) return 3;
        return 2;
    };


    const toggleExpanded = () => {
        setIsExpanded(prev => !prev);
    }

    const leftPercent = -((x - adjust(x)) * cellSizePercent * 3.333);
    const topPercent = -((y - adjust(y)) * cellSizePercent * 3.333);

    const handleNavigateToHome = () => {
        router.push('/')
    }

    const handleNavigateToSettings = () => {
        localStorage.setItem('settings-origin', true)
        router.push('/options')
    }

    return (
        <>
            {!isMobile || isPlayer ?
                <div className='side-bar'>
                    <div className={`inventory-container ${isExpanded ? 'expanded' : ''}`}>
                        <div className={`options-menu-container ${isExpanded ? 'expanded' : ''}`}>
                            <div className='options-buttons'>
                                <div>
                                    <img onClick={handleNavigateToSettings} src="images/icons/options.webp" alt="options" />
                                    <span>Opciones</span>
                                </div>
                                <div>
                                    <img onClick={handleNavigateToHome} src="images/icons/home.webp" alt="return" />
                                    <span>Menú principal</span>
                                </div>
                            </div>
                            <div className='map-container-box'>
                                <div className='map-container' onClick={() => setModal(true)}>
                                    <img src='images/map_2.webp' alt="mapa" style={{
                                        left: `${leftPercent}%`,
                                        top: `${topPercent}%`
                                    }} />
                                </div>
                            </div>
                        </div>
                        <DataPlayer
                            dataGame={dataGame}
                            toggleExpanded={toggleExpanded}
                            isExpanded={isExpanded}
                            setDataGame={setDataGame}
                        />
                    </div>
                </div>
                :
                <div className='side-bar-mobile'>
                    <div className="name-image-player-mobile" onClick={() => setIsPlayer(true)}>
                        <div className='player-image-mobile'>
                            <div className="player-mobile">
                                <img src={`images/races/fullbody/${dataGame.playerData.sex}_${dataGame.playerData.race}.webp`} alt="player" />
                            </div>
                            <img src="images/backgrounds/player-container.webp" alt="player-container" className="container-player-mobile" />
                        </div>
                        <div className='name-health-bar-player'>

                            <span className="name-player-title">{dataGame.playerData.name}</span>

                            <div className="health-player">
                                <div className="health-bar">
                                    <div className="hp-fill" style={{ width: `calc(100% * ${dataGame.playerData.hp} / ${dataGame.playerData.stats.health})` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }


            {modal &&
                <div className='map-container-modal' onClick={() => setModal(false)}>
                    <div className='map-box'>
                        <div className='map-image'>
                            <Lines />
                            <img src='images/map_1.webp' alt="map" />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}