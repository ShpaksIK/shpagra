import React, { useState } from 'react'
import { connect } from 'react-redux'

import style from '../style.module.scss'
import garbageSVG from './../../../assets/svg/garbage.svg'
import { updateElementToArticle, removeElementToArticle } from '../../../redux/reducers/articleReducer'


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
                'text': newText
            })
            setStatus(newText)
        }
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div className={style.title}>
            {props.type === 'view' && (
                <h2 id={props.hrefId}>{props.text}</h2>
            )}
            {props.type === 'editing' && (
                <div className={style.editing}>
                    <div className={style.garbage} onClick={removeElement}>
                        <img src={garbageSVG} />
                    </div>
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

export default connect(null, {updateElementToArticle, removeElementToArticle})(Title)