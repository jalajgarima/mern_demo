import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({
  title = 'MERN Shopping Cart',
  description = 'Shopping Cart',
  keywords = 'electronics, cheap electronics',
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  )
}

export default Meta
