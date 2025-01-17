import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {HiOutlineSearch} from 'react-icons/hi'
import FailureView from '../FailureView'
import UserCard from '../UserCard'
import Header from '../Header'
import ProfileContext from '../../context/ProfileContext'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    errorMsg: '',
    setShowErrorMsg: false,
    userData: [],
  }

  onRetry = setSearchInput => {
    setSearchInput('')
  }

  searchClick = (setSearchInput, searchInput) => {
    if (searchInput.trim() === '') {
      this.setState({
        setShowErrorMsg: true,
        errorMsg: 'Enter the valid github username',
        apiStatus: apiStatusConstants.failure,
      })
    } else {
      setSearchInput(searchInput)
      this.setState({
        setShowErrorMsg: false,
        errorMsg: '',
      })
      this.getUserDetails(searchInput)
    }
  }

  getUserDetails = async searchInput => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiKey = process.env.REACT_APP_SECRET_KEY
    console.log(apiKey)
    console.log(searchInput)
    const userNameUrl = `https://apis2.ccbp.in/gpv/profile-details/${searchInput}?api_key=${apiKey}`
    const options = {
      method: 'GET',
    }
    try {
      const response = await fetch(userNameUrl, options)
      if (response.ok) {
        const data = await response.json()
        console.log(data)
        const updatedData = {
          id: data.id,
          avatarUrl: data.avatar_url,
          login: data.login,
          bio: data.bio,
          followers: data.followers,
          following: data.following,
          publicRepos: data.public_repos,
          company: data.company,
          location: data.location,
          name: data.name,
          organizationsUrl: data.organizations_url,
        }
        console.log(updatedData)
        this.setState({
          userData: updatedData,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch (error) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
      console.log(error)
    }
  }

  renderInitialView = () => (
    <div className="image-container">
      <h1 className="initial-heading">Github Profile Visualizer</h1>
      <img
        alt="gitHub profile visualizer home page"
        className="initial-image"
        src="https://res.cloudinary.com/daqmgqiuf/image/upload/v1724160235/zi0wfazx6svarjvriifb.png"
      />
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {userData} = this.state
    return (
      <div className="user-home-details">
        <UserCard userData={userData} />
      </div>
    )
  }

  renderFailureView = setSearchInput => (
    <FailureView onRetry={() => this.onRetry(setSearchInput)} />
  )

  renderAll = setSearchInput => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.initial:
        return this.renderInitialView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView(setSearchInput)
      default:
        return null
    }
  }

  render() {
    const {errorMsg, setShowErrorMsg} = this.state
    return (
      <ProfileContext.Consumer>
        {value => {
          const {searchInput, setSearchInput} = value

          const handleInputChange = event => {
            setSearchInput(event.target.value)
          }

          return (
            <div data-testid="Home" className="main-home-container">
              <Header />
              <div className="input-col-container">
                <div className="input-container">
                  <input
                    type="search"
                    className={setShowErrorMsg ? 'error-input' : 'normal-input'}
                    placeholder="Enter github username"
                    value={searchInput}
                    name="username"
                    onChange={handleInputChange}
                  />
                  <button
                    aria-label="searchButton"
                    data-testid="searchButton"
                    type="button"
                    className="search-button"
                    onClick={() =>
                      this.searchClick(setSearchInput, searchInput)
                    }
                  >
                    <HiOutlineSearch data-testid="Search Icon" />
                  </button>
                </div>
                {setShowErrorMsg && <p className="error-msg">*{errorMsg}</p>}
              </div>
              <div className="home-view-container">
                {this.renderAll(setSearchInput)}
              </div>
            </div>
          )
        }}
      </ProfileContext.Consumer>
    )
  }
}

export default Home
