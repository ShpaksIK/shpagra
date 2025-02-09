import React, { useState } from 'react'
import { connect } from 'react-redux'

import style from '../style.module.scss'
import textSVG from '../../../assets/svg/createArticle/text.svg'
import imgSVG from '../../../assets/svg/createArticle/img.svg'
import titleSVG from '../../../assets/svg/createArticle/title.svg'
import listBulletSVG from '../../../assets/svg/createArticle/listBullet.svg'
import listNumberSVG from '../../../assets/svg/createArticle/listNumber.svg'
import marginSVG from '../../../assets/svg/createArticle/margin.svg'
import quoteSVG from '../../../assets/svg/createArticle/quote.svg'
import { ArticleRender } from '../../../components/ArticleRender/ArticleRender'
import Preloader from '../../../components/Preloader/Preloader'
import { addElementToArticle } from '../../../redux/reducers/articleReducer'
import uploadIMG from './../../../assets/img/upload.jpg'
import settingsSVG from './../../../assets/svg/settings.svg'
import ArticleSettings from '../../../components/ArticleSettings/ArticleSettings'
import { removeArticle } from '../../../redux/reducers/articleReducer'


const CreateArticleContent = (props) => {
    if (props.article.status_code == 403) {
        return <div className={style.createArticle_noPerm}><p>Вы не владелец данной статьи! Она принадлежит другому пользователю. Если это не так, то обратитесь в поддержку.</p></div>
    }

    if (!props.article.content) {
        return <Preloader />
    }

    const [isOpenSettings, setIsOpenSettings] = useState(false)

    const addElement = (element) => {
        switch(element) {
            case 'title':
                props.addElementToArticle({'type': element, 'text': 'Заголовок'})
                break
            case 'text':
                props.addElementToArticle({'type': element, 'text': 'Параграф'})
                break
            case 'img':
                props.addElementToArticle({'type': element, 'src': uploadIMG})
                break
            case 'indent':
                props.addElementToArticle({'type': element})
                break
            case 'ol':
                props.addElementToArticle({'type': element, 'list': ['Нумерованный список']})
                break
            case 'ul':
                props.addElementToArticle({'type': element, 'list': ['Маркированный список']})
                break
        }
    }
    
    return (
        <div className={style.content}>
            <div className={style.content_nav}>  
                <div className={style.content_options}>
                    <div className={style.content_option} onClick={() => addElement('title')}>
                        <img src={titleSVG} />
                        <p>Заголовок</p>
                    </div>
                    <div className={style.content_option} onClick={() => addElement('text')}>
                        <img src={textSVG}/>
                        <p>Параграф</p>
                    </div>
                    <div className={style.content_option} onClick={() => addElement('img')}>
                        <img src={imgSVG}/>
                        <p>Изображение</p>
                    </div>
                    <div className={style.content_option} onClick={() => addElement('ul')}>
                        <img src={listBulletSVG} />
                        <p>Маркированный список</p>
                    </div>
                    <div className={style.content_option} onClick={() => addElement('ol')}>
                        <img src={listNumberSVG} />
                        <p>Нумерованный список</p>
                    </div>
                    <div className={style.content_option} onClick={() => addElement('indent')}>
                        <img src={marginSVG} />
                        <p>Отступ</p>
                    </div>
                    <div className={style.content_option}>
                        <img src={quoteSVG} />
                        <p>Цитата</p>
                    </div>
                </div>
                <div className={style.content_settings}>
                    <div className={style.content_settings_settings} onClick={() => setIsOpenSettings(!isOpenSettings)}>
                        <img src={settingsSVG} />
                    </div>
                    {isOpenSettings && (
                        <ArticleSettings 
                            onSettingsClick={() => setIsOpenSettings(!isOpenSettings)} 
                            removeArticle={() => props.removeArticle(props.article.id, props.type)}
                        />
                    )}
                </div>
            </div>
            <div className={style.content_content}>
                <ArticleRender content={props.article.content} type='editing' />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    article: state.article.editingArticle
})

export default connect(mapStateToProps, {addElementToArticle, removeArticle})(CreateArticleContent)