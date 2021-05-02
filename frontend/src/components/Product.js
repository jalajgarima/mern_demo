import React from 'react'

import { Card, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = (props) => {
  return (
    <Card className="my-3 p-3">
      <Link to={`/product/${props.product._id}`}>
        <Card.Img
          style={{ height: '180px' }}
          variant="top"
          src={props.product.image}
        />
      </Link>

      <Card.Body>
        <Link to={`/product/${props.product._id}`}>
          <Card.Title as="div">{props.product.name}</Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating
            value={props.product.rating}
            text={props.product.numReviews}
          />
        </Card.Text>
        <Card.Text as="h4">${props.product.price}</Card.Text>
        <LinkContainer to={`/product/${props.product._id}`}>
          <Button variant="primary">Add to Cart</Button>
        </LinkContainer>
      </Card.Body>
    </Card>
  )
}

export default Product
