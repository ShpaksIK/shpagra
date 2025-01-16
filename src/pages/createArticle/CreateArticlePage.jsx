import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import style from './style.module.scss'
// import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import CreateArticleForm from './CreateArticleForm/CreateArticleForm'
import PreviewArticle from './PreviewArticle'


const CreateArticlePage = () => {

    return (
        <div className={style.main}>
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

export default compose(
    connect(mapStateToProps),
    // withAuthRedirect
)(CreateArticlePage)