import React from 'react'
import { connect } from 'react-redux'

import style from './style.module.scss'
import textSVG from './../../assets/svg/createArticle/text.svg'
import imgSVG from './../../assets/svg/createArticle/img.svg'
import titleSVG from './../../assets/svg/createArticle/title.svg'
import listBulletSVG from './../../assets/svg/createArticle/listBullet.svg'
import listNumberSVG from './../../assets/svg/createArticle/listNumber.svg'
import marginSVG from './../../assets/svg/createArticle/margin.svg'
import quoteSVG from './../../assets/svg/createArticle/quote.svg'
import { ArticleRender } from '../../components/ArticleRender/ArticleRender'
import Preloader from '../../components/Preloader/Preloader'


const CreateArticleContent = (props) => {
    if (props.article.status_code == 403) {
        return <div className={style.createArticle_noPerm}><p>Вы не владелец данной статьи! Она принадлежит другому пользователю. Если это не так, то обратитесь в поддержку.</p></div>
    }

    if (!props.article.content) {
        return <Preloader />
    }
    
    return (
        <div className={style.content}>
            <div className={style.content_options}>
                <div className={style.content_option}>
                    <img src={titleSVG} />
                    <p>Заголовок</p>
                </div>
                <div className={style.content_option}>
                    <img src={textSVG} />
                    <p>Параграф</p>
                </div>
                <div className={style.content_option}>
                    <img src={imgSVG} />
                    <p>Изображение</p>
                </div>
                <div className={style.content_option}>
                    <img src={listBulletSVG} />
                    <p>Маркированный список</p>
                </div>
                <div className={style.content_option}>
                    <img src={listNumberSVG} />
                    <p>Нумерованный список</p>
                </div>
                <div className={style.content_option}>
                    <img src={marginSVG} />
                    <p>Отступ</p>
                </div>
                <div className={style.content_option}>
                    <img src={quoteSVG} />
                    <p>Цитата</p>
                </div>
            </div>
            <div className={style.content_content}>
                <ArticleRender content={props.article.content} />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    article: state.article.editingArticle
})

export default connect(mapStateToProps)(CreateArticleContent)