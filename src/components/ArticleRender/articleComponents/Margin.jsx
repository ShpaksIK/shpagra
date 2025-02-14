import React from 'react'
import { connect } from 'react-redux'

import style from '../style.module.scss'
import garbageSVG from './../../../assets/svg/garbage.svg'
import { removeElementToArticle } from '../../../redux/reducers/articleReducer'


const Margin = (props) => {
    const removeElement = () => {
        props.removeElementToArticle(props.position)
    }

    return (
        <div className={style.margin}>
            {props.type === 'editing' && (
                <div className={style.garbage} onClick={removeElement}>
                    <img src={garbageSVG} alt='Удалить' />
                </div>
            )}
            <div className={style.margin_block}></div>
        </div>
    )
}

export default connect(null, {removeElementToArticle})(Margin)