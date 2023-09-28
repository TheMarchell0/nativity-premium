import React from 'react';
import css from './footer.module.scss'

const Footer = () => {
    return (
        <footer className={css.footer}>
            <div className={css.container}>
                <ul className={css.list}>
                    <li className={css.column}>
                        <p className={css.title}>Nativity</p>
                        <a href="https://promo.nativity.tech/Offer.pdf" target="_blank" className={css.text}>Договор оферты (рекламодатели)</a>
                        <a href="https://promo.nativity.tech/Offer2.pdf" target="_blank" className={css.text}>Договор оферты (авторы и каналы)</a>
                        <a href="https://promo.nativity.tech/policy/" target="_blank" className={css.text}>Политика обработки ПД</a>
                    </li>
                    <li className={css.column}>
                        <p className={css.title}>Мы в соцсетях</p>
                        <a href="https://t.me/nativitytech" target="_blank" className={css.text}>Telegram</a>
                    </li>
                    <li className={css.column}>
                        <p className={css.title}>Помощь</p>
                        <a href="https://promo.nativity.tech/#faqModal" target="_blank" className={css.text}>FAQ / Справка</a>
                    </li>
                    <li className={css.column}>
                        <p className={css.title}>Для СМИ</p>
                        <a href="mailto:pr@nativity.tech" className={css.text}>pr@nativity.tech</a>
                    </li>
                    <li className={css.column}>
                        <p className={css.title}>Коммерческая служба</p>
                        <p className={`${css.text} ${css.specific}`}>Пн-Пт с 10:00 до 19:00</p>
                        <a href="mailto:more@nativity.tech" className={css.text}>more@nativity.tech</a>

                    </li>
                </ul>
                <p className={`${css.copyright} ${css.specific}`}>© 2022-2023</p>
            </div>
        </footer>
    );
};

export default Footer;