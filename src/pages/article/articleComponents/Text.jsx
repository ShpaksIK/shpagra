import React from 'react'

import style from '../style.module.scss'


const Text = (props) => {
    return (
        <div className={style.text}>
            <h2>{props.text}</h2>
        </div>
    )
}

export default Text