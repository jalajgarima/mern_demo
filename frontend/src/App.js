import React from 'react'

import { Container } from 'react-bootstrap'
import Homepage from './PageScreen/Homepage'
import ProductDetailpage from './PageScreen/ProductDetailpage'
import Cart from './PageScreen/Cart'
import Header from './components/Header'
import Footer from './components/Footer'
import LoginPage from './PageScreen/LoginPage'
import RegisterPage from './PageScreen/RegisterPage'
import ProfilePage from './PageScreen/ProfilePage'
import ShippingPage from './PageScreen/ShippingPage'
import PaymentPage from './PageScreen/PaymentPage'
import PlaceOrderPage from './PageScreen/PlaceOrderPage'
import OrderPage from './PageScreen/OrderPage'
import UserListPage from './PageScreen/UserListPage'
import UserEditPage from './PageScreen/UserEditPage'
import ProductListPage from './PageScreen/ProductListPage'
import ProductEditPage from './PageScreen/ProductEditPage'
import OrderListPage from './PageScreen/OrderListPage'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import './App.css'

const App = () => {
  return (
    <Router>
      <Header />

      <Container>
        <main>
          <Route path="/login" to component={LoginPage} />
          <Route path="/register" to component={RegisterPage} />
          <Route path="/profile" to component={ProfilePage} />
          <Route path="/shipping" to component={ShippingPage} />
          <Route path="/placeorder" to component={PlaceOrderPage} />
          <Route path="/order/:id" to component={OrderPage} />
          <Route path="/payment" to component={PaymentPage} />
          <Route path="/product/:id" to component={ProductDetailpage} />
          <Route path="/cart/:id?" to component={Cart} />
          <Route path="/admin/userlist" to component={UserListPage} />
          <Route path="/admin/user/:id/edit" to component={UserEditPage} />
          <Route path="/admin/productlist" to component={ProductListPage} />
          <Route
            path="/admin/product/:id/edit"
            to
            component={ProductEditPage}
          />
          <Route path="/admin/orderlist" to component={OrderListPage} />
          <Route path="/search/:keyword" to component={Homepage} />
          <Route path="/" to component={Homepage} exact />
        </main>
      </Container>

      <Footer />
    </Router>
  )
}

export default App
