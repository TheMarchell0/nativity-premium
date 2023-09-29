import React, { useContext } from 'react';
import css from './header.module.scss';
import ModalContext from '../modalContext/ModalContext';

const Header = () => {
    const { openModal } = useContext(ModalContext);

    return (
        <header className={css.header}>
            <div className='container'>
                <div className={css.wrapper}>
                    <img src={require('../../images/header-logo.svg').default} alt="Логотип" width="209" />
                    <button className={css.button} onClick={openModal}>Отправить запрос</button>
                </div>
            </div>
        </header>
    );
};

export default Header;
