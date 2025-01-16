import React from 'react'

import style from './style.module.scss'


const Search = () => {
    return (
        <div className={style.main}>
            <input className={style.input} type='text' min={1} max={200} placeholder='Найди всё, что вздумается!' />
            <input className={style.button} type='submit' value='Найти' />
        </div>
    )
}

export default Search