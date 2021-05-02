import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { saveShippingAddress } from '../Redux/actions/cartActions'
import Fromcontainer from '../components/Fromcontainer'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingPage = (props) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postCode, setPostCode] = useState(shippingAddress.postCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postCode, country }))
    props.history.push('/payment')
  }

  return (
    <Fromcontainer>
      <CheckoutSteps step1 step2 />
      <h3>Shipping</h3>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Street Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Street Address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter City"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="postcode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Postal Code"
            value={postCode}
            required
            onChange={(e) => setPostCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Country"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </Fromcontainer>
  )
}

export default ShippingPage
