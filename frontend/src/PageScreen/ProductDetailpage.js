import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Button, Form } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/message'
import Loader from '../components/loader'
import Meta from '../components/Meta'

import {
  detailProduct,
  createProductReview,
} from '../Redux/actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../Redux/constants/productConstants'

const ProductDetailpage = (props) => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const productDetail = useSelector((state) => state.productDetail)
  const { error, product, loading } = productDetail

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    error: errorProductReview,
    success: successProductReview,
  } = productReviewCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (successProductReview) {
      alert('Review Submitted')
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    dispatch(detailProduct(props.match.params.id))
    // console.log(match.params.id)
  }, [dispatch, props.match.params.id, successProductReview])

  //console.log(props)

  // const history = useHistory()

  const addToCartHandler = () => {
    props.history.push(`/cart/${props.match.params.id}?qty=${qty}`)
    // console.log(props.match.params.id)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReview(props.match.params.id, { rating, comment }))
  }

  return (
    <>
      <LinkContainer to="/">
        <Button className="my-3" variant="light">
          Back
        </Button>
      </LinkContainer>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h4>{product.name}</h4>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating value={product.rating} text={product.numReviews} />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <ListGroup>
                <ListGroup.Item>
                  Stock:{' '}
                  {product.countInStock > 0 ? (
                    <strong style={{ color: 'green' }}>In Stock</strong>
                  ) : (
                    <strong style={{ color: 'red' }}>Not In Stock</strong>
                  )}
                </ListGroup.Item>
                {product.countInStock > 0 ? (
                  <ListGroup.Item>
                    Qty:
                    <Form.Control
                      as="select"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => {
                        return (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        )
                      })}
                    </Form.Control>
                  </ListGroup.Item>
                ) : null}

                <ListGroup.Item>
                  <Button
                    variant="primary"
                    block
                    disabled={product.countInStock > 0 ? false : true}
                    onClick={addToCartHandler}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h3>Write a Review</h3>
                  {errorProductReview && (
                    <Message variant="danger">{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 -Poor</option>
                          <option value="2">2 -Fair</option>
                          <option value="3">3 -Good</option>
                          <option value="4">4 -Very Good</option>
                          <option value="5">5 -Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">Sign In</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductDetailpage
