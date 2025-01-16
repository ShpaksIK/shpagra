import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'

import style from './style.module.scss'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'


const ArticlePage = (props) => {
    const { articleId } = useParams()
    
    useEffect(() => {
        
    }, [])
    
    return (
        <div className={style.main}>
            <Header />
            
            <h1>ArticlePage</h1>

            <Footer />
        </div>
    )
}

export default connect(null)(ArticlePage)