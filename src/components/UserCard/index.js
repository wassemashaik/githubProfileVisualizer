import {IoMdLink} from 'react-icons/io'
import {IoLocationOutline} from 'react-icons/io5'
import {RiBuildingLine} from 'react-icons/ri'
import './index.css'

const UserCard = props => {
  const {userData} = props
  const {
    id,
    avatarUrl,
    login,
    bio,
    followers,
    following,
    publicRepos,
    company,
    location,
    name,
    organizationsUrl,
  } = userData
  return (
    <div className="user-card-container" key={id}>
      <div className="user-profile-container">
        <img src={avatarUrl} alt={name} className="user-profile-image" />
        <h1 className="user-name">{name}</h1>
        <h2 className="user-username">{login}</h2>
        <p className="bio">{bio}</p>
      </div>
      <div className="follow-container">
        <div className="follower-container">
          <h1 className="follow-head">{followers}</h1>
          <p className="follow-para">FOLLOWERS</p>
        </div>
        <hr className="hr-line" />
        <div className="follower-container">
          <h1 className="follow-head">{following}</h1>
          <p className="follow-para">FOLLOWING</p>
        </div>
        <hr className="hr-line" />
        <div className="follower-container">
          <h1 className="follow-head">{publicRepos}</h1>
          <p className="follow-para">PUBLIC REPOS</p>
        </div>
      </div>
      <div className="follow-container">
        <div className="follower-container">
          <h1 className="follow-head">Company</h1>
          <p className="follow-para">
            <span>
              <RiBuildingLine />{' '}
            </span>{' '}
            {company}
          </p>
        </div>
        <div className="follower-container">
          <h1 className="follow-head">Location</h1>
          <p className="follow-para">
            <span>
              <IoLocationOutline />
            </span>
            {location}
          </p>
        </div>
      </div>
      <div className="follower-container">
        <h1 className="follow-head">Company Url</h1>
        <p className="follow-para">
          <span>
            <IoMdLink />
          </span>{' '}
          {organizationsUrl}
        </p>
      </div>
    </div>
  )
}

export default UserCard
