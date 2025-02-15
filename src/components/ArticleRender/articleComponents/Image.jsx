import React, { useState } from 'react'
import { connect } from 'react-redux'

import style from '../style.module.scss'
import garbageSVG from './../../../assets/svg/garbage.svg'
import addDescriptionSVG from './../../../assets/svg/add_description.svg'
import removeDescriptionSVG from './../../../assets/svg/remove_description.svg'
import { removeElementToArticle, updateElementToArticle } from '../../../redux/reducers/articleReducer'
import Dropdown from '../../Dropdown/Dropdown'


const Image = (props) => {
    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.description)

    const removeElement = () => {
        props.removeElementToArticle(props.position)
    }

    const updateDescription = (newDescription) => {
        props.updateElementToArticle({
            'position': props.position,
            'content': {
                'description': newDescription
            }
        })
        setStatus(newDescription)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        let newText = status.replace(/\s+/g, ' ').trim()
        updateDescription(newText)
        setStatus(newText)
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div className={style.image}>
            {props.type === 'view' && (
                <div className={style.image_block}>
                    <img src={props.src} alt={props.description} />
                    {props.description !== '' && (
                        <p>{props.description}</p>
                    )}
                </div>
            )}
            {props.type === 'editing' && (
                <div className={style.image_block_editing}>
                    <Dropdown>
                        <div className={style.dropdown_block} onClick={removeElement}>
                            <img src={garbageSVG} alt='Удалить' />
                            <p>Удалить</p>
                        </div>
                        <div className={style.dropdown_block} onClick={() => updateDescription(props.description ? props.description : 'Описание к картинке')}>
                            <img src={addDescriptionSVG} alt='Добавить описание' />
                            <p>Добавить описание</p>
                        </div>
                        <div className={style.dropdown_block} onClick={() => updateDescription('')}>
                            <img src={removeDescriptionSVG} alt='Удалить описание' />
                            <p>Удалить описание</p>
                        </div>
                    </Dropdown>
                    <div className={style.image_block}>
                        <img src={props.src} alt={props.description} />
                        {!editMode &&
                            props.description !== '' && <p onClick={() => setEditMode(true)}>{props.description}</p>
                        }
                        {editMode &&
                            <input className={style.input_img} onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status} />
                        }
                    </div>
                </div>
            )}
        </div>
    )
}

export default connect(null, {removeElementToArticle, updateElementToArticle})(Image)