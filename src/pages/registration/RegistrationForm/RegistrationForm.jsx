import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

import style from '../style.module.scss'


const RegistrationForm = () => {
    const RegistrationSchema = Yup.object().shape({
        username: Yup.string().min(4, 'Мин. длина имени - 4 символа').max(30, 'Макс. длина имени - 30 символов').required('Обязательное поле'),
        email: Yup.string().email('Неверный email').required('Обязательное поле'),
        password: Yup.string().min(5, 'Мин. длина пароля - 5 символов').max(40, 'Макс. длина пароля - 40 символов').required('Обязательное поле'),
    })

    return (
        <Formik
            initialValues={{
                username: '',
                email: '',
                password: ''
            }}
            validationSchema={RegistrationSchema}
            onSubmit={ (values) => {
                console.log(values)
            }}
        >
            {({ errors, touched }) => (
                <Form className={style.reg_box}>
                    <div className={style.input_block}>
                        <p>Имя пользователя</p>
                        <Field className={style.input} name='username' />
                        {errors.username && touched.username ? (
                            <div className={style.error}>{errors.username}</div>
                        ) : null}
                    </div>
                    <div className={style.input_block}>
                        <p>Почта</p>
                        <Field className={style.input} type='email' name='email' />
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
                    <button className={style.button} type='submit'>Зарегистрироваться</button>
                </Form>
            )}
        </Formik>
    )
}

export default RegistrationForm