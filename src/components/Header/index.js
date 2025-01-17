import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class Header extends Component {
  state = {
    isActive: false,
  }

  handleActiveBtn = () => {
    const {isActive} = this.state
    this.setState({
      isActive: !isActive,
    })
  }

  render() {
    const {isActive} = this.state
    return (
      <Navbar
        expand="lg"
        className="bg-body-tertiary header-container"
        fixed="top"
      >
        <Container className="container">
          <Navbar.Brand href="/" className="custom-link">
            GitHub Profile Visualizer
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="toggle-items">
            <Nav className="width-nav">
              <Link to="/" className="link">
                <Nav
                  className={isActive ? 'active' : 'custom-link'}
                  onClick={this.handleActiveBtn}
                >
                  Home
                </Nav>
              </Link>
              <Link className="link" to="/repositories">
                <Nav
                  onClick={this.handleActiveBtn}
                  className={isActive ? 'active' : 'custom-link'}
                >
                  Repositories
                </Nav>
              </Link>
              <Link className="link" to="/analysis">
                <Nav
                  onClick={this.handleActiveBtn}
                  className={isActive ? 'active' : 'custom-link'}
                >
                  Analysis
                </Nav>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }
}
export default Header
