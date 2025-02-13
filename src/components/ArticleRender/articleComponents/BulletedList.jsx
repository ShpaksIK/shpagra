import React, { useState } from 'react'
import { connect } from 'react-redux'

import style from '../style.module.scss'
import garbageSVG from './../../../assets/svg/garbage.svg'
import addParagraphSVG from './../../../assets/svg/add_paragraph.svg'
import { updateElementToArticle, removeElementToArticle } from '../../../redux/reducers/articleReducer'


export const BulletedListLi = (props) => {
    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.text)

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateElementList(status, props.textPosition)
        setStatus(status)
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
            'list': [...props.list, 'Новый пункт']
        })
    }

    // Удаление пункта из BulletedList
    const removeElementToList = () => {
        props.updateElementToArticle({
            'position': props.position,
            'list': [...props.list, 'Новый пункт']
        })
    }
    
    // Обновление пункта в BulletedList
    const updateElementList = (newText, textPosition) => {
        let newList = []
        for (let i = 0; i < props.list.length; i++) {
            if (i === textPosition && newText.replace(/ /g, '') != '') {
                newList.push(newText)
            } else {
                newList.push(props.list[i])
            }
        }
        props.updateElementToArticle({
            'position': props.position,
            'list': newList
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
                    <div className={style.garbage} onClick={removeElement}>
                        <img src={garbageSVG} alt='Удалить' />
                    </div>
                    <div className={style.addParagraph} onClick={addElementToList}>
                        <img src={addParagraphSVG} alt='Добавить пункт' />
                    </div>
                    <ul className={style.ul}>
                        {props.list.map((l, i) => <li key={`bl-${i}`}>
                            <BulletedListLi 
                                text={l} 
                                position={props.position} 
                                updateElementList={updateElementList}
                                textPosition={i}
                        /></li>)}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default connect(null, {updateElementToArticle, removeElementToArticle})(BulletedList)