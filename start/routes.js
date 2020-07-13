'use strict'

const Route = use('Route')

Route.post("/users/login", 'UserController.login')
Route.get("/users/me", 'UserController.currentUser')
Route.put("/users", 'UserController.updateUser')
Route.post("/users", 'UserController.addUser')
Route.delete("/users", 'UserController.deleteUser')
