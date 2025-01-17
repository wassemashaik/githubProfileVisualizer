import {Component} from 'react'
import Header from '../Header'
import './index.css'

class Analysis extends Component {
  state = {
    analysisData: [],
  }

  onClickButton = () => {
    const {history} = this.props
    history.replace('/')
  }

  renderNoData = () => (
    <div className="no-data-container">
      <img
        className="no-data-img"
        alt="no analysis"
        src="https://res.cloudinary.com/daqmgqiuf/image/upload/v1724166751/fgng7lb9s38jimello3u.png"
      />
      <h1 className="no-data-head">No Analysis Found!</h1>
    </div>
  )

  renderInitialView = () => (
    <div className="empty-username-container">
      <img
        className="image"
        src="https://res.cloudinary.com/daqmgqiuf/image/upload/v1724169803/hykmciclwhsvwcupjdbm.png"
        alt="empty analysis"
      />
      <h1>No Data Found</h1>
      <p>
        GitHub Username is empty, please provide a valid username for analysis
      </p>
      <button onClick={this.onClickButton} className="button" type="button">
        Go to Home
      </button>
    </div>
  )

  render() {
    return (
      <>
        <Header />
        <div className="analysis-main-container">
          <div>{this.renderInitialView()}</div>
        </div>
      </>
    )
  }
}

export default Analysis
