import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import style from './style.module.scss'


const ResetPasswordPage = () => {
    const [codeBlock, setCodeBlock] = useState('email')
    const [codeMessageError, setCodeMessageError] = useState('')
    const sendAuthCode = (email) => {
        // Отправка на email кода с подтверждением (идет запрос на сервер)
        // ...

        const emailIsValid = true
        if (emailIsValid) {
            setCodeBlock('code')
        } else {
            setCodeMessageError('Произошла ошибка')
        }
    }
    const confirmCode = (code) => {
        // Отправка введенного кода на сервер
        // ...
        
        const authCodeAnswer = true
        if (authCodeAnswer) {
            setCodeBlock('success')
        } else {
            setCodeMessageError('Произошла ошибка')
        }
    }


    return (
        <div className={style.main}>
            <div className={style.reset}>
                <div className={style.reset_block}>
                    <div className={style.left}>
                        <b>Сброс пароля</b>
                        <form className={style.reset_box}>
                            {codeBlock === 'email' && (
                                <div>
                                    <div className={style.input_block}>
                                        <p>Почта</p>
                                        <input className={style.input} type='email' />
                                        <p className={style.p_before_input}>На указанную почту придет письмо с кодом из 6-ти цифр для входа в аккаунт.</p>
                                        <p className={style.p_before_input_error}>{codeMessageError}</p>
                                    </div>
                                    <button className={style.button} type='submit' onClick={() => {sendAuthCode()}}>Отправить код</button>
                                </div>
                            )}
                            {codeBlock === 'code' && (
                                <div>
                                    <div className={style.input_block}>
                                        <p>Код из почты</p>
                                        <input className={style.input} id='confirmCodeInput' />
                                        <p className={style.p_before_input}>На указанную почту придет письмо с новым паролем для входа в аккаунт. Обязательно поменяйте этот пароль на новый!</p>
                                        <p className={style.p_before_input_error}>{codeMessageError}</p>
                                    </div>
                                    <button className={style.button} type='submit' onClick={() => {confirmCode(document.getElementById('confirmCodeInput').value)}}>Подтвердить</button>
                                </div>
                            )}
                            {codeBlock === 'success' && (
                                <div className={style.success}>
                                    <b>Пароль успешно сброшен!</b>
                                    <p>На вашу почту пришло письмо с новым паролем. Советуем вам поменять его, как только войдёте в аккаунт.</p>
                                </div>
                            )}
                            
                        </form>
                    </div>
                    <div className={style.right}>
                        <div className={style.right_block}>
                            <h3>Вспомнили пароль?</h3>
                            <Link to='/login'><button className={style.create} type='submit'>Вход в аккаунт</button></Link>
                        </div>
                    </div>
                </div>
                <div className={style.to_main}><Link to='/'>На главную</Link></div> 
            </div>
        </div>
    )
}

export default ResetPasswordPage