import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import style from './style.module.scss'
import bannerIMG from './../../assets/img/banner.jpg'
import avatarIMG from './../../assets/img/avatar.png'
import settingsSVG from './../../assets/svg/settings.svg'


const ArticleDraft = (props) => {
    const scopesElements = props.articleDraftData.scopes.map((scop) => <div key={scop}>{scop}</div>)
    
    return (
        <div className={style.article}>
            <div className={style.picture}>
                <Link to={`/article-creator/r/${props.articleDraftData.id}`}>
                    {props.articleDraftData.banner && <img src={URL.createObjectURL(props.articleDraftData.banner)} alt={props.articleDraftData.title} />}
                    {!props.articleDraftData.banner && <img src={bannerIMG} alt={props.articleDraftData.title} />}
                </Link>
            </div>
            <div className={style.info}>
                <div className={style.author}>
                    <Link to={`/profile/${props.articleDraftData.author_id}`}>
                        <div className={style.avatar}>
                            {props.articleDraftData.author_avatar && <img src={URL.createObjectURL(props.articleDraftData.author_avatar)} alt='Фото профиля' />}
                            {!props.articleDraftData.author_avatar && <img src={avatarIMG} />}
                        </div>
                    </Link>
                    <div className={style.author_info}>
                        <div className={style.name}>
                            <Link to={`/profile/${props.articleDraftData.author_id}`}><p>{props.articleDraftData.author}</p></Link>
                        </div>
                        <div className={style.articleLikes}>
                            <p>Не опубликовано</p>
                        </div>
                    </div>
                    <div className={style.video_info}>
                        <div className={style.scopes}>
                            {scopesElements}
                        </div>
                    </div>
                </div>
                <div>
                    <div className={style.title}>
                        <Link to={`/article-creator/r/${props.articleDraftData.id}`}>
                            <b>{props.articleDraftData.title}</b>
                        </Link>
                    </div>
                    <div className={style.description}>
                        <Link to={`/article-creator/r/${props.articleDraftData.id}`}>
                            <p>{props.articleDraftData.description}</p>
                        </Link>
                    </div>
                </div>
                <div className={style.article_footer}>
                    <Link to={`/article-creator/r/${props.articleDraftData.id}`}>
                        <div className={style.article_footer_block}>
                            <img src={settingsSVG} />
                            <p>Редактировать</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        id: state.auth.id
    }
}

export default connect(mapStateToProps)(ArticleDraft)