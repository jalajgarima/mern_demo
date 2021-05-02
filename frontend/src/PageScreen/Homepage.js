import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { listProducts } from '../Redux/actions/productActions.js'
import Message from '../components/message'
import Loader from '../components/loader'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'

const Homepage = ({ match }) => {
  const keyword = match.params.keyword

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)

  const { loading, products, error } = productList

  useEffect(() => {
    dispatch(listProducts(keyword))
  }, [dispatch, keyword])

  return (
    <React.Fragment>
      <Meta />
      {!keyword && <ProductCarousel />}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => {
            return (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            )
          })}
        </Row>
      )}
    </React.Fragment>
  )
}

export default Homepage
