const router = require('express').Router()
const {Product, User} = require('../db/models')
module.exports = router

//route is /api/search

router.get('/:type/:query', async (req, res, next) => {
  try {
    switch (req.params.type) {
      case 'product':
        const products = await Product.findAll({
          where: {name: req.params.query}
        })
        res.status(200).send(products)
        break
      case 'category':
        const category = await Product.findAll({
          where: {categoryId: req.params.query}
        })
        res.status(200).send(category)
        break
      case 'user':
        const user = await User.findOne({where: {id: req.params.query}})
        res.status(200).send([user])
        break
      default:
        res.status(404)
    }
  } catch (err) {
    console.log(err)
  }
})
