import React, { useState } from 'react'
import { connect } from 'react-redux'

import style from './style.module.scss'
import { setPostsFilterTypeAC } from '../../redux/reducers/postReducer'


const FilterPosts = (props) => {
    const [selectedFilter, setSelectedFilter] = useState(props.filterType)
    const handleFilterChange = (event) => {
        setSelectedFilter(event.target.value)
        props.setPostsFilterTypeAC(event.target.value)
    }
    
    return (
        <select className={style.select} value={selectedFilter} onChange={handleFilterChange}>
            <option value='all'>Все</option>
            <option value='friends'>Друзья</option>
        </select>
    )
}

const mapStateToProps = (state) => {
    return {
        filterType: state.post.filterType
    }
}

export default connect(mapStateToProps, {setPostsFilterTypeAC})(FilterPosts)