const Router = require('express')
const router = new Router()
const orderRouter = require('./orderRouter')
const userRouter = require('./userRouter')


router.use('/user',userRouter)
router.use('/order' ,orderRouter)

module.exports = router



