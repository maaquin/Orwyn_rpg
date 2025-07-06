import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

export const Options = () => {

    const router = useRouter();
    const { t, i18n } = useTranslation();
    const videoRef = useRef(null);
    const [isFading, setIsFading] = useState(false);
    const [showFadeOnLoad, setShowFadeOnLoad] = useState(true);
    const [edit, setEdit] = useState(false);
    const [complete, setComplete] = useState(false);
    const [settings, setSettings] = useState({
        textSpeed: '',
        readingMode: '',
        fontSize: '',
        musicVolume: '',
        theme: '',
    });

    useEffect(() => {
        const timer = setTimeout(() => setShowFadeOnLoad(false), 400);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const settingstwo = localStorage.getItem('settings');

        if (!settingstwo) {
            const settingsNew = {
                textSpeed: '50',
                readingMode: 'inmersive',
                fontSize: 'medium',
                musicVolume: 'mid',
                theme: 'mountain',
            }

            setSettings(settingsNew);
            localStorage.setItem('settings', JSON.stringify(settingsNew));
        } else {
            setSettings(JSON.parse(settingstwo));
        }

        setComplete(true)
    }, []);

    const handleChange = (key, value) => {
        if (key === 'theme') {
            setIsFading(true);
            setTimeout(() => {
                setSettings((prev) => ({ ...prev, [key]: value }));
                setIsFading(false);
            }, 500);
            setEdit(true)
        } else {
            setSettings((prev) => ({ ...prev, [key]: value }));
            setEdit(true)
        }
    };

    useEffect(() => {
        if (settings.textSpeed === '') {
            return
        }
        localStorage.setItem('settings', JSON.stringify(settings));
        setEdit(false)
    }, [settings, edit]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.7
        }
    }, [settings])

    const handleBack = () => {
        const origin = localStorage.getItem('settings-origin')

        if (origin) {
            localStorage.removeItem('settings-origin')
            router.push('/orwyn-game');
        } else {
            router.push('/');
        }

    };

    return (
        < div className="options-container" >
            {complete && (
                <>
                    <div className='background-color' />
                    {settings && (
                        <video autoPlay loop muted className={`background-video ${isFading ? 'fade-out' : ''}`} ref={videoRef} src={`/videos/${settings.theme}.mp4`}></video>
                    )}
                    {showFadeOnLoad && (
                        <div className="overlay-fade-onload" />
                    )}

                    <div className="options-card">
                        <p className="title-new-character">{t('options')}</p>

                        <div className='options-row-container'>
                            <div className="option-row">
                                <span>{t('languaje')}</span>
                                <select
                                    onChange={(e) => i18n.changeLanguage(e.target.value)}
                                    value={i18n.language}
                                >
                                    <option value="es">Español</option>
                                    <option value="en">English</option>
                                </select>
                            </div>

                            <div className="option-row">
                                <span>{t('text_speed')}</span>
                                <select value={settings.textSpeed} onChange={(e) => handleChange('textSpeed', e.target.value)}>
                                    <option value="80">{t('slow')}</option>
                                    <option value="35">{t('normal')}</option>
                                    <option value="15">{t('fast')}</option>
                                </select>
                            </div>

                            <div className="option-row">
                                <span>{t('reading_mode')}</span>
                                <select value={settings.readingMode} onChange={(e) => handleChange('readingMode', e.target.value)}>
                                    <option value="inmersive">{t('inmersive')}</option>
                                    <option value="compact">{t('compact')}</option>
                                </select>
                            </div>

                            <div className="option-row">
                                <span>{t('font_size')}</span>
                                <select value={settings.fontSize} onChange={(e) => handleChange('fontSize', e.target.value)}>
                                    <option value="small">{t('small')}</option>
                                    <option value="medium">{t('medium')}</option>
                                    <option value="large">{t('large')}</option>
                                </select>
                            </div>

                            <div className="option-row">
                                <span>{t('music_volume')}</span>
                                <select value={settings.musicVolume} onChange={(e) => handleChange('musicVolume', e.target.value)}>
                                    <option value="silence">{t('silence')}</option>
                                    <option value="low">{t('low')}</option>
                                    <option value="mid">{t('mid')}</option>
                                    <option value="high">{t('high')}</option>
                                </select>
                            </div>

                            <div className="option-row">
                                <span>{t('theme')}</span>
                                <select value={settings.theme} onChange={(e) => handleChange('theme', e.target.value)}>
                                    <option value="highland">{t('highland')}</option>
                                    <option value="sunset">{t('sunset')}</option>
                                    <option value="mountain">{t('mountain')}</option>
                                    <option value="cave">{t('cave')}</option>
                                </select>
                            </div>

                            {/*
        <div className="option-row">
          <span>Cargar partida</span>
          <select onChange={(e) => alert(`Cargar: ${e.target.value}`)}>
            <option value="">Selecciona</option>
            <option value="slot1">Ranura 1</option>
            <option value="slot2">Ranura 2</option>
            <option value="slot3">Ranura 3</option>
          </select>
        </div>
        */}

                        </div>
                        <button onClick={handleBack} type="button">{t('back')}</button>
                    </div>
                </>
            )}
        </div >
    );
};