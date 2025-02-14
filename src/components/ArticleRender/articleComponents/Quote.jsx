import React, { useState } from 'react'
import { connect } from 'react-redux'

import style from '../style.module.scss'
import garbageSVG from './../../../assets/svg/garbage.svg'
import { updateElementToArticle, removeElementToArticle } from '../../../redux/reducers/articleReducer'


const Quote = (props) => {
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

    return (
        <div className={style.quote}>
            {props.type === 'view' && (
                <div className={style.quote_block}>
                    <p>{props.text}</p> 
                </div>
            )}
            {props.type === 'editing' && (
                <div className={style.editing}>
                    <div className={style.garbage} onClick={removeElement}>
                        <img src={garbageSVG} alt='Удалить' />
                    </div>
                    {!editMode &&
                        <div className={style.quote_block}>
                            <p onClick={() => setEditMode(true)}>{props.text}</p> 
                        </div>
                    }
                    {editMode &&
                        <div className={style.quote_block}>
                            <input className={style.input_text} onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status} />
                        </div>
                    }
                </div>
            )}
        </div>
    )
}

export default connect(null, {updateElementToArticle, removeElementToArticle})(Quote)