import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'

import style from './style.module.scss'
import subscribeSVG from './../../assets/svg/subscribe.svg'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Article from '../../components/Article/Article'
import Post from '../../components/Post/Post'
import Preloader from '../../components/Preloader/Preloader'
import { getProfileArticles } from '../../redux/reducers/articleReducer'
import { getProfilePosts } from '../../redux/reducers/postReducer'
import { subscribe } from '../../redux/reducers/profileReducer'


const ProfileUserPage = (props) => {
    const navigate = useNavigate()

    // Состояния для изменения Preloader на надпись об отсутствии статей и постов
    const [loadArticlesBlock, setLoadArticlesBlock] = useState(<Preloader />)
    const [loadPostsBlock, setLoadPostsBlock] = useState(<Preloader />)
    
    // Тайм-ауты для показа надписи об отсутствии статей и постов после Preloader
    setTimeout(() => {
        setLoadArticlesBlock(
            <div className={style.content_body_error}>
                <b>У пользователя нет статей.</b>
            </div>
        )
    }, 5000)
    setTimeout(() => {
        setLoadPostsBlock(
            <div className={style.content_body_error}>
                <b>У пользователя нет постов.</b>
            </div>
        )
    }, 5000)
    
    // Получение статей и постов пользователя
    useEffect(() => {
        props.getProfileArticles(props.id)
        props.getProfilePosts(props.id)
    }, [])
    
    // Подписка на пользователя
    const subscribe = (toSubscribeId) => {
        if (props.isAuth) {
            props.subscribe(toSubscribeId)
        } else {
            navigate('/login')
        }
    }

    return (
        <div className={style.main}>
            <Header />

            <div className={style.blocks}>
                    <div className={style.left_blocks}>
                        <div className={style.block1}>
                            <div className={style.info_title}>
                                <img src='https://zornet.ru/_fr/19/0640572.png' />
                                <b>{props.username}</b>
                            </div>
                            <div className={style.info_body}>
                                <div className={style.info_body_block}>
                                    <div className={style.info_body_block_img} onClick={() => subscribe(props.id)}>
                                        <img src={subscribeSVG} />
                                    </div>
                                    {props.followersCount ? <p><b>Подписчиков:</b> {props.followersCount}</p> : <p>Подписчиков нет</p>}
                                </div>
                            </div>
                            {props.myId === props.id && (
                                <Link to='/profile'><button className={style.button_insert}>Редактировать</button></Link>
                            )}
                            {props.myId !== props.id && (
                                <>
                                    {!props.isFollowed && (
                                        <button className={style.button} onClick={() => subscribe(props.id)}>Подписаться</button>
                                    )} 
                                    {props.isFollowed && (
                                        <button className={style.button_insert} onClick={() => subscribe(props.id)}>Отписаться</button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    <div className={style.right_blocks}>
                        <div className={style.content_block}>
                            <div className={style.content_title}>
                                <b>Статьи</b>
                            </div>
                            <div className={style.content_body}>
                                {props.articles ? <>
                                    {props.articles.map(article => <Article key={`art-${article.id}`} className={style.article} articleData={article} objectType='profile' />)}
                                </> : loadArticlesBlock}
                            </div>
                        </div>
                        <div className={style.content_block}>
                            <div className={style.content_title}>
                                <b>Посты</b>
                            </div>
                            <div className={style.content_body}>
                                {props.posts ? <>
                                    {props.posts.map(post => <div key={post.id} className={style.post}><Post postData={post} objectType='profile' /></div>)}
                                </> : loadPostsBlock}
                            </div>
                        </div>
                    </div>
                </div>

            <Footer />
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    myId: state.auth.id,
    customId: state.profile.customId,
    username: state.profile.username,
    email: state.profile.email,
    createdAt: state.profile.createdAt,
    followersCount: state.profile.followersCount,
    isFollowed: state.profile.isFollowed,
    articles: state.article.profileArticles,
    posts: state.post.profilePosts
})

export default connect(mapStateToProps, {getProfileArticles, getProfilePosts, subscribe})(ProfileUserPage)