import { useEffect, useRef, useState } from "react";
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

export const TitleScreen = () => {

    const router = useRouter();
    const [dataGame, setData] = useState(false);
    const [settings, setSettings] = useState(null);
    const [showFadeOnLoad, setShowFadeOnLoad] = useState(true);
    const videoRef = useRef(null);

    useEffect(() => {
        const data = localStorage.getItem("partida");
        const settings = localStorage.getItem('settings');

        if (data) {
            setData(JSON.parse(data));
        }

        if (!settings) {
            const settingsNew = {
                textSpeed: 'normal',
                readingMode: 'inmersive',
                fontSize: 'medium',
                musicVolume: 'mid',
                theme: 'mountain',
            }

            setSettings(settingsNew);
            localStorage.setItem('settings', JSON.stringify(settingsNew));
        }

        setSettings(JSON.parse(settings));
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

    const handleNavigateToNewGame = () => {
        router.push('/new-character');
    }

    const handleNavigateToGame = () => {
        router.push('/orwyn-game');
    }

    const handleNavigateToOptions = () => {
        router.push('/options');
    }

    const { t } = useTranslation();

    return (
        <div className='title-container'>

            {settings && (
                <video autoPlay loop muted className="background-video" ref={videoRef} src={`/videos/${settings.theme}.mp4`}></video>
            )}
            {showFadeOnLoad && (
                <div className="overlay-fade-onload" />
            )}

            <div className='title'>
                <h3>{t('title')}</h3>
                <h1>Orwyn</h1>
            </div>
            <div className='buttons-container'>
                <button className="btn-title-screen" onClick={handleNavigateToNewGame}>{t('start_button')}</button>
                <button disabled={dataGame ? false : true} className={dataGame ? 'btn-title-screen' : 'disabled-btn'} onClick={handleNavigateToGame}>{t('continue')}</button>
                <button className="btn-title-screen" onClick={handleNavigateToOptions}>{t('options')}</button>
            </div>
        </div>
    )
}