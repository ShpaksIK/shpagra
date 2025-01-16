import React from 'react'
import { connect } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { TextareaAutosize } from '@mui/material'
import * as Yup from 'yup'

import style from '../style.module.scss'
import { sendPost } from '../../../redux/reducers/postReducer'


const CreatePostForm = (props) => {
    const CreatePostSchema = Yup.object().shape({
        text: Yup.string().min(1, 'Мин. длина поста - 1 символ').max(1000, 'Макс. длина поста - 1000 символов').required('Обязательное поле'),
    })

    const submitForm = (text) => {
        props.sendPost(text, props.id)
    }

    return (
        <Formik
            className={style.post}
            initialValues={{
                text: ''
            }}
            validationSchema={CreatePostSchema}
            onSubmit={(values, { resetForm }) => {
                submitForm(values.text)
                resetForm()
            }}
        >
            <Form className={style.post_form}>
                <Field className={style.textarea} name='text' as={TextareaAutosize} placeholder='Поделитесь новостью' />
                <ErrorMessage name='text' component='div' className={style.error} />
                <button className={style.button} type='submit'>Создать пост</button>
            </Form>
        </Formik>
    )
}

const mapStateToProps = (state) => ({
    id: state.auth.id
}) 

export default connect(mapStateToProps, {sendPost})(CreatePostForm)
