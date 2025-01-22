import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import style from './style.module.scss'
import { getArticleComments, getPostComments } from '../../redux/reducers/commentReducer'
import { setCommentsFilterTypeAC } from '../../redux/reducers/appReducer.js'
import Comment from './Comment/Comment'
import Preloader from '../Preloader/Preloader'
import CommentsForm from './CommentsForm/CommentsForm'


const Comments = (props) => {
    useEffect(() => {
        if (props.sendType === 'post') {
            props.getPostComments(props.commentsId, props.objectId, props.objectType ? 'profile' : 'main')
        } else {
            props.getArticleComments(props.commentsId, props.objectId, props.objectType ? 'profile' : 'main')
        }
    }, [])

    const [selectedFilter, setSelectedFilter] = useState(props.commentsFilterType)
    const handleFilterChange = (event) => {
        setSelectedFilter(event.target.value)
        props.setCommentsFilterTypeAC(event.target.value)
    }

    let newComments, oldComments, popularComments
    if (props.commentsData) {
        newComments = props.commentsData.slice().sort((a, b) => b.id - a.id)
        oldComments = newComments.reverse()
        popularComments = props.commentsData.slice().sort((a, b) => b.likes_count - a.likes_count)
    }

    return (
        <div className={style.comments}>
            {props.commentsData && (
                <>
                    {props.commentsData.length === 0 && (
                        <div className={style.comments_none}>
                            <p>Комментариев нет. Прокомментируйте первым!</p>
                        </div>
                    )}
                    {props.commentsData.length > 0 && (
                        <>
                            <select className={style.comments_filter} value={selectedFilter} onChange={handleFilterChange}>
                                <option value='popular'>Популярные</option>
                                <option value='new'>Новые</option>
                                <option value='old'>Старые</option>
                            </select>
                            {selectedFilter === 'popular' && (
                                popularComments.map(com => <Comment key={`com-${com.id}`} commentData={com} />)
                            )}
                            {selectedFilter === 'new' && (
                                newComments.reverse().map(com => <Comment key={`com-${com.id}`} commentData={com} />)
                            )}
                            {selectedFilter === 'old' && (
                                oldComments.map(com => <Comment key={`com-${com.id}`} commentData={com} />)
                            )}
                        </>
                    )}
                    {props.isAuth && (
                        <CommentsForm commentsId={props.commentsId} objectId={props.objectId} authorId={props.authorId} objectType={props.objectType} sendType={props.sendType} />
                    )}
                    {!props.isAuth && (
                        <Link to='/login'><button className={style.button_insert}>Оставьте комментарий</button></Link>
                    )}
                </>
            )}
            {!props.commentsData && (
                <Preloader />
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        commentsFilterType: state.app.commentsFilterType
    }
}

export default connect(mapStateToProps, {getArticleComments, getPostComments, setCommentsFilterTypeAC})(Comments)