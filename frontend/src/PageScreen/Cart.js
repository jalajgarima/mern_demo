import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Form,
  Card,
  ListGroupItem,
} from 'react-bootstrap'
import Message from '../components/message'
import { addToCart, removeFromCart } from '../Redux/actions/cartActions'

const Cart = (props) => {
  const productId = props.match.params.id

  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1

  const dispatch = useDispatch()

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, qty, productId])

  const cart = useSelector((state) => state.cart)

  const { cartItems } = cart

  const removeFromCartHandler = (id) => {
    // console.log('remove fired')
    dispatch(removeFromCart(id))
  }

  const proceedToCheckoutHandler = () => {
    //  console.log('Checkout cliked')
    props.history.push('/login?redirect=shipping')
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Empty Cart <Link to="/">To Shop</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => {
              return (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Row>
                        <>
                          <Form.Control
                            as="select"
                            value={item.qty}
                            onChange={(e) =>
                              dispatch(
                                addToCart(item.product, Number(e.target.value))
                              )
                            }
                          >
                            {[...Array(item.countInStock).keys()].map((x) => {
                              return (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            })}
                          </Form.Control>
                        </>
                      </Row>
                    </Col>
                    <Col md={2}>
                      <Button
                        variant="light"
                        type="button"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )
            })}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card className="my-3">
          <ListGroup variant="flush">
            <ListGroupItem>
              <h4 style={{ padding: '10px' }}>
                SubTotal of (
                {cartItems.reduce((acc, item) => acc + item.qty, 0)}) Items:
              </h4>
              <h2>
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </h2>
            </ListGroupItem>
            <ListGroupItem>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                variant="success"
                onClick={proceedToCheckoutHandler}
              >
                Proceed to Checkout
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default Cart
