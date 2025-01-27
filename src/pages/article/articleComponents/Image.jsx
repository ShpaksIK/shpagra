import React from 'react'

import style from '../style.module.scss'


const Image = (props) => {
    return (
        <div className={style.img}>
            <img src={props.src} />
        </div>
    )
}

export default Image