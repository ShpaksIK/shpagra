import React from 'react'
import { Link } from 'react-router-dom'

import style from './style.module.scss'
import avatarIMG from './../../assets/img/avatar.png'
import settingsSVG from './../../assets/svg/settings.svg'


const ArticleModer = (props) => {
    const scopesElements = props.articleModerData.scopes.map((scop) => <div key={scop}>{scop}</div>)
    
    return (
        <div className={style.article}>
            <div className={style.picture}>
                <Link to={`/article-creator/m/${props.articleModerData.id}`}>
                    <img src={props.articleModerData.banner} />
                </Link>
            </div>
            <div className={style.info}>
                <div className={style.author}>
                    <Link to={`/profile/${props.articleModerData.author_id}`}>
                        <div className={style.avatar}>
                            {props.articleModerData.author_avatar && <img src={URL.createObjectURL(props.articleModerData.author_avatar)} alt='Фото профиля' />}
                            {!props.articleModerData.author_avatar && <img src={avatarIMG} />}
                        </div>
                    </Link>
                    <div className={style.author_info}>
                        <div className={style.name}>
                            <Link to={`/profile/${props.articleModerData.author_id}`}><p>{props.articleModerData.author}</p></Link>
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
                        <Link to={`/article-creator/m/${props.articleModerData.id}`}>
                            <b>{props.articleModerData.title}</b>
                        </Link>
                    </div>
                    <div className={style.description}>
                        <Link to={`/article-creator/m/${props.articleModerData.id}`}>
                            <p>{props.articleModerData.description}</p>
                        </Link>
                    </div>
                </div>
                <div className={style.article_footer}>
                    <Link to={`/article-creator/m/${props.articleModerData.id}`}>
                        <div className={style.article_footer_block}>
                            <img src={settingsSVG} />
                            <p>Редактировать</p>
                        </div>
                    </Link>
                    <div className={style.article_footer_block_text}>
                        <p>Статья на проверке</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArticleModer