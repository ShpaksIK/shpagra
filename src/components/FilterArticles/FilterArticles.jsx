import React, { useState } from 'react'
import { connect } from 'react-redux'

import style from './style.module.scss'
import { setArticlesFilterType } from '../../redux/reducers/articleReducer'


const FilterArticles = (props) => {
    const [selectedFilter, setSelectedFilter] = useState(props.filterType)
    const handleFilterChange = (event) => {
        setSelectedFilter(event.target.value)
        props.setArticlesFilterType(event.target.value)
    }
    
    return (
        <select className={style.select} value={selectedFilter} onChange={handleFilterChange}>
            <option value='popular'>Популярные</option>
            <option value='new'>Новые</option>
            <option value='old'>Старые</option>
        </select>
    )
}

const mapStateToProps = (state) => {
    return {
        filterType: state.article.filterType
    }
}

export default connect(mapStateToProps, {setArticlesFilterType})(FilterArticles)