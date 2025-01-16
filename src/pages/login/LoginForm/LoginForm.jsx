import React from 'react'
import { Link } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

import style from '../style.module.scss'


const LoginForm = () => {
    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Неверный email').required('Обязательное поле'),
        password: Yup.string().required('Обязательное поле'),
    })

    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            validationSchema={LoginSchema}
            onSubmit={ (values) => {
                console.log(values)
            }}
        >
            {({ errors, touched }) => (
                <Form className={style.login_box}>
                    <div className={style.input_block}>
                        <p>Почта</p>
                        <Field className={style.input} name='email' />
                        {errors.email && touched.email ? (
                            <div className={style.error}>{errors.email}</div>
                        ) : null}
                    </div>
                    <div className={style.input_block}>
                        <p>Пароль</p>
                        <Field className={style.input} type='password' name='password' />
                        {errors.password && touched.password ? (
                            <div className={style.error}>{errors.password}</div>
                        ) : null}
                    </div>
                    <button className={style.button} type='submit'>Войти</button>
                    <div className={style.forgot}><Link to='/forgot-password'>Не помню пароль</Link></div>
                </Form>
            )}
        </Formik>
    )
}

export default LoginForm