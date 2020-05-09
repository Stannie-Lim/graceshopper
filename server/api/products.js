const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const products = await Product.findAll({where: {sellerId: req.params.id}})
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.post('/:id', async (req, res, next) => {
  try {
    const user = req.params.id
    const product = Product.create({...req.body, sellerId: user})
    res.json(product)
  } catch (err) {
    next(err)
  }
})
