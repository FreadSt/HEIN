const express = require("express")
const {addProduct, deleteProduct, getProduct, getProducts, updateProduct} = require("../controllers/product.js")
const {verifyTokenAndAdmin} = require("../middlewares/verifyToken.js")

console.log("Loading Product routes")

const router = express.Router()

// POST => /api/products
router.post('/', verifyTokenAndAdmin, addProduct)
// PATCH => /api/products/:id
router.patch('/:id', verifyTokenAndAdmin, updateProduct)
// DELETE => /api/products/:id
router.delete('/:id', verifyTokenAndAdmin, deleteProduct)
// GET => /api/products/:id
router.get('/:id', getProduct)
// GET => /api/products
router.get('/', getProducts)

module.exports = router
