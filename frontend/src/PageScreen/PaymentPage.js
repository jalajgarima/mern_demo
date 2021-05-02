import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Col } from 'react-bootstrap'
import { savePaymentMethod } from '../Redux/actions/cartActions'
import Fromcontainer from '../components/Fromcontainer'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingPage = (props) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress) {
    props.history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    props.history.push('/placeorder')
  }

  return (
    <Fromcontainer>
      <CheckoutSteps step1 step2 step3 />
      <h2>Payment Method</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>

          <Col>
            <Form.Check
              type="radio"
              id="PayPal"
              label="PayPal or Credit card"
              checked
              Name="paymentMethod"
              value="PayPal"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              type="radio"
              id="Stripe"
              label="Stripe"
              Name="paymentMethod"
              value="Stripe"
              disabled
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </Fromcontainer>
  )
}

export default ShippingPage
