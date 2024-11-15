import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import {useState} from 'react'
import './index.css'

const Header = () => {
  const [isActive, setIsActive] = useState(false)

  const handleActiveBtn = () => {
    setIsActive(prevState => !prevState)
  }
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary header-container"
      fixed="top"
    >
      <Container className="container">
        <Navbar.Brand href="/" className="custom-link">
          Github Profile Visualizer
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="toggle-items">
          <Nav className="width-nav">
            <Nav.Link
              href="/"
              className={isActive ? 'active' : 'custom-link'}
              onClick={handleActiveBtn}
            >
              Home
            </Nav.Link>
            <Nav.Link className="custom-link" href="/repositories">
              Repositories
            </Nav.Link>
            <Nav.Link className="custom-link" href="/analysis">
              Analysis
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
export default Header
