import React from 'react'

import style from '../style.module.scss'


const Image = (props) => {
    return (
        <div className={style.img}>
            <h2>{props.img}</h2>
        </div>
    )
}

export default Image