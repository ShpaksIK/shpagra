import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import style from './style.module.scss'


const Header = (props) => {
    const [openBurger, setOpenBurger] = useState(false)
    const toggleIsLogin = () => setOpenBurger((openBurger) => !openBurger)

    return (
        <div className={style.main}>
            <div className={style.header}>
                <div className={style.noBurger}>
                    <div className={style.left}>
                        <Link className={style.link} to='/'>Главная</Link>
                        <Link className={style.link} to='/#articles'>Рекомендации</Link>
                    </div>
                    <h1>Shpagra</h1>
                    <div className={style.right}>
                    {props.isAuth && (
                        <Link className={style.link} to='/profile'>Профиль</Link>
                    )}
                    {!props.isAuth && (
                        <Link className={style.link} to='/login'>Войти</Link>
                    )}
                    </div>
                </div>
                <div className={style.burger} onClick={toggleIsLogin}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            {openBurger && (
                <div className={style.openBurger}>
                    <Link className={style.link} to='/'>Главная</Link>
                    <Link className={style.link} to='/#articles'>Рекомендации</Link>
                    {props.isAuth && (
                        <Link className={style.link} to='/profile'>Профиль</Link>
                    )}
                    {!props.isAuth && (
                        <Link className={style.link} to='/login'>Войти</Link>
                    )}
                </div>
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps)(Header)