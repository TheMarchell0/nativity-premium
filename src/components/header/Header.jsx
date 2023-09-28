import React from 'react';
import css from './header.module.scss';

const Header = () => {
    return (
        <header className={css.header}>
            <div className='container'>
                <div className={css.wrapper}>
                    <img src={require('../../images/header-logo.svg').default} alt="Логотип" width="209"/>
                    <button className={css.button}>Отправить запрос</button>
                </div>
            </div>
        </header>
    );
};

export default Header;