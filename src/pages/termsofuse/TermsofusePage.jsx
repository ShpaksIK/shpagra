import React from 'react'

import style from './style.module.scss'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'


const TermsofusePage = () => {
    return (
        <div className={style.termsofuse}>
            <Header />
            
            <div className={style.termsofuse_block}>
                <h2>Условия использования</h2>
                <h3>1. Термины, используемые в настоящих Правилах</h3>
                <h3>2. Статус Правил пользования Сайтом Shpagra</h3>
                <h3>3. Статус Сайта Shpagra</h3>
                <h3>4. Администрация Сайта Shpagra</h3>
                <h3>5. Регистрация на Сайте Shpagra и статус Пользователя</h3>
                <h3>6. Обязанности Пользователя Shpagra</h3>
                <h3>7. Условия об интеллектуальных правах</h3>
                <h3>8. Функционирование Сайта Shpagra и ответственность при его использовании</h3>
                <h3>9. Заключительные положения</h3>
                <div>Редакция от 19 февраля 2025 года</div>
            </div>

            <Footer />
        </div>
    )
}

export default TermsofusePage