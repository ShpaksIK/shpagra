import React from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import ProfilePage from '../../pages/profile/ProfilePage'
import ProfileUserPage from '../../pages/profileUser/ProfileUserPage'
import { getProfileData } from '../../redux/reducers/profileReducer'


const ProfileNavigator = (props) => {
    const { profileId } = useParams()
    
    if (profileId) {
        props.getProfileData(profileId)
        if (props.id) {
            return (
                <>
                    <ProfileUserPage {...props} id={profileId} />
                </>
            )
        }
    }
    
    return (
        <>
            <ProfilePage />
        </>
    )
}

const mapStateToProps = (state) => ({
    id: state.profile.id,
})

export default connect(mapStateToProps, {getProfileData})(ProfileNavigator)