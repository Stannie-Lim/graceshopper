const router = require('express').Router()
const {Category, Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll({include: [Product]})
    res.json(categories)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const categories = await Category.findByPk(req.params.id)
    res.json(categories)
  } catch (err) {
    next(err)
  }
})
