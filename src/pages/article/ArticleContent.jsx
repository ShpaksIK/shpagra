import React from 'react'
import { connect } from 'react-redux'

import style from './style.module.scss'


const ArticleContent = (props) => {
    // console.log(props.article)
    // const renderedArticles = props.article.content.map(block => {
    //     switch (block.type) {
    //         case 'title':
    //             <h2>{block.text}</h2>
    //             break
    //         case 'text':
    //             <p>{block.text}</p>
    //             break
    //         case 'img':
    //             <img src={block.src} />
    //             break
    //         default:
    //             break
    //     }
    // })
    return (
        <div className={style.content}>
           {/* {renderedArticles} */}
        </div>
    )
}

const mapStateToProps = (state) => ({
    article: state.article.fullArticleContent
})

export default connect(mapStateToProps)(ArticleContent)