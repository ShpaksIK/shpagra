import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'

import style from './style.module.scss'
import LoginForm from './LoginForm/LoginForm'


const LoginPage = (props) => {
    if (props.isAuth) {
        return <Navigate to='/profile'/>
    }

    return (
        <div className={style.main}>
            <div className={style.login}>
                <div className={style.login_block}>
                    <div className={style.left}>
                        <b>Войти в аккаунт</b>
                        <LoginForm />
                    </div>
                    <div className={style.right}>
                        <div className={style.right_block}>
                            <h3>Ещё не зарегистрированы? Сделайте это!</h3>
                            <Link to='/registration'><button className={style.create} type='submit'>Создать аккаунт</button></Link>
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

export default connect(mapStateToProps)(LoginPage)