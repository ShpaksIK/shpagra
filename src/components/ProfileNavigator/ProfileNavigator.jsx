import React from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import ProfilePage from '../../pages/profile/ProfilePage'
import ProfileUserPage from '../../pages/profileUser/ProfileUserPage'
import { getProfileData } from '../../redux/reducers/profileReducer'


const ProfileNavigator = (props) => {
    const { profileId } = useParams()
    props.getProfileData(profileId)
    
    if (profileId) {
        return (
            <>
                <ProfileUserPage {...props} />
            </>
        )
    }
    
    return (
        <>
            <ProfilePage />
        </>
    )
}

export default connect(null, {getProfileData})(ProfileNavigator)