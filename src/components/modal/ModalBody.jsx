import React, {useEffect} from 'react';
import Input from '../../components/input/Input';
import {useForm, FormProvider} from 'react-hook-form';
import css from './modal.module.scss';

const ModalBody = ({scrollable, showLoader, handleSubmit, formRef, onSubmit, contentRef}) => {
    const methods = useForm({mode: 'onChange'});
    const {formState: {isDirty, isValid}} = methods;

    return (
        <div
            ref={contentRef}
            className={`modal__content ${scrollable ? css.scrollableContent : ''} ${showLoader ? 'loading' : ''} ${css.content}`}
        >
            {showLoader && (
                <div className="modal__loader">
                    <span></span>
                </div>
            )}
            <button className={`modal__close ${css.close}`} onClick={handleSubmit}>
                <img src={require('../../images/close.svg').default} alt="Закрыть"/>
            </button>
            <p className={css.title}>Получить доступ к Nativity Premium </p>
            <p className={css.description}>Готовы запускать рекламу? Отправьте запрос, чтобы получить доступ к
                кабинету</p>
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
    );
};

export default ModalBody;
