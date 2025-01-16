import React from 'react'

import style from './style.module.scss'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'


const InstructionArticlePage = () => {
    return (
        <div className={style.main}>
            <Header />
            <div className={style.instruction}>
                <h3>Инструкция по написанию статьи</h3>
            </div>
            <Footer />
        </div>
    )
}

export default InstructionArticlePage