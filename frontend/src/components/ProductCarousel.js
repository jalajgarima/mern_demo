import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './loader'
import Message from './message'
import { listTopProducts } from '../Redux/actions/productActions'

const ProductCarousel = () => {
  const dispatch = useDispatch()
  const productTopRated = useSelector((state) => state.productTopRated)
  const { loading, products, error } = productTopRated

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel
      pause="hover"
      className="bg-dark mt-2"
      style={{ textAlign: 'center' }}
    >
      {products.map((product) => (
        <Carousel.Item
          style={{ textAlign: 'center' }}
          key={product._id}
          interval={500}
        >
          <Link to={`/product/${product._id}`} />

          <Image
            style={{
              marginLeft: '35%',
              marginRight: '35%',
            }}
            fluid
            src={product.image}
            alt={product.name}
          />

          <Carousel.Caption className="carousel-caption">
            <h2>
              {product.name} ($ {product.price})
            </h2>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
