import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'

import style from './style.module.scss'
import { getArticleContent } from '../../redux/reducers/articleReducer'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import ArticleContent from './ArticleContent'


const ArticlePage = (props) => {
    const { articleId } = useParams()
    
    useEffect(() => {
        props.getArticleContent(articleId)
    }, [])
    
    return (
        <div className={style.main}>
            <Header />
            
            <h1>ArticlePage</h1>
            <ArticleContent />

            <Footer />
        </div>
    )
}

export default connect(null, {getArticleContent})(ArticlePage)