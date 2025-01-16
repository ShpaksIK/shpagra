import React from 'react'
import { connect } from 'react-redux'

import style from './style.module.scss'


const PreviewArticle = () => {
    return (
        <div className={style.preview}>
            <div className={style.preview_title}>
                <h3>Предварительный просмотр</h3>
            </div>
            <div className={style.preview_content}>
                
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

export default connect(mapStateToProps)(PreviewArticle)