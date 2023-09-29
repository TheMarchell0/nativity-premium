import React, { useState, useRef, useContext, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import css from './modal.module.scss';
import Input from '../../components/input/Input';
import ModalContext from '../modalContext/ModalContext';

const Modal = () => {
    const overlayRef = useRef(null);
    const contentRef = useRef(null);
    const [scrollable, setScrollable] = useState(false);
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const closeSuccessModal = () => {
        setOpenSuccessModal(false);
        toggleBodyScroll(false);
        document.body.classList.remove('disable-scroll');
    };
    const openSuccessModalFunc = () => {
        setOpenSuccessModal(true);
    };
    const { isOpen, closeModal } = useContext(ModalContext);

    const formRef = useRef();

    const [showLoader, setShowLoader] = useState(false);

    const callScriptFunction = async (url, formElement) => {
        const response = await fetch(url, {
            method: 'POST',
            body: new FormData(formElement),
        });

        return response.text();
    };

    const toggleBodyScroll = (disable) => {
        if (disable) {
            document.body.classList.add('disable-scroll');
        } else {
            document.body.classList.remove('disable-scroll');
        }
    };

    const handleClose = () => {
        setScrollable(false);
        overlayRef.current.style.animation = 'fadeIn 0.3s reverse';
        contentRef.current.style.animation = 'slideUp 0.3s reverse';

        setTimeout(() => {
            closeModal();
        }, 300);
    };

    useEffect(() => {
        if (isOpen || openSuccessModal) {
            toggleBodyScroll(true);
        } else {
            toggleBodyScroll(false);
        }
    }, [isOpen, openSuccessModal]);

    useEffect(() => {
        const handleResize = () => {
            if (contentRef.current && window.innerHeight < contentRef.current.offsetHeight) {
                setScrollable(true);
            } else {
                setScrollable(false);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isOpen]);

    const methods = useForm({ mode: 'onChange' });

    const {
        formState: { isDirty, isValid },
        reset,
        setValue,
    } = methods;

    const onSubmit = async (data) => {
        setShowLoader(true);

        const scriptUrl = 'https://script.google.com/macros/s/AKfycbxW72e2UteLpG-cFjLBtbL3tqLcOj-Mlri3k3okdzRx_xXu4t__NsKF0BbhSSeeZKg/exec';

        await callScriptFunction(scriptUrl, formRef.current);

        reset({
            company_or_brand: '',
            email: '',
            url: '',
            phone: '',
        });
        setValue('phone', '');

        handleClose();
        openSuccessModalFunc();

        setShowLoader(false);
    };

    const handleOverlayClick = () => {
        handleClose();
    };

    return (
        <>
            {isOpen && (
                <div className="modal">
                    <div ref={overlayRef} className="modal__overlay" onClick={handleOverlayClick}></div>
                    <div
                        ref={contentRef}
                        className={`modal__content ${scrollable ? css.scrollableContent : ''} ${showLoader ? 'loading' : ''} ${css.content}`}
                    >
                        {showLoader && (
                            <div className="modal__loader">
                                <span></span>
                            </div>
                        )}
                        <button className={`modal__close ${css.close}`} onClick={handleOverlayClick}>
                            <img src={require('../../images/close.svg').default} alt="Закрыть" />
                        </button>
                        <p className={css.title}>Получить доступ к Nativity Premium </p>
                        <p className={css.description}>Готовы запускать рекламу? Отправьте запрос, чтобы получить доступ
                            к кабинету</p>
                        <div className={`form__content ${css.formContentWrapper}`}>
                            <p className={css.formTitle}>Оставить заявку</p>
                            <FormProvider {...methods}>
                                <form ref={formRef} onSubmit={methods.handleSubmit(onSubmit)} className="form">
                                    <Input name="company_or_brand" placeholder="Компания или бренд" methods={methods}/>
                                    <Input isPattern type="email" name="email" placeholder="E-mail" methods={methods}/>
                                    <Input isPattern type="url" name="url" placeholder="Ссылка на сайт"
                                           methods={methods}/>
                                    <Input isPattern type="tel" name="phone" placeholder="Телефон" methods={methods}/>
                                    <Input type="checkbox" name="personal_data" methods={methods}/>
                                    <button className="form__button" type="submit" disabled={!isDirty || !isValid}>
                                        Отправить запрос
                                    </button>
                                </form>
                            </FormProvider>
                        </div>
                    </div>
                </div>
            )}
            {openSuccessModal && (
                <div className="modal">
                    <div className="modal__overlay" onClick={closeSuccessModal}></div>
                    <div className={`modal__content ${css.content} ${css.content_confirm}`}>
                        <button className={`modal__close ${css.close} ${css.close_confirm}`} onClick={closeSuccessModal}>
                            <img src={require('../../images/close.svg').default} alt="Закрыть" />
                        </button>
                        <p className={`${css.title} ${css.title_confirm}`}>Ваш запрос отправлен!</p>
                        <p className={`${css.description} ${css.description_confirm}`}>
                            Менеджер Nativity Premium свяжется с вами в течение 24 часов.
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
