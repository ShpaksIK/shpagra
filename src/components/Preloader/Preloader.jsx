import React from 'react'

import style from './style.module.scss'
import preloaderGIF from './../../assets/gif/loading.gif'


const Preloader = () => {
    return (
        <div className={style.preloader}>
            <img src={preloaderGIF} />
            <p>Загрузка...</p>
        </div>
    )
}

export default Preloader