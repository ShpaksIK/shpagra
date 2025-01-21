import React from 'react'
import { Link } from 'react-router-dom'

import style from './style.module.scss'
import ResetPasswordForm from './ResetPasswordForm/ResetPasswordForm'


const ResetPasswordPage = () => {

    return (
        <div className={style.main}>
            <div className={style.reset}>
                <div className={style.reset_block}>
                    <div className={style.left}>
                        <b>Сброс пароля</b>
                        <ResetPasswordForm />
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