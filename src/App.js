import {Switch, Route} from 'react-router-dom'
import {Component} from 'react'
import Home from './components/Home'
import Analysis from './components/Analysis'
import Repository from './components/Repository'
// import RepositoryItem from './components/RepositoryItem'
import FailureView from './components/FailureView'

import './App.css'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/repositories" component={Repository} />
        <Route exact path="/analysis" component={Analysis} />
        <Route component={FailureView} />
      </Switch>
    )
  }
}
export default App
