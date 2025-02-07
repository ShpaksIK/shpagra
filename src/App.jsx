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
import Preloader from './components/Preloader/Preloader'
import Error from './components/Error/Error'


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
          <Route path='/article-creator/p/:articleId' element={<CreateArticlePage type='public' />} />
          <Route path='/article-creator/r/:articleId' element={<CreateArticlePage type='redactor' />} />
          <Route path='/article-creator/m/:articleId' element={<CreateArticlePage type='moder' />} />
          <Route path='/article-creator' element={<CreateArticlePage />} />
          <Route path='/' element={<MainPage />} exact />
        </Routes>
        <Error />
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