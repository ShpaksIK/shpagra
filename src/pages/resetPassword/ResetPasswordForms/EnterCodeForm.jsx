import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import style from '../style.module.scss'


const EnterCodeForm = (props) => {
    const EnterCodeFormSchema = Yup.object().shape({
        code: Yup.number()
            .typeError('Код должен состоять из цифр')
            .required('Обязательное поле')
            .positive('Код должен быть положительным числом')
            .integer('Код должен быть целым числом')
            .min(100000, 'Длина кода - 6 цифр')
            .max(999999, 'Длина кода - 6 цифр')
    })

    const confirmCode = (code) => {
        // Отправка введенного кода на сервер и проверка
        // props.sendConfirmCode(code)
        // ...
        const authCodeAnswer = true
        if (authCodeAnswer) {
            props.setStep(3)
            props.setSuccess(true)
        }
    }

    return (
        <Formik
            initialValues={{
                code: ''
            }}
            validationSchema={EnterCodeFormSchema}
            onSubmit={ (values) => {
                confirmCode(values.code)
            }}
        >
            {() => (
                <Form className={style.reg_box}>
                    <div>
                        <div className={style.input_block}>
                            <p>Код из почты</p>
                            <Field className={style.input} maxLength={6} name='code' />
                            <ErrorMessage name='code' component='div' className={style.error} />
                            <p className={style.p_before_input}>На указанную почту придет письмо с новым паролем для входа в аккаунт. Обязательно поменяйте этот пароль на новый!</p>
                        </div>
                        <button className={style.button} type='submit'>Подтвердить</button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default EnterCodeForm