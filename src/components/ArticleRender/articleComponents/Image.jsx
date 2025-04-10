import React, { useState } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import style from '../style.module.scss'
import uploadIMG from './../../../assets/img/upload.jpg'
import garbageSVG from './../../../assets/svg/garbage.svg'
import addDescriptionSVG from './../../../assets/svg/add_description.svg'
import removeDescriptionSVG from './../../../assets/svg/remove_description.svg'
import { removeElementToArticle, updateElementToArticle, updatePositionElement } from '../../../redux/reducers/articleReducer'
import Dropdown from '../../Dropdown/Dropdown'
import arrowIMG from './../../../assets/img/arrow.png'


const Image = (props) => {
    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.description)

    const [isOpenImage, setIsOpenImage] = useState(false)

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

    const handleFileChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            props.updateElementToArticle({
                'position': props.position,
                'content': {
                    'src': file
                }
            })
        }
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
        <div className={style.image}>
            {props.type === 'view' && (
                <div className={style.image_block}>
                    {isOpenImage && (
                        <div className={style.image_block_open}  onClick={() => setIsOpenImage(false)}>
                            <img src={URL.createObjectURL(props.src)} alt={props.description} />
                        </div>
                    )}
                    {props.src && <img src={URL.createObjectURL(props.src)} alt={props.description} onClick={() => setIsOpenImage(true)} />}
                    {!props.src &&  <img src={uploadIMG} alt={props.description} />}
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
                        <div className={style.dropdown_block}>
                            <div className={style.image_upload}>
                                <input
                                    type='file'
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className={style.file_input}
                                />
                                <span className={style.upload_text}>Загрузить изображение</span>
                            </div>
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
                        {props.src && <img src={URL.createObjectURL(props.src)} alt={props.description} />}
                        {!props.src &&  <img src={uploadIMG} alt={props.description} />}
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

export default connect(null, {removeElementToArticle, updateElementToArticle, updatePositionElement})(Image)