import React, { useState } from 'react'
import { connect } from 'react-redux'

import style from '../style.module.scss'
import garbageSVG from './../../../assets/svg/garbage.svg'
import addParagraphSVG from './../../../assets/svg/add_paragraph.svg'
import { updateElementToArticle, removeElementToArticle } from '../../../redux/reducers/articleReducer'
import Dropdown from '../../Dropdown/Dropdown'


export const BulletedListLi = (props) => {
    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.text)

    const deactivateEditMode = () => {
        setEditMode(false)
        let newText = status.replace(/\s+/g, ' ').trim()
        props.updateElementList(newText, props.textPosition)
        setStatus(newText ? newText : props.text)
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }
    
    return (
        <>
            {!editMode &&
                <p onClick={() => setEditMode(true)}>{props.text}</p>
            }
            {editMode &&
                <input className={style.input_list} onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status} />
            }
        </>
    )
}


const BulletedList = (props) => {
    // Удаление элемента (компонента) BulletedList
    const removeElement = () => {
        props.removeElementToArticle(props.position)
    }

    // Если в BulletedList нет пунктов, то удаляем компонент
    if (props.list.length === 0) {
        removeElement()
    }
    
    // Добавление нового пункта в BulletedList
    const addElementToList = () => {
        props.updateElementToArticle({
            'position': props.position,
            'content': {
                'list': [...props.list, 'Новый пункт']
            }
        })
    }
    
    // Обновление пункта в BulletedList
    const updateElementList = (newText, textPosition) => {
        let newList = []
        for (let i = 0; i < props.list.length; i++) {
            if (i == textPosition) {
                newList.push(newText)
            } else {
                newList.push(props.list[i])
            }
        }
        props.updateElementToArticle({
            'position': props.position,
            'content': {
                'list': newList.filter(l => l !== '')
            }
        })
    }

    return (
        <div className={style.text}>
            {props.type === 'view' && (
                <ul className={style.ul}>
                    {props.list.map((l, i) => <li key={`bl-${i}`}>{l}</li>)}
                </ul>
            )}
            {props.type === 'editing' && (
                <div className={style.editing_list}>
                    <Dropdown>
                        <div className={style.dropdown_block} onClick={removeElement}>
                            <img src={garbageSVG} alt='Удалить' />
                            <p>Удалить</p>
                        </div>
                        <div className={style.dropdown_block} onClick={addElementToList}>
                            <img src={addParagraphSVG} alt='Добавить пункт' />
                            <p>Добавить пункт</p>
                        </div>
                        <p className={style.dropdown_block_text}>Чтобы удалить пункт, сотрите текст</p>
                    </Dropdown>
                    <ul className={style.ul}>
                        {props.list.map((l, i) => <li key={`bl-${i}`}>
                            <BulletedListLi 
                                text={l} 
                                updateElementList={updateElementList} 
                                textPosition={i}
                            />
                        </li>)}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default connect(null, {updateElementToArticle, removeElementToArticle})(BulletedList)