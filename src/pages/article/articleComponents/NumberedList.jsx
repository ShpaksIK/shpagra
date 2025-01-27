import React from 'react'

import style from '../style.module.scss'


const NumberedList = (props) => {
    return (
        <ol className={style.ol}>
            {props.list.map(l => <li>{l}</li>)}
        </ol>
    )
}

export default NumberedList