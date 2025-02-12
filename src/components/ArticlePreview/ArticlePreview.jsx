import React from 'react'
import { connect } from 'react-redux'

import style from './style.module.scss'
import closeSVG from './../../assets/svg/close.svg'
import { ArticleRender } from '../ArticleRender/ArticleRender'


const ArticlePreview = (props) => {
    const scopesElements = props.article.scopes.map((scop) => <div key={scop}>{scop}</div>) 

    return (
        <div className={style.preview}>
            <img src={closeSVG} onClick={props.onClose} alt='Закрыть' />
            <div className={style.preview_article}>
                <div className={style.preview_article_title}>
                    <h2>{props.article.title}</h2>
                    <p>{props.article.created_at}</p>
                </div>
                <div className={style.preview_article_scopes}>{scopesElements}</div>
                <div className={style.preview_article_desc}><p>{props.article.description}</p></div>
                <div className={style.preview_article_banner}>
                    <img src={props.article.banner} />
                </div>
                <hr />
                <div className={style.preview_article_content}>
                    <ArticleRender content={props.article.content} />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        article: state.article.editingArticle
    }
}

export default connect(mapStateToProps)(ArticlePreview)