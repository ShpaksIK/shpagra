import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import style from '../style.module.scss'


const EnterEmailForm = (props) => {
    const EnterEmailFormSchema = Yup.object().shape({
        email: Yup.string().email('Неверный email').required('Обязательное поле'),
    })

    const sendAuthCode = (email) => {
        // Отправка на email кода с подтверждением
        // ...
        props.setStep(2)
    }

    return (
        <Formik
            initialValues={{
                email: ''
            }}
            validationSchema={EnterEmailFormSchema}
            onSubmit={ (values) => {
                sendAuthCode(values.email)
            }}
        >
            {() => (
                <Form className={style.reg_box}>
                    <div>
                        <div className={style.input_block}>
                            <p>Почта</p>
                            <Field className={style.input} name='email' />
                            <ErrorMessage name='email' component='div' className={style.error} />
                            <p className={style.p_before_input}>На указанную почту придет письмо с кодом из 6-ти цифр для входа в аккаунт.</p>
                        </div>
                        <button className={style.button} type='submit'>Отправить код</button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default EnterEmailForm