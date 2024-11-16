import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {HiOutlineSearch} from 'react-icons/hi'
import Header from '../Header'
import FailureView from '../FailureView'
import UserCard from '../UserCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
    errorMsg: '',
    setShowErrorMsg: false,
    userData: [],
  }

  componentDidMount() {
    const {searchInput} = this.state
    if (searchInput) {
      this.getUserDetails()
    }
  }

  handleInputChange = event => {
    this.setState({searchInput: event.target.value})
  }

  onRetry = () => {
    this.setState({searchInput: ''})
  }

  searchClick = () => {
    const {searchInput} = this.state
    if (searchInput.trim() === '') {
      this.setState({
        setShowErrorMsg: true,
        errorMsg: 'Enter the valid github username',
        apiStatus: apiStatusConstants.failure,
      })
    } else {
      this.setState({
        setShowErrorMsg: false,
        errorMsg: '',
        apiStatus: apiStatusConstants.success,
      })
      this.getUserDetails()
    }
  }

  getUserDetails = async () => {
    const {searchInput} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiKey = process.env.REACT_APP_SECRET_KEY
    const userNameUrl = `https://apis2.ccbp.in/gpv/profile-details/${searchInput}?api_key=${apiKey}`
    const options = {
      method: 'GET',
    }
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
        userData: data,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderInitialView = () => (
    <div>
      <div className="image-container">
        <h1 className="initial-heading">Github Profile Visualizer</h1>
        <img
          alt="github profile visualizer home page"
          className="initial-image"
          src="https://res.cloudinary.com/daqmgqiuf/image/upload/v1724160235/zi0wfazx6svarjvriifb.png"
        />
      </div>
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
        <UserCard key={userData.id} userData={userData} />
      </div>
    )
  }

  renderFailureView = () => <FailureView onRetry={this.onRetry} />

  renderAll = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.initial:
        return this.renderInitialView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {searchInput, errorMsg, setShowErrorMsg} = this.state
    return (
      <div className="main-home-container">
        <Header />
        <div className="input-col-container">
          <div className="input-container">
            <input
              className={setShowErrorMsg ? 'error-input' : 'normal-input'}
              placeholder="Enter github username"
              type="search"
              value={searchInput}
              name="username"
              onChange={this.handleInputChange}
            />
            <button
              aria-label="searchButton"
              data-testid="searchButton"
              type="button"
              className="search-button"
              onClick={this.searchClick}
            >
              <HiOutlineSearch data-testid="Search Icon" />
            </button>
          </div>
          {setShowErrorMsg && <p className="error-msg">*{errorMsg}</p>}
        </div>
        <div className="home-view-container">{this.renderAll()}</div>
      </div>
    )
  }
}

export default Home
