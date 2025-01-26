import React from 'react'
import { connect } from 'react-redux'

import style from './style.module.scss'
import Preloader from './../../components/Preloader/Preloader'


const ArticleContent = (props) => {
    const objectLength = Object.keys(props.article).length
    let renderedArticles
    if (objectLength != 0) {
        renderedArticles = props.article.content.map((block, index) => {
            switch (block.type) {
                case 'title':
                    return <h2 key={index}>{block.text}</h2>
                case 'text':
                    return <p key={index}>{block.text}</p>
                case 'img':
                    return <img key={index} src={block.src} />
                default:
                    return
            }
        })
    }
    
    return (
        <div className={style.content}>
            {objectLength > 0 && (
                renderedArticles
            )}
            {objectLength == 0 && (
                <Preloader />
            )}
        </div>
    )
}

export default connect(null)(ArticleContent)