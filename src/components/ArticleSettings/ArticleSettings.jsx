import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'

import style from './style.module.scss'
import closeSVG from './../../assets/svg/close.svg'
import ConfirmWindow from '../ConfirmWindow/ConfirmWindow'
import ArticlePreview from '../ArticlePreview/ArticlePreview'


const ArticleSettings = ({ onSettingsClick, removeArticle }) => {
    const [isOpenConfirmWindow, setIsOpenConfirmWindow] = useState(false)
    const navigator = useNavigate()
    
    const removeArticleButton = () => {
        removeArticle()
        navigator('/profile')
    }

    const [isOpenArticlePreview, setIsOpenArticlePreview] = useState(false)

    return (
        <>
        {isOpenConfirmWindow && (
            <ConfirmWindow onClick={removeArticleButton} onClose={() => setIsOpenConfirmWindow(false)} />
        )}
        {!isOpenConfirmWindow && (
            <div className={style.window_settings}>
                {isOpenArticlePreview ? <ArticlePreview onClose={() => setIsOpenArticlePreview(false)} /> 
                : <>
                    <div className={style.settings}>
                        <img src={closeSVG} onClick={onSettingsClick} alt='Закрыть' />
                        <div className={style.settings_block}>
                            <b>Настройка статьи</b>
                            <div className={style.settings_blocks}>
                                <button className={style.button} onClick={() => setIsOpenArticlePreview(true)}>Предварительный просмотр</button>
                                <button className={classNames([style.button_danger, style.button])} onClick={() => setIsOpenConfirmWindow(true)}>Удалить статью</button>
                            </div>
                        </div>
                    </div>
                </>}
            </div>
        )}
        </>
    )
}

export default ArticleSettings