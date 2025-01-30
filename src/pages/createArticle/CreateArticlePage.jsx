import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigate, Navigate } from 'react-router-dom'

import style from './style.module.scss'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import CreateArticleForm from './CreateArticleForm/CreateArticleForm'
import PreviewArticle from './PreviewArticle'


const CreateArticlePage = (props) => {
    const navigate = useNavigate()
    useEffect(() => {
        if (!props.isAuth) {
            navigate('/login')
        }
    })

    return (
        <div className={style.main}>
            {!props.isAuth && (
                <Navigate to='/login' />
            )}
            <Header />
            <div className={style.createArticle_block}>
                <h3>Создать новую статью</h3>
                <div className={style.createArticle_block_flex}>
                    <CreateArticleForm />
                    <PreviewArticle />
                </div>
            </div>
            <Footer />
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps)(CreateArticlePage)