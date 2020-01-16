const bcrypt = require('bcryptjs')
const db = require("../../../data/db-config")

function find() {
  return db("users")
    .select("id", "username")
}

function findBy(filter) {
  return db("users")
    .where(filter)
    .select("id", "username", "password")
}

async function add(user) {
  user.password = await bcrypt.hash(user.password, 14)
  return db("users").insert(user).returning("*")
}

function findById(id) {
  return db("users")
    .where({ id })
    .first("id", "username")
}

module.exports = {
  add,
  find,
  findBy,
  findById,
}