import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import style from './style.module.scss'
import avatarIMG from './../../assets/img/avatar.png'
import emailSVG from './../../assets/svg/email.svg'
import subscribeSVG from './../../assets/svg/subscribe.svg'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Article from '../../components/Article/Article'
import Post from '../../components/Post/Post'
import CreatePostForm from './CreatePostForm/CreatePostForm'
import { getProfileArticles, clearEditingArticle } from '../../redux/reducers/articleReducer'
import { getProfilePosts } from '../../redux/reducers/postReducer'
import { setUserAvatar } from '../../redux/reducers/authReducer'
import ArticleDraft from '../../components/ArticleDraft/ArticleDraft'
import ArticleModer from '../../components/ArticleModer/ArticleModer'


const ProfilePage = (props) => {
    // Получение статей и постов пользователя
    useEffect(() => {
        props.getProfileArticles(props.id)
        props.getProfilePosts(props.id)
        props.clearEditingArticle()
    }, [])

    const handleFileChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            props.setUserAvatar(file)
        }
    }
    
    return (
        <div className={style.main}>
            <Header />

            {props.isAuth && (
                <div className={style.blocks}>
                    <div className={style.left_blocks}>
                        <div className={style.block1}>
                            <div className={style.info_title}>
                                {props.avatar && <img src={URL.createObjectURL(props.avatar)} alt='Фото профиля' />}
                                {!props.avatar &&  <img src={avatarIMG} />}
                                <b>{props.username}</b>
                            </div>
                            <div className={style.info_body}>
                                <div className={style.info_body_block}>
                                    <div className={style.image_upload}>
                                        <input
                                            type='file'
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className={style.file_input}
                                        />
                                        <span className={style.upload_text}>Нажмите, чтобы сменить аватар</span>
                                    </div>
                                </div>
                                <div className={style.info_body_block}>
                                    <div className={style.info_body_block_img}>
                                        <img src={emailSVG} />
                                    </div>
                                    <p><b>E-mail:</b> {props.email}</p>
                                </div>
                                <div className={style.info_body_block}>
                                    <div className={style.info_body_block_img}>
                                        <img src={subscribeSVG} />
                                    </div>
                                    {props.followersCount ? <p><b>Подписчиков:</b> {props.followersCount}</p> : <p>Подписчиков нет</p>}
                                </div>
                                <div className={style.info_body_block}>
                                    <Link className={style.info_body_block_a} to={`/profile/${props.id}`}>Как другие видят меня?</Link>
                                </div>
                            </div>
                        </div>

                        <div className={style.block1}>
                            <div className={style.info_title}>
                                <b>Редактировать</b>
                            </div>
                            <div className={style.info_body}>
                                <CreatePostForm />
                                <div className={style.info_body_block}>
                                    <Link to='/article-creator' className={style.button}>Создать статью</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={style.right_blocks}>
                        <div className={style.content_block}>
                            <div className={style.content_title}>
                                <b>Мои статьи</b>
                            </div>
                            <div className={style.content_body}>
                                {props.articles.length > 0 || props.moderation.length > 0 ? <>
                                    {props.moderation.length > 0 && (
                                        props.moderation.map(articleModer => <ArticleModer key={`art-moder-${articleModer.id}`} articleModerData={articleModer} />)
                                    )}
                                    {props.articles.map(article => <Article key={`art-${article.id}`} className={style.article} articleData={article} objectType='profile' />)}
                                </> :
                                <div className={style.content_body_error}>
                                    <b>Вы ещё ничего не добавили</b>
                                    <Link to='/article-creator' className={style.button}>Создать статью</Link>
                                </div>}
                            </div>
                        </div>
                        {props.draft.length > 0 && (
                            <div className={style.content_block}>
                                <div className={style.content_title}>
                                    <b>Черновик</b>
                                </div>
                                <div className={style.content_body}>
                                    {props.draft.map(articleDraft => <ArticleDraft key={`art-draft-${articleDraft.id}`} articleDraftData={articleDraft} />)}
                                </div>
                            </div>
                        )}
                        <div className={style.content_block}>
                            <div className={style.content_title}>
                                <b>Мои посты</b>
                            </div>
                            <div className={style.content_body}>
                                {props.posts.length > 0 ? <>
                                    {props.posts.map(post => <div key={post.id} className={style.post}><Post postData={post} objectType='profile' /></div>)}
                                </> : 
                                <div className={style.content_body_error}>
                                    <b>У вас нет постов!</b>
                                    <CreatePostForm />
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {props.isAuth !== true && (
                <div className={style.noLogin}>
                    <h1>Вы не авторизованы</h1>
                    <Link to='/login' className={style.link}>Войти в аккаунт</Link>
                </div>
            )}

            <Footer />
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    id: state.auth.id,
    username: state.auth.username,
    avatar: state.auth.avatar,
    email: state.auth.email,
    followersCount: state.auth.followersCount,
    articles: state.article.profileArticles,
    draft: state.article.draftArticles,
    moderation: state.article.moderationArticles,
    posts: state.post.profilePosts
})

export default connect(mapStateToProps, {getProfileArticles, getProfilePosts, clearEditingArticle, setUserAvatar})(ProfilePage)