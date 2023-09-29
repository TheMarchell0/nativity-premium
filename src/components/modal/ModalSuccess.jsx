import React from 'react';
import css from './modal.module.scss';

const ModalSuccess = ({ openSuccessModal, closeSuccessModal, contentRef, overlayRef }) => {
    return (
        openSuccessModal && (
            <div className="modal">
                <div className="modal__overlay" onClick={closeSuccessModal}  ref={overlayRef}></div>
                <div className={`modal__content ${css.content} ${css.content_confirm}`} ref={contentRef}>
                    <button className={`modal__close ${css.close} ${css.close_confirm}`} onClick={closeSuccessModal}>
                        <img src={require('../../images/close.svg').default} alt="Закрыть" />
                    </button>
                    <p className={`${css.title} ${css.title_confirm}`}>Ваш запрос отправлен!</p>
                    <p className={`${css.description} ${css.description_confirm}`}>
                        Менеджер Nativity Premium свяжется с вами в течение 24 часов.
                    </p>
                </div>
            </div>
        )
    );
};

export default ModalSuccess;