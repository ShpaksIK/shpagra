import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import style from './style.module.scss'
import closeSVG from './../../assets/svg/close.svg'


const ArticleSettings = ({ onSettingsClick, removeArticle }) => {
    return (
        <div className={style.window_settings} onClick={onSettingsClick}>
            <div className={style.settings}>
                <img src={closeSVG} />
                <b>Настройка статьи</b>
                <div className={style.settings_blocks}>
                    <button className={classNames([style.button_danger, style.button])} onClick={removeArticle}>Удалить статью</button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        
    }
}

export default connect(mapStateToProps)(ArticleSettings)