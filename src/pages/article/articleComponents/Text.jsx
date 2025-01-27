import React from 'react'

import style from '../style.module.scss'


const Text = (props) => {
    return (
        <div className={style.text}>
            <p>{props.text}</p>
        </div>
    )
}

export default Text