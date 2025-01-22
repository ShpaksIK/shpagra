import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'

import style from './style.module.scss'
import EnterEmailForm from './ResetPasswordForms/EnterEmailForm'
import EnterCodeForm from './ResetPasswordForms/EnterCodeForm'


const ResetPasswordPage = (props) => {
    const navigate = useNavigate()
    if (props.isAuth) {
        navigate('/')
    }

    const [step, setStep] = useState(1) // Шаги: 1 - ввод почты, 2 - ввод кода, 3 - успех
    const [success, setSuccess] = useState(false)
    
    return (
        <div className={style.main}>
            <div className={style.reset}>
                <div className={style.reset_block}>
                    <div className={style.left}>
                        <b>Сброс пароля</b>
                        {step === 1 && (
                           <EnterEmailForm setStep={setStep} />
                        )}
                        {step === 2 && (
                            <EnterCodeForm setStep={setStep} setSuccess={setSuccess} />
                        )}
                        {success && (
                            <div className={style.success}>
                                <b>Пароль успешно сброшен!</b>
                                <p>На вашу почту пришло письмо с новым паролем. Советуем вам поменять его, как только войдёте в аккаунт.</p>
                            </div>
                        )}
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

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps)(ResetPasswordPage)