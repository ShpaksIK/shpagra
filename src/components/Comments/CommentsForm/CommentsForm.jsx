import React from 'react'
import { connect } from 'react-redux'
import { TextareaAutosize } from '@mui/material'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import style from '../style.module.scss'
import { commentArticle, commentPost } from '../../../redux/reducers/commentReducer'


const CommentsForm = (props) => {
    const CommentsSchema = Yup.object().shape({
        text: Yup.string().min(1, 'Мин. длина - 1 символ').max(1000, 'Макс. длина - 1000 символов').required('Обязательное поле'),
    })

    const submitForm = (text) => {
        if (props.sendType === 'post') {
            props.commentPost(text, props.commentsId, props.objectId, props.authorId, props.objectType)
        } else {
            props.commentArticle(text, props.commentsId, props.objectId, props.authorId, props.objectType)
        }
    }

    return (
        <Formik
            initialValues={{
                text: ''
            }}
            validationSchema={CommentsSchema}
            onSubmit={(values, { resetForm }) => {
                submitForm(values.text)
                resetForm()
            }}
        >
            <Form>
                <div className={style.comments_send}>
                    <Field name='text' as={TextareaAutosize} placeholder='Оставьте комментарий' />
                    <ErrorMessage name='text' component='div' className={style.error} />
                    <button type='submit'>Отправить</button>
                </div>
            </Form>
        </Formik>
    )
}

export default connect(null, {commentArticle, commentPost})(CommentsForm)