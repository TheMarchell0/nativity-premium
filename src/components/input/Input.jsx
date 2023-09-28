import React from 'react';
import InputMask from "react-input-mask";
import css from './input.module.scss';
import {v4 as uuidv4} from 'uuid';
import _ from 'lodash';

const Input = ({isPattern, type, name, placeholder, methods, classNames}) => {

    const {register, formState: {errors}, trigger} = methods;

    const waitForChange = React.useCallback(_.debounce(trigger, 400), []);

    const handleChange = async (event) => {
        await waitForChange(name);
    };

    const classnamesList = classNames ? [classNames.split(), css.input] : [css.input];

    const checkboxId = uuidv4();

    const patternInfo = {
        email: {
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            errorText: 'Некорректный E-mail',
        },
        url: {
            pattern: /^(ftp|http|https):\/\/[^ "]+$/,
            errorText: 'Некорректный url',
        },
        phone: {
            pattern: /^\+7 \(\d{3}\) \d{3} \d{2} \d{2}$/,
            errorText: 'Некорректный телефон',
        }
    }

    if (type === 'checkbox') {
        return <div className={`${css.inputWrapper} ${css.inputWrapperCheckbox}`}>
            <input
                className={classnamesList.join(' ')}
                name={name}
                id={checkboxId}
                type="checkbox"
                {...register(name, {
                    required: "Поле обязательно к заполнению!",
                })}
            />
            <label className={css.label} htmlFor={checkboxId}>Я согласен с политикой<br/>обработки <a href="https://promo.nativity.tech/policy/" target="_blank">персональных данных</a></label>
        </div>
    }

    if (type === 'tel') {
        return (
            <div className={css.inputWrapper}>
                <InputMask
                    className={classnamesList.join(' ')}
                    mask="+7 (999) 999 99 99"
                    name={name}
                    onChange={handleChange}
                    placeholder={placeholder}
                    {...register(name, {
                        required: "Поле обязательно к заполнению!",
                        pattern: {
                            value: patternInfo["phone"].pattern,
                            message: patternInfo["phone"].errorText
                        }
                    })}
                />
                <p className={`${css.error} ${errors[name] && css.error_show}`}>{errors[name]?.message}</p>
            </div>
        );
    }

    return (
        <div className={css.inputWrapper}>
            <input
                className={classnamesList.join(' ')}
                placeholder={placeholder}
                name={name}
                onChange={handleChange}
                {...register(name, {
                    required: "Поле обязательно к заполнению!",
                    pattern: isPattern ? {
                        value: patternInfo[type]?.pattern,
                        message: patternInfo[type]?.errorText
                    } : undefined
                })}
            />
            <p className={`${css.error} ${errors[name] && css.error_show}`}>{errors[name]?.message}</p>
        </div>
    );
};

export default Input;