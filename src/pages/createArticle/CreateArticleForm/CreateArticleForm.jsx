import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { TextareaAutosize } from '@mui/material'
import * as Yup from 'yup'

import style from '../style.module.scss'
import removeSVG from './../../../assets/svg/remove.svg'
import Preloader from '../../../components/Preloader/Preloader'
import { saveArticleToDraft } from '../../../redux/reducers/articleReducer'


const CreateArticleForm = (props) => {
    // Если статья не загрузилась из-за доступа, то ничего не рендерить
    if (props.article.status_code == 403) {
        return
    }

    // Схема ошибок формы
    const CreateArticleSchema = Yup.object().shape({
        title: Yup.string().min(1, 'Мин. длина заголовка - 1 символ').max(100, 'Макс. длина заголовка - 100 символов').required('Обязательное поле'),
        description: Yup.string().min(5, 'Мин. длина описания - 5 символов').max(2000, 'Макс. длина описания - 2000 символов').required('Обязательное поле'),
    })

    // Хранение ошибки хештега
    const [hashtagError, setHashtagError] = useState()

    // Изменение значения поля ввода хештега (input)
    const [inputValue, setInputValue] = useState('')
    const toggleSetInputValue = (value) => {
        if (value.length > 20) {
            setHashtagError('Макс. длина хештега - 20 символов')
        } else {
            setHashtagError(null)
        }
        setInputValue(value)
    }

    // Хранение, добавление и удаление хештегов
    const [hashtags, setHashtags] = useState([])
    useEffect(() => {
        if (props.article.scopes) {
            setHashtags(props.article.scopes)
        }
    }, [props.article.scopes])
    const addHashtag = () => {
        if (inputValue && !hashtags.includes(inputValue)) {
            if (inputValue.length <= 20) {
                setHashtags([...hashtags, `#${inputValue.replace(/#/g, '')}`])
                setInputValue('')
            }
        }
    }
    const delHashtag = (h) => {
        setHashtags(hashtags.filter((i) => i !== h))
    }

    // Отправка формы
    const submitForm = (values) => {
        console.log({
            ...values,
            hashtags: hashtags
        })
    }

    const saveArticleToDraft = () => {
        props.saveArticleToDraft(props.id)
    }

    return (
        <>  
            {!props.article['created_at'] && <Preloader />}
            {props.article['created_at'] && (
                <Formik
                    initialValues={{
                        title: props.article.title,
                        description: props.article.description
                    }}
                    validationSchema={CreateArticleSchema}
                    onSubmit={ (values) => {
                        submitForm(values)
                    }}
                >
                    {() => (
                        <Form className={style.create_article}>
                            <div className={style.input_block}>
                                <p>Заголовок</p>
                                <Field className={style.input} name='title' />
                                <ErrorMessage name='title' component='div' className={style.error} />
                            </div>
                            <div className={style.input_block}>
                                <p>Краткое описание</p>
                                <Field className={style.textarea} name='description' as={TextareaAutosize} />
                                <ErrorMessage name='description' component='div' className={style.error} />
                            </div>
                            <div className={style.input_block}>
                                <p>#Хештег</p>
                                <div className={style.input_flex}>
                                    <Field className={style.input_flexed} placeholder='Без #' value={inputValue} onChange={(e) => toggleSetInputValue(e.target.value)} name='hashtag' />
                                    <div className={style.hashtagAdd} onClick={addHashtag}>Добавить</div>
                                </div>
                                <div className={style.error}>{hashtagError}</div>
                                <div className={style.hashtags}>
                                    {hashtags.map((h, i) => (
                                        <div key={i} className={style.hashtag}>
                                            <p>{h}</p>
                                            <img src={removeSVG} onClick={() => {delHashtag(h)}} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={style.button_insert} onClick={saveArticleToDraft}>Сохранить в черновики</div>
                            <button className={style.button} type='submit'>Запрос на публикацию</button>
                        </Form>
                    )}
                </Formik>
            )}
        </>
    )
}

const mapStateToProps = (state) => ({
    id: state.auth.id,
    article: state.article.editingArticle
})

export default connect(mapStateToProps, {saveArticleToDraft})(CreateArticleForm)