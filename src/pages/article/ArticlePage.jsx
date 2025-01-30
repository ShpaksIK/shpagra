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

            <ArticleContent />
            
            <Footer />
        </div>
    )
}

const mapStateToProps = (state) => ({
    article: state.article.fullArticleContent
})

export default connect(null, {getArticleContent})(ArticlePage)