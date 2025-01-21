import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import style from '../style.module.scss'


const ResetPasswordForm = () => {
    const ResetPasswordFormSchema = Yup.object().shape({
        email: Yup.string().email('Неверный email').required('Обязательное поле'),
        code: Yup.string().min(6, 'Длина кода - 6 цифр').max(6, 'Длина кода - 6 цифр').required('Обязательное поле'),
    })

    const [codeBlock, setCodeBlock] = useState('email')
    
    const sendAuthCode = (email) => {
        // Отправка на email кода с подтверждением (идет запрос на сервер)
        // ...
        const emailIsValid = true
        if (emailIsValid) {
            setCodeBlock('code')
        }
    }
    const confirmCode = (code) => {
        // Отправка введенного кода на сервер
        // ...
        const authCodeAnswer = true
        if (authCodeAnswer) {
            setCodeBlock('success')
        }
    }

    return (
        <Formik
            initialValues={{
                username: '',
                email: '',
                password: ''
            }}
            validationSchema={ResetPasswordFormSchema}
            onSubmit={ (values) => {
                console.log(values)
            }}
        >
            {({ errors, touched }) => (
                <Form className={style.reg_box}>
                    {codeBlock === 'email' && (
                        <div>
                            <div className={style.input_block}>
                                <p>Почта</p>
                                <Field className={style.input} name='email' />
                                <p className={style.p_before_input}>На указанную почту придет письмо с кодом из 6-ти цифр для входа в аккаунт.</p>
                                <ErrorMessage name='email' component='div' className={style.error} />
                            </div>
                            <div className={style.button} onClick={() => {sendAuthCode()}}>Отправить код</div>
                        </div>
                    )}
                    {codeBlock === 'code' && (
                        <div>
                            <div className={style.input_block}>
                                <p>Код из почты</p>
                                <Field className={style.input} name='code' />
                                <ErrorMessage name='code' component='div' className={style.error} />
                                <p className={style.p_before_input}>На указанную почту придет письмо с новым паролем для входа в аккаунт. Обязательно поменяйте этот пароль на новый!</p>
                            </div>
                            <button className={style.button} type='submit'>Подтвердить</button>
                        </div>
                    )}
                    {codeBlock === 'success' && (
                        <div className={style.success}>
                            <b>Пароль успешно сброшен!</b>
                            <p>На вашу почту пришло письмо с новым паролем. Советуем вам поменять его, как только войдёте в аккаунт.</p>
                        </div>
                    )}
                </Form>
            )}
        </Formik>
    )
}

export default ResetPasswordForm