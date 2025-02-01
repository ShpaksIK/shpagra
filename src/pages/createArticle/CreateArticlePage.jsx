import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import style from './style.module.scss'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import CreateArticleForm from './CreateArticleForm/CreateArticleForm'
import CreateArticleContent from './CreateArticleContent'
import { getArticleForEditing } from '../../redux/reducers/articleReducer'


const CreateArticlePage = (props) => {
    // Проверка на авторизированного пользователя и загрузка статьи
    const navigate = useNavigate()
    const { articleId } = useParams()
    useEffect(() => {
        if (!props.isAuth) {
            navigate('/login')
        } else {
            if (articleId) {
                props.getArticleForEditing(articleId, props.id)
            } else {
                
            }
        }
    })

    // Состояние окна 
    const [previewWindow, setPreviewWindow] = useState(false)

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
                    <CreateArticleContent />
                </div>
            </div>
            <Footer />
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    id: state.auth.id
})

export default connect(mapStateToProps, {getArticleForEditing})(CreateArticlePage)