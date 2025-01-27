import React from 'react'
import { connect } from 'react-redux'

import style from './style.module.scss'
import Preloader from './../../components/Preloader/Preloader'
import Title from './articleComponents/Title'
import Text from './articleComponents/Text'
import Image from './articleComponents/Image'
import Indent from './articleComponents/Indent'
import NumberedList from './articleComponents/NumberedList'
import BulletedList from './articleComponents/BulletedList'


const ArticleContent = (props) => {
    const objectLength = Object.keys(props.article).length
    let renderedArticles
    if (objectLength != 0) {
        let titleCount = 0
        renderedArticles = props.article.content.map((block, index) => {
            switch (block.type) {
                case 'title':
                    titleCount += 1
                    return <Title key={index} text={block.text} hrefId={titleCount} />
                case 'text':
                    return <Text key={index} text={block.text} />
                case 'img':
                    return <Image key={index} src={block.src} />
                case 'indent':
                    return <Indent key={index} />
                case 'ol':
                    return <NumberedList key={index} list={block.list} />
                case 'ul':
                    return <BulletedList key={index} list={block.list} />
                default:
                    return
            }
        })
    }
    
    return (
        <div className={style.main_article}>
            <div className={style.main_article_content}>    
                <div className={style.main_article_content_info}>
                    <h2>{props.article.title}</h2>
                    <p>{props.article.description}</p>
                    <img src={props.article.banner} />
                </div>
                <div className={style.article_content}> 
                    <div className={style.content}>
                        {objectLength > 0 && (
                            renderedArticles
                        )}
                        {objectLength == 0 && (
                            <Preloader />
                        )}
                    </div>
                </div>
            </div>
            <div>
                <div className={style.article_info_nav}>
                    <div className={style.article_info_nav_title}>
                        <b>Содержание статьи</b>
                    </div>
                    <div className={style.article_info_nav_body}>
                        {objectLength > 0 && (
                            props.article.content.filter(e => e.type === 'title').map((e, i) => (
                                <li key={i}><a href={`#${i + 1}`}>{e.text}</a></li>
                            ))
                        )}
                        {objectLength == 0 && (
                            <Preloader />
                        )}
                        <ul>
                        </ul> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect(null)(ArticleContent)