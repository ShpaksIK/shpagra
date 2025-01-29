import React from 'react'

import style from '../style.module.scss'


const BulletedList = (props) => {
    return (
        <ul className={style.ul}>
            {props.list.map((l, i) => <li key={`bl-${i}`}>{l}</li>)}
        </ul>
    )
}

export default BulletedList