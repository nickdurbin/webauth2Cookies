const express = require("express")
const Users = require("./user-model")
const { restricted } = require('../../middleware/validation/restricted')
const router = express.Router()

router.get("/", restricted, async (req, res, next) => {
  try {
    const users = await Users.find()
    
    res.json(users)
  } catch (err) {
    next(err)
  }
})

module.exports = router;