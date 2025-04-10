import React, { useState } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import style from '../style.module.scss'
import garbageSVG from './../../../assets/svg/garbage.svg'
import { updateElementToArticle, removeElementToArticle, updatePositionElement } from '../../../redux/reducers/articleReducer'
import Dropdown from '../../Dropdown/Dropdown'
import arrowIMG from './../../../assets/img/arrow.png'


const Title = (props) => {
    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.text)

    const removeElement = () => {
        props.removeElementToArticle(props.position)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        if (status.replace(/ /g, '') == '') {
            removeElement()
        } else {
            let newText = status.replace(/\s+/g, ' ').trim()
            props.updateElementToArticle({
                'position': props.position,
                'content': {
                    'text': newText
                }
            })
            setStatus(newText)
        }
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
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
        <div className={style.title}>
            {props.type === 'view' && (
                <h2 id={props.hrefId}>{props.text}</h2>
            )}
            {props.type === 'editing' && (
                <div className={style.editing}>
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
                    {!editMode &&
                        <h2 id={props.hrefId} onClick={() => setEditMode(true)}>{props.text}</h2>
                    }
                    {editMode &&
                        <input className={style.input_title} onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status} />
                    }
                </div>
            )}
        </div>
    )
}

export default connect(null, {updateElementToArticle, removeElementToArticle, updatePositionElement})(Title)