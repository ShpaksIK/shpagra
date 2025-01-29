import React, { useState } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import style from './style.module.scss'
import Preloader from './../../components/Preloader/Preloader'
import Title from './articleComponents/Title'
import Text from './articleComponents/Text'
import Image from './articleComponents/Image'
import Indent from './articleComponents/Indent'
import NumberedList from './articleComponents/NumberedList'
import BulletedList from './articleComponents/BulletedList'
import Comments from '../../components/Comments/Comments'
import { likeArticle } from '../../redux/reducers/articleReducer'
import likeSVG from './../../assets/svg/like.svg'


const ArticleContent = (props) => {
    // Если объект статьи пустой, то показываем Preloader
    const objectLength = Object.keys(props.article).length
    if (objectLength < 2) {
        return <Preloader />
    }

    // Состояния блоков статьи
    const scopesElements = props.article.scopes.map((scop) => <div key={scop}>{scop}</div>)
    const [isLike, setIsLike] = useState(props.article.likes_id.filter(id => id === props.id).length === 1 ? true : false)
    const [likeCount, setLikeCount] = useState(props.article.likes_count)

    // Лайк статьи
    const likeArticle = (profileId, articleId) => {
        if (props.isAuth) {
            if (isLike) {
                setLikeCount(likeCount - 1)
            } else {
                setLikeCount(likeCount + 1)
            }
            setIsLike(!isLike)
            props.likeArticle(profileId, articleId, props.id)
        }
    }

    // Рендеринг элементов статьи
    let renderedArticles
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
    
    return (
        <div className={style.main_article}>
            <div className={style.main_article_content}>    
                <div className={style.main_article_content_info}>
                    <div className={style.main_article_content_info_title}>
                        <h2>{props.article.title}</h2>
                        <p>{props.article.created_at}</p>
                    </div>
                    <div className={style.scopes}>{scopesElements}</div>
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
                <div className={style.article_footer}>
                    <div className={classNames(
                            style.article_footer_block, 
                            {[`${style.article_footer_block_like}`]: isLike}
                        )} 
                        onClick={() => likeArticle(props.article.author_id, props.article.id)}>
                            <img src={likeSVG} />
                            <p>{likeCount}</p>
                    </div>
                </div>
                <div className={style.comments_block}>
                    <Comments sendType='article' objectId={props.article.id} commentsData={props.article.comments_data} commentsId={props.article.comments_id} authorId={props.article.author_id} objectType='view' />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        id: state.auth.id,
        article: state.article.fullArticleContent
    }
}

export default connect(mapStateToProps, {likeArticle})(ArticleContent)