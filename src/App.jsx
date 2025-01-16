import { Routes, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { initializeApp } from './redux/reducers/appReducer'
import MainPage from './pages/main/MainPage'
import LoginPage from './pages/login/LoginPage'
import RegistrationPage from './pages/registration/RegistrationPage'
import ResetPasswordPage from './pages/resetPassword/ResetPasswordPage'
import ProfileNavigator from './components/ProfileNavigator/ProfileNavigator'
import CreateArticlePage from './pages/createArticle/CreateArticlePage'
import ArticlePage from './pages/article/ArticlePage'
import InstructionArticlePage from './pages/instructionArticlePage/InstructionArticlePage'
import Preloader from './components/Preloader/Preloader'


const App = (props) => {
  props.initializeApp()

  if (props.initialized) {
    return (
      <>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/registration' element={<RegistrationPage />} />
          <Route path='/forgot-password' element={<ResetPasswordPage />} />
          <Route path='/profile/:profileId?' element={<ProfileNavigator />} />
          <Route path='/article/:articleId' element={<ArticlePage />} />
          <Route path='/create-article/instruction' element={<InstructionArticlePage />} exact />
          <Route path='/create-article' element={<CreateArticlePage />} exact />
          <Route path='/' element={<MainPage />} exact />
        </Routes>
      </>
    )
  } else {
    return (
      <Preloader />
    )
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {initializeApp})(App)