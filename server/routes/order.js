const express = require("express")
const {createOrder, deleteOrder, getMonthlyIncome, getOrders, getUserOrders, updateOrder} = require("../controllers/order.js")
const {verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization} = require("../middlewares/verifyToken.js")

console.log("Loading Order routes")

const router = express.Router()

// POST => /api/orders
router.post('/', verifyToken, createOrder)
// PATCH => /api/orders/:id
router.patch('/:id', verifyTokenAndAdmin, updateOrder)
// DELETE => /api/orders/:id
router.delete('/:id', verifyTokenAndAdmin, deleteOrder)
// GET => /api/orders/:userId
router.get('/:userId', verifyTokenAndAuthorization, getUserOrders)
// GET => /api/orders
router.get('/', verifyTokenAndAdmin, getOrders)
// GET => /api/orders/stats
router.get('/stats', verifyTokenAndAdmin, getMonthlyIncome)

module.exports = router
