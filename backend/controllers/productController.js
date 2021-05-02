import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const products = await Product.find({ ...keyword })

  res.json(products)
})

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.send(product)
  } else {
    res.status(404)
    throw new Error('Product Not Found')
  }
})

// Admin to delete product

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.send({ message: 'Product Has Been Removed' })
  } else {
    res.status(404)
    throw new Error('Product Not Found')
  }
})

//admin create product

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample Brand',
    category: 'sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample Description',
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// Update Admin Product
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,

    image,
    brand,
    category,
    countInStock,

    description,
  } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock
    product.description = description

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product Not Found')
  }
})

//review private post
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(404)
      throw new Error('Product Already Reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating =
      product.reviews.reduce((acc, curr) => acc + curr.rating, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review Added' })
  } else {
    res.status(404)
    throw new Error('Product Not Found')
  }
})

//top product carousel
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)
  res.json(products)
})

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
}
