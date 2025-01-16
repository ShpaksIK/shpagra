import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import style from './style.module.scss'
import RegistrationForm from './RegistrationForm/RegistrationForm'


const RegistrationPage = (props) => {
    if (props.isAuth) {
        return <Navigate to='/profile'/>
    }

    return (
        <div className={style.main}>
            <div className={style.reg}>
                <div className={style.reg_block}>
                    <div className={style.right}>
                        <div className={style.right_block}>
                            <h3>У вас есть аккаунт? Войдите в него!</h3>
                            <Link to='/login'><button className={style.create} type='submit'>Вход в аккаунт</button></Link>
                        </div>
                    </div>
                    <div className={style.left}>
                        <b>Создание аккаунта</b>
                        <RegistrationForm />
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

export default connect(mapStateToProps)(RegistrationPage)