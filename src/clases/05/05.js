const UserManager = require('./class/user-manager.class')

const userManager = new UserManager()

const newUser = {
  name: 'Mate',
  lastname: 'Mate',
  username: 'Mate',
  password: 'Mate'
}

userManager.createUser(newUser)