import Header from '../Header'
import './index.css'

const FailureView = props => {
  const {onRetry} = props

  const onClickRetry = () => {
    onRetry()
    console.log('retry button clicked')
  }

  return (
    <>
      <Header />
      <div className="failure-container">
        <h1 className="failure-head">Github Profile Visualizer</h1>
        <img
          src="https://res.cloudinary.com/daqmgqiuf/image/upload/v1724163901/pyvtad0nzltfzuphksw7.png"
          alt="failure view"
          className="failure-view-image"
        />
        <h1 className="failure-head">Something went wrong. Please try again</h1>
        <button className="failure-button" type="button" onClick={onClickRetry}>
          Try again
        </button>
      </div>
    </>
  )
}

export default FailureView
