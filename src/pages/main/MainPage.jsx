import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import style from './style.module.scss'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Search from '../../components/Search/Search'
import Article from '../../components/Article/Article'
import FilterArticles from '../../components/FilterArticles/FilterArticles'
import FilterPosts from '../../components/FilterPosts/FilterPosts'
import Post from '../../components/Post/Post'
import Error from './../../components/Error/Error'
import Preloader from '../../components/Preloader/Preloader'
import { getMainArticles } from '../../redux/reducers/articleReducer'
import { getMainPosts } from '../../redux/reducers/postReducer'


const MainPage = (props) => {
    useEffect(() => {
        props.getMainArticles(props.id)
        props.getMainPosts(props.id)
    }, [])

    let articlesElements, postsElements
    let articlesElementsIsLoad = false, postsElementsIsLoad = false

    if (props.articles) {
        if (props.articles.length > 0) {
            articlesElementsIsLoad = true
        }
        articlesElements = props.articles.map(article => <Article key={`art-${article.id}`} articleData={article} />)
    }
    if (props.posts) {
        if (props.posts.length > 0) {
            postsElementsIsLoad = true
        }
        postsElements = props.posts.map(post => <Post key={post.id} postData={post} />)
    }
    
    return (
        <div className={style.main}>
            <Header />
            
            <div className={style.intro}>
                <div className={style.right}>
                    <h1>Shpagra - ищи всё!</h1>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus neque doloremque vero quos blanditiis eveniet impedit deleniti commodi numquam ut adipisci laboriosam possimus, quasi corrupti voluptatibus. Maiores voluptas enim asperiores.</p>
                </div>
                <div className={style.left}>
                    <div className={style.left_container}>
                        <b>Найдите всё, что хотите!</b>
                        <Search />
                    </div>
                </div>
            </div>
            <div className={style.container + ' ' + style.content_title}>
                <h3>Статьи:</h3>
                <FilterArticles />
            </div>
            <div className={style.content_articles}>
                {articlesElementsIsLoad ? articlesElements : <Preloader />}
            </div>
            
            <div className={style.container + ' ' + style.content_title}>
                <h3>Посты:</h3>
                <FilterPosts />
            </div>
            <div className={style.content_posts}>
            {postsElementsIsLoad ? postsElements : <Preloader />}
            </div>

            <Footer />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        id: state.auth.id,
        articles: state.article.mainArticles,
        posts: state.post.mainPosts
    }
}

export default connect(mapStateToProps, {getMainArticles, getMainPosts})(MainPage)