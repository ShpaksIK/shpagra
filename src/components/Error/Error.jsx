import React from 'react'
import { connect } from 'react-redux'

import style from './style.module.scss'
import errorSVG from './../../assets/svg/error.svg'


const Error = (props) => {
    return (
        <div className={style.error_block}>
            {props.text && (
                <div className={style.error}>
                    <img src={errorSVG} />
                    <p>{props.text}</p>
                </div>
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        text: state.error.text
    }
}

export default connect(mapStateToProps)(Error)