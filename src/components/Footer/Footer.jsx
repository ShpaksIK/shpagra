import React from 'react'
import { Link } from 'react-router-dom'

import style from './style.module.scss'


const Footer = () => {
    return (
        <div className={style.main}>
            <div className={style.blocks}>
                <div className={style.left}>
                    <div className={style.block_links}>
                        <b>Ссылки</b>
                        <Link to="/">Гланая</Link>
                        <Link to="/#articles">Новые посты</Link>
                        <Link to="/#articles">Рекомендации</Link>
                        <Link to="/profile">Личный кабинет</Link>
                    </div>
                    <div className={style.block_links}>
                        <b>Политика</b>
                        <Link to="/confidential">Политика конфиденциальности</Link>
                        <Link to="/termsofuse">Условия пользования</Link>
                    </div>
                </div>
                <div className={style.right}>
                    <h3>Shpagra - социальная сеть для общения, размещения статей и постов</h3>
                    <p>Используется только в России.</p>
                </div>
            </div>
        
            <div className={style.copyright}>
                <p>Copyright | Shpagra | 2025</p>
            </div>
        </div>
    )
}

export default Footer