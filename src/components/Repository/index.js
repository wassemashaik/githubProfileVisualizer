import {Component} from 'react'
import ProfileContext from '../../context/ProfileContext'
import Header from '../Header'
import FailureView from '../FailureView'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Repository extends Component {
  state = {
    repoData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getReposDetails()
  }

  onClickBtn = () => {
    const {history} = this.props
    history.replace('/')
  }

  onClickRetry = () => {
    this.getReposDetails()
  }

  getReposDetails = async () => {
    const {searchInput} = this.props

    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiKey = process.env.REACT_APP_SECRET_KEY
    console.log(searchInput)
    const repoUrl = `https://apis2.ccbp.in/gpv/repos/${searchInput}?api_key=${apiKey}`
  }

  renderNoData = () => (
    <div className="no-data-container">
      <img
        className="no-data-img"
        alt="no repositories"
        src="https://res.cloudinary.com/daqmgqiuf/image/upload/v1724166751/fgng7lb9s38jimello3u.png"
      />
      <h1 className="no-data-head">No Repository Found!</h1>
    </div>
  )

  renderInitialView = () => (
    <div className="empty-username-container">
      <img
        className="image"
        src="https://res.cloudinary.com/daqmgqiuf/image/upload/v1724169803/hykmciclwhsvwcupjdbm.png"
        alt="empty repositories"
      />
      <h1 className="no-data-head">No Data Found</h1>
      <p className="empty-para">
        GitHub Username is empty, please provide a valid username for
        Repositories
      </p>
      <button onClick={this.onClickBtn} className="button" type="button">
        Go to Home
      </button>
    </div>
  )

  renderFailureView = setSearchInput => (
    <FailureView onRetry={() => this.onClickRetry(setSearchInput)} />
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
    return (
      <ProfileContext.Consumer>
        {value => {
          const {searchInput} = value

          return (
            <div className="repo-main-container">
              <Header />
              <div>{this.renderInitialView()}</div>
            </div>
          )
        }}
      </ProfileContext.Consumer>
    )
  }
}

export default Repository
