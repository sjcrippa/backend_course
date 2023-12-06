import UserManager from "./class/user-manager.class.js"

const userManager = new UserManager()

const users = async () => {

  const newUser = {
    name: 'Jhon',
    lastname: 'Doe',
    username: 'jhondoe',
    password: 'doe123'
  }

  userManager.createUser(newUser)
  const users = await userManager.getUsers()
  console.log(users);

  userManager.validateUser('jhondoe', 'doe123')
}

users()