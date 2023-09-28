import React, {useState, useRef, useEffect} from 'react';
import {useForm, FormProvider} from "react-hook-form";
import css from "./modal.module.scss";
import Input from "../../components/input/Input";

const Modal = () => {
    const [open, setOpen] = useState(false);
    const overlayRef = useRef(null);
    const contentRef = useRef(null);
    const [scrollable, setScrollable] = useState(false);
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const closeSuccessModal = () => {
        setOpenSuccessModal(false);
        toggleBodyScroll(false);
    };
    const openSuccessModalFunc = () => setOpenSuccessModal(true);

    useEffect(() => {
        if (open && contentRef.current) {
            const modalHeight = contentRef.current.offsetHeight;
            const windowHeight = window.innerHeight;
            if (modalHeight > windowHeight) {
                setScrollable(true);
            } else {
                setScrollable(false);
            }
        }
    }, [open]);

    const toggleBodyScroll = (disable) => {
        if (disable) {
            document.body.classList.add('disable-scroll');
        } else {
            document.body.classList.remove('disable-scroll');
        }
    };
    const handleClose = () => {
        overlayRef.current.style.animation = 'fadeIn 0.3s reverse';
        contentRef.current.style.animation = 'slideUp 0.3s reverse';
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
        toggleBodyScroll(true);
    };

    const methods = useForm({mode: "onChange"});

    const {
        formState: {isDirty, isValid},
        reset,
        setValue,
    } = methods;

    const onSubmit = (data) => {
        console.log(data);
        reset({
            company_or_brand: '',
            email: '',
            url: '',
            phone: '',
        });
        setValue("phone", "");

        handleClose(); // закрытие первой модалки
        openSuccessModalFunc(); // открытие второй модалки
    };

    return (
        <>
            <button onClick={handleOpen}>Открыть модалку с формой</button>
            {open && (
                <div className="modal">
                    <div ref={overlayRef} className="modal__overlay" onClick={handleClose}></div>
                    <div
                        ref={contentRef}
                        className={`modal__content ${scrollable ? css.scrollableContent : ''} ${css.content}`}
                    >
                        <button className={`modal__close ${css.close}`} onClick={handleClose}>
                            <img src={require('../../images/close.svg').default} alt="Закрыть"/>
                        </button>
                        <p className={css.title}>Получить доступ к Nativity Premium  </p>
                        <p className={css.description}>Готовы запускать рекламу? Отправьте запрос, чтобы получить доступ к кабинету</p>
                        <div className={`form__content ${css.formContentWrapper}`}>
                            <p className={css.formTitle}>Оставить заявку</p>
                            <FormProvider {...methods}>
                                <form onSubmit={methods.handleSubmit(onSubmit)} className="form">
                                    <Input name="company_or_brand" placeholder="Компания или бренд" methods={methods}/>
                                    <Input isPattern type="email" name="email" placeholder="E-mail" methods={methods}/>
                                    <Input isPattern type="url" name="url" placeholder="Ссылка на сайт" methods={methods}/>
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
                        <button className={`modal__close ${css.close}`} onClick={closeSuccessModal}>
                            <img src={require('../../images/close.svg').default} alt="Закрыть"/>
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
