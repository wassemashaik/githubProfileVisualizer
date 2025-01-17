import React from 'react'

const ProfileContext = React.createContext({
  searchInput: '',
  setSearchInput: () => {},
})

export default ProfileContext
