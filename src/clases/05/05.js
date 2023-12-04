const UserManager = require('./class/user-manager.class')

const userManager = new UserManager()

const newUser = {
  name: 'Jhon',
  lastname: 'Doe',
  username: 'jhondoe',
  password: 'doe123'
}

userManager.createUser(newUser)