import React from 'react'

import style from './style.module.scss'
import dotsSVG from './../../assets/svg/dots.svg'


const Dropdown = ({ children }) => {
    return (
        <div className={style.dropdown}>
            <button className={style.dropbtn}><img src={dotsSVG} /></button>
            <div className={style.dropdown_content}>
                {children}
            </div>
        </div>
    )
}

export default Dropdown