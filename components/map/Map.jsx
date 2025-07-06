import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Lines } from './Lines';

export const Map = () => {
    const [viewStructures, setViewStructures] = useState(false);
    const [viewLines, setViewLines] = useState(false);
    const navigate  = useRouter()

    const handleNavigateToGame = () => {
        navigate.push('/orwyn-game')
    }

    const handleChangeStructures = () => {
        if (viewStructures) {
            setViewStructures(false);
        } else {
            setViewStructures(true);
        }
    }

    const handleChangeLines = () => {
        if (viewLines) {
            setViewLines(false);
        } else {
            setViewLines(true);
        }
    }

    const { t } = useTranslation();

    return (
        <div className='map-view'>
            <div className='options'>
                <button onClick={handleNavigateToGame}>
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
                <label>
                    <div className='switch'>
                        <input type="checkbox" name="map_structures" onChange={handleChangeStructures} />
                        <span className="slider"></span>
                    </div>
                    {t('map_structures')}
                </label>
                <label>
                    <div className='switch'>
                        <input type="checkbox" name="map_lines" onChange={handleChangeLines} />
                        <span className="slider"></span>
                    </div>
                    {t('map_lines')}
                </label>
            </div>
            <div className='map'>
                <div className='map-image'>
                    {viewLines ? (
                        <Lines />
                    ) : (
                        <></>
                    )}
                    {viewStructures ? (
                        <img src='images/map_1.webp' alt="map" />
                    ) : (
                        <img src='images/map_2.webp' alt="map" />
                    )}
                </div>
            </div>
        </div>
    )
}