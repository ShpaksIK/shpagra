import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'

import style from './style.module.scss'
import likeSVG from './../../assets/svg/like.svg'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Article from '../../components/Article/Article'


const ProfileUserPage = (props) => {
    if (!props.username) {
        <Navigate to='/' />
    }
    
    return (
        <div className={style.main}>
            <Header />

            <h1>Profile User</h1>
            <p>{props.id}</p>

            <Footer />
        </div>
    )
}

const mapStateToProps = (state) => ({
    id: state.profile.id,
    username: state.profile.username,
    likes: state.profile.likes
})

export default connect(mapStateToProps)(ProfileUserPage)