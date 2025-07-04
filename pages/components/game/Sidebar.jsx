import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { DataPlayer } from './DataPlayer';

export const Sidebar = ({ data }) => {
    const [dataGame, setData] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
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

    const handleNavigateToMap = () => {
        router.push('/map')
    }

    const handleNavigateToHome = () => {
        router.push('/')
    }

    const handleNavigateToSettings = () => {
        router.push('/options')
    }

    return (
        <div className='side-bar'>
            <div className={`options-menu-container ${isExpanded ? 'expanded' : ''}`}>
                <div className='options-buttons'>
                    <img src="images/icons/compass.webp" alt="compass" />
                    <img onClick={handleNavigateToSettings} src="images/icons/options.webp" alt="options" />
                    <img onClick={handleNavigateToHome} src="images/icons/home.webp" alt="return" />
                </div>
                <div className='map-container-box'>
                    <div className='map-container' onClick={handleNavigateToMap}>
                        <img src='images/map_1.webp' alt="mapa" style={{
                            left: `${leftPercent}%`,
                            top: `${topPercent}%`
                        }} />
                    </div>
                </div>
            </div>
            <div className={`inventory-container ${isExpanded ? 'expanded' : ''}`}>
                <DataPlayer
                    dataGame={dataGame}
                    toggleExpanded={toggleExpanded}
                    isExpanded={isExpanded}
                />
            </div>
        </div>
    )
}