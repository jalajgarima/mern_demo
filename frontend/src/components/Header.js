import React from 'react'
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import SearchBox from './SearchBox'
import './headerSpecial.css'
import { logout } from '../Redux/actions/userActions'

const Header = ({ history }) => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)

  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
    history.push('/')
  }

  return (
    <header>
      <>
        <Container fluid className="newdiv">
          <h6 className="forh6">Covid-19 Safe Trsnsaction And Delivery </h6>
        </Container>
      </>
      <Navbar
        bg="primary"
        className=""
        variant="dark"
        expand="lg"
        collapseOnSelect
      >
        <Container>
          <Link to="/">
            <Navbar.Brand>ShopLogo</Navbar.Brand>
          </Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart" /> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user" /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="admin">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users List</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products List</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders List</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}

              <LinkContainer to="/contact">
                <Nav.Link>
                  <i className="fas fa-envelope" /> Contact
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default withRouter(Header)
