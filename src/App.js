import {Switch, Route} from 'react-router-dom'
import {Component} from 'react'
import Home from './components/Home'
import Analysis from './components/Analysis'
import Repository from './components/Repository'
import RepositoryItem from './components/RepositoryItem'
import NotFound from './components/NotFound'
import ProfileContext from './context/ProfileContext'
import './App.css'

class App extends Component {
  state = {
    searchInput: '',
    setSearchInput: () => {},
  }

  setSearchInput = value => {
    this.setState({searchInput: value})
  }

  render() {
    const {searchInput} = this.state
    return (
      <ProfileContext.Provider
        value={{
          searchInput,
          setSearchInput: this.setSearchInput,
        }}
      >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/repositories" component={Repository} />
          <Route
            exact
            path="/repositories/:repoName"
            component={RepositoryItem}
          />
          <Route exact path="/analysis" component={Analysis} />
          <Route component={NotFound} />
        </Switch>
      </ProfileContext.Provider>
    )
  }
}
export default App
