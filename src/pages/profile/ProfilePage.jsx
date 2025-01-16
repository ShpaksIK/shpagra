import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import style from './style.module.scss'
import emailSVG from './../../assets/svg/email.svg'
import likeSVG from './../../assets/svg/like.svg'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Article from '../../components/Article/Article'
import Post from '../../components/Post/Post'
import CreatePostForm from './CreatePostForm/CreatePostForm'
import { getProfileArticles } from '../../redux/reducers/articleReducer'
import { getProfilePosts } from '../../redux/reducers/postReducer'
import Preloader from '../../components/Preloader/Preloader'


const ProfilePage = (props) => {
    useEffect(() => {
        props.getProfileArticles(props.id)
        props.getProfilePosts(props.id)
    }, [])
    
    let profileArticlesElements, profilePostsElements
    let articlesElementsIsLoad = false, postsElementsIsLoad = false

    if (props.articles) {
        if (props.articles.length > 0) {
            articlesElementsIsLoad = true
        }
        profileArticlesElements = props.articles.map(article => <Article key={`art-${article.id}`} className={style.article} articleData={article} objectType='profile' />)
    }
    if (props.posts) {
        if (props.posts.length > 0) {
            postsElementsIsLoad = true
        }
        profilePostsElements = props.posts.map(post => <div key={post.id} className={style.post}><Post postData={post} objectType='profile' /></div>)
    }

    return (
        <div className={style.main}>
            <Header />

            {props.isAuth && (
                <div className={style.blocks}>
                    <div className={style.left_blocks}>
                        <div className={style.block1}>
                            <div className={style.info_title}>
                                <img src='https://zornet.ru/_fr/19/0640572.png' />
                                <b>{props.username}</b>
                            </div>
                            <div className={style.info_body}>
                                <div className={style.info_body_block}>
                                    <div className={style.info_body_block_img}>
                                        <img src={emailSVG} />
                                    </div>
                                    <p><b>E-mail:</b> {props.email}</p>
                                </div>
                                <div className={style.info_body_block}>
                                    <div className={style.info_body_block_img}>
                                        <img src={likeSVG} />
                                    </div>
                                    <p><b>Лайки профиля:</b> {props.likes}</p>
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
                                    <Link to='/create-article' className={style.button}>Создать статью</Link>
                                </div>
                                <div className={style.info_body_block}>
                                    <label><b>Загрузить фото профиля:</b></label>
                                    <input type='file' />
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
                                {articlesElementsIsLoad ? <>
                                    {profileArticlesElements.length > 0 && (
                                        profileArticlesElements
                                    )}
                                    {profileArticlesElements.length === 0 && (
                                        <div className={style.content_body_error}>
                                            <b>Вы ещё ничего не добавили</b>
                                            <Link to='/create-article' className={style.button}>Создать статью</Link>
                                        </div>
                                    )}
                                </> : <Preloader />}
                            </div>
                        </div>
                        <div className={style.content_block}>
                            <div className={style.content_title}>
                                <b>Мои посты</b>
                            </div>
                            <div className={style.content_body}>
                                {postsElementsIsLoad ? <>
                                    {profilePostsElements.length > 0 && (
                                        profilePostsElements
                                    )}
                                    {profilePostsElements.length === 0 && (
                                        <div className={style.content_body_error}>
                                            <b>У вас нет постов!</b>
                                            <CreatePostForm />
                                        </div>
                                    )}
                                </> : <Preloader />}
                                
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
    email: state.auth.email,
    likes: state.auth.likes,
    articles: state.article.profileArticles,
    posts: state.post.profilePosts
})

export default connect(mapStateToProps, {getProfileArticles, getProfilePosts})(ProfilePage)