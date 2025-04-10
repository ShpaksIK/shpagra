import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import style from '../style.module.scss'
import garbageSVG from './../../../assets/svg/garbage.svg'
import { removeElementToArticle, updatePositionElement } from '../../../redux/reducers/articleReducer'
import arrowIMG from './../../../assets/img/arrow.png'
import Dropdown from '../../Dropdown/Dropdown'

const Margin = (props) => {
    const removeElement = () => {
        props.removeElementToArticle(props.position)
    }

    // Сдвиг элемента вверх
    const liftUpElement = () => {
        if (props.position > 0) {
            props.updatePositionElement(props.position, 'up')
        }
        }
        
    // Сдвиг элемента вниз
    const liftDownElement = () => {
        if (props.position < props.contentElementsCount - 1) {
            props.updatePositionElement(props.position, 'down')
        }
    }

    return (
        <div className={style.margin}>
            {props.type === 'editing' && (
                <Dropdown>
                    <div className={style.dropdown_block} onClick={removeElement}>
                        <img src={garbageSVG} alt='Удалить' />
                        <p>Удалить</p>
                    </div>
                    {props.position > 0 && (
                        <div className={style.dropdown_block} onClick={liftUpElement}>
                            <img src={arrowIMG} alt='Поднять' />
                            <p>Поднять</p>
                        </div>
                    )}
                    {props.position < props.contentElementsCount - 1 && (
                        <div className={classNames(style.dropdown_block, style.dropdown_block_arrowReverse)} onClick={liftDownElement}>
                            <img src={arrowIMG} alt='Опустить' />
                            <p>Опустить</p>
                        </div>
                    )}
                </Dropdown>
            )}
            <div className={style.margin_block}></div>
        </div>
    )
}

export default connect(null, {removeElementToArticle, updatePositionElement})(Margin)