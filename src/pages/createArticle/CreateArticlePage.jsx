import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import style from './style.module.scss'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import CreateArticleForm from './CreateArticleForm/CreateArticleForm'
import CreateArticleContent from './CreateArticleContent/CreateArticleContent'
import CreateArticlePreview from './CreateArticlePreview/CreateArticlePreview'
import { getArticleForEditing, createArticle } from '../../redux/reducers/articleReducer'


const CreateArticlePage = (props) => {    
    // Проверка на авторизированного пользователя и загрузка статьи
    const navigate = useNavigate()
    const { articleId } = useParams()
    useEffect(() => {
        if (!props.isAuth) {
            navigate('/login')
        } else {
            if (props.type === 'redactor') {
                props.getArticleForEditing(articleId, 'redactor')
            } else if (props.type === 'moder') {
                props.getArticleForEditing(articleId, 'moder')
            } else if (props.type === 'public') {
                props.getArticleForEditing(articleId, 'public')
            } else {
                props.createArticle()
            }
        }
    }, [])

    // Состояние вкладки предварительного просмотра
    const [isOpenPreview, setIsOpenPreview] = useState(false)

    return (
        <div className={style.main}>
            {!props.isAuth && (
                <Navigate to='/login' />
            )}
            <Header />
            {isOpenPreview && <CreateArticlePreview setIsOpenPreview={setIsOpenPreview} />}
            {!isOpenPreview && (
                <div className={style.createArticle_block}>
                    <h3>Создать новую статью</h3>
                    <div className={style.createArticle_block_flex}>
                        <CreateArticleForm />
                        <CreateArticleContent type={props.type} setIsOpenPreview={setIsOpenPreview} />
                    </div>
                </div>
            )}
            <Footer />
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    id: state.auth.id
})

export default connect(mapStateToProps, {getArticleForEditing, createArticle})(CreateArticlePage)