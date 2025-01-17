import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div data-testid="not-found" className="not-found-container">
    <img
      src="https://res.cloudinary.com/daqmgqiuf/image/upload/v1724167937/zleglbfbcz3bf97x4buu.png"
      alt="page not found"
      className="not-found-image"
    />
    <h1 className="not-found-heading">PAGE NOT FOUND</h1>
    <p className="not-found-para">
      we are sorry, the page you requested could not be found Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button type="button" className="not-found-btn">
        Go to Home
      </button>
    </Link>
  </div>
)

export default NotFound
