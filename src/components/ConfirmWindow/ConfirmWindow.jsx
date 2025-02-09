import React from 'react'
import { connect } from 'react-redux'

import style from './style.module.scss'
import closeSVG from './../../assets/svg/close.svg'


const ConfirmWindow = ({ onClick, onClose }) => {
    return (
        <div className={style.confirm}>
            <div className={style.settings}>
                <img src={closeSVG} onClick={onClose} alt='Закрыть' />
                <div className={style.settings_block}>
                    <b>Вы уверены?</b>
                    <div className={style.settings_blocks}>
                        <button className={style.button_insert} onClick={onClick}>Да</button>
                        <button className={style.button} onClick={onClose}>Нет</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        
    }
}

export default connect(mapStateToProps)(ConfirmWindow)