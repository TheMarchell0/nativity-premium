import React, {useEffect} from 'react';
import {gsap} from 'gsap';
import css from './main.module.scss';
import Modal from "../modal/Modal";

const Main = () => {

    useEffect(() => {
        gsap.from('.gsap-title', {y: -40, opacity: 0, duration: 0.5});

        gsap.from('.gsap-subtitle', {
            y: -40,
            opacity: 0,
            duration: 0.5,
            delay: 0.2
        });

        gsap.from('.gsap-description', {
            y: -40,
            opacity: 0,
            duration: 0.5,
            delay: 0.4
        });

        gsap.from('.gsap-button', {
            y: -40,
            opacity: 0,
            duration: 0.5,
            delay: 0.6
        });
    }, []);


    return (
        <main>
            <div className={css.wrapper}>
                <div className="container">
                    <h1 className="visually-hidden">Nativity Premium</h1>
                    <p className={`gsap-title ${css.title}`}><span>Nativity</span> Premium</p>
                    <p className={`gsap-subtitle ${css.subtitle}`}>персональный сервис рекламных и PR-кампаний в Telegram-каналах</p>
                    <p className={`gsap-description ${css.description}`}>мы объединяем технологии и персональный подход для проведения
                        эффективных рекламных кампаний в Telegram</p>
                    <div className={`gsap-button ${css.buttonWrapper}`}>
                        <button className={css.button}>Отправить запрос</button>
                    </div>
                    <Modal/>
                </div>
            </div>
        </main>
    );
};

export default Main;
