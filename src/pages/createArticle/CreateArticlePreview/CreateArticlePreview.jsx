import React from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import style from './style.module.scss'
import bannerIMG from './../../../assets/img/banner.jpg'
import Preloader from '../../../components/Preloader/Preloader'
import { ArticleRender } from '../../../components/ArticleRender/ArticleRender'
import { saveArticleToDraft, requestArticle } from '../../../redux/reducers/articleReducer'


const CreateArticlePreview = (props) => {
    if (props.article.status_code == 403) {
        return <div className={style.createArticle_noPerm}><p>Вы не владелец данной статьи! Она принадлежит другому пользователю. Если это не так, то обратитесь в поддержку.</p></div>
    }

    if (!props.article.content) {
        return <Preloader />
    }

    const navigator = useNavigate()
    
    const scopesElements = props.article.scopes.map((scop) => <div key={scop}>{scop}</div>)

    const saveArticleToDraft = () => {
        props.saveArticleToDraft({
            ...props.article
        })
        navigator('/profile')
    }

    const requestArticle = () => {
        props.requestArticle({
            ...props.article
        })
        navigator('/profile')
    }

    const toArticleEditor = () => {
        props.setIsOpenPreview(false)
    }

    return (
        <div className={style.preview}>
            <div className={style.preview_content}>
                <div className={style.preview_content_header}>
                    <h2>{props.article.title}</h2>
                    <p>{props.article.created_at}</p>
                </div>
                <div className={style.preview_content_scopes}>
                    {scopesElements}
                </div>
                <p>{props.article.description}</p>
                {props.article.banner && <img src={URL.createObjectURL(props.article.banner)} alt={props.article.title} />}
                {!props.article.banner && <img src={bannerIMG} alt={props.article.title} />}
                <hr />
                <ArticleRender content={props.article.content} />
            </div>
            <div className={style.preview_info}>
                <div className={style.preview_info_contentos}>
                    <div className={style.preview_info_contentos_header}>
                        <b>Содержание статьи</b>
                    </div>
                    <div className={style.preview_info_contentos_titles}>
                        <ul>
                            {props.article.content.filter(e => e.type === 'title').length > 0 && (
                                props.article.content.filter(e => e.type === 'title').map((e, i) => (
                                    <li key={i}><a href={`#${i + 1}`}>{e.text}</a></li>
                                ))
                            )}
                            {props.article.content.filter(e => e.type === 'title').length === 0 && (
                                <p>Возможно, у данной статьи нет заголовков.</p>
                            )}
                        </ul>
                    </div>
                </div>
                <div className={style.preview_info_settings}>
                    <button className={style.button_insert} onClick={requestArticle}>Запрос на публикацию</button>
                    <button className={style.button_insert} onClick={saveArticleToDraft}>Сохранить в черновики</button>
                    <button className={style.button} onClick={toArticleEditor}>В редактор</button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    article: state.article.editingArticle
})

export default connect(mapStateToProps, {saveArticleToDraft, requestArticle})(CreateArticlePreview)