// handsOfLabe clase 5
const fs = require('node:fs')
const crypto = require('node:crypto')

const path = './files/Users.json'

class UserManager {
  users = [];

  async createUser(user) {
    const salt = crypto.randomBytes(128).toString('base64')

    const newUser = {
      name: user.name,
      lastname: user.lastname,
      username: user.username,
      password: crypto
        .createHmac('sha256', salt)
        .update(user.password)
        .digest('hex'),
      salt: salt,
    }

    this.users.push(newUser)

    await fs.promises.mkdir('./files', {recursive:true})
    await fs.promises.writeFile(path, JSON.stringify(this.users, null, '\t'))

  }
  validateUser() {

  }
}

module.exports = UserManager