"use strict";

const { validate } = use("Validator");
const User = use("App/Models/User");
const Logger = use("Logger");
const Hash = use('Hash')

class UserController {
  async login({ auth, request, response }) {
    const { email, password } = request.all();
    const user = await User.findBy("email", email);
    const verifyPass = await Hash.verify(password, user.password)
    if (user && verifyPass) {
      const token = await auth.generate(user);
      Logger.info("token %s", token);
      return response.json(token);
    } else {
      return response.json({ message: "Invalid email or password" });
    }
  }


  async currentUser({ auth,response }) {
    try {
      return await auth.getUser()
    } catch (error) {
      response.send('Missing or invalid jwt token')
    }
  }

  async getAll({ request, response }) {
    let users = await User.all();
    return response.json(users);
  }
  async addUser({ request, response }) {
    const rules = {
      email: "required|email|unique:users,email",
      password: "required",
    };

    const validation = await validate(request.all(), rules);

    if (validation.fails()) {
      return response.json({
        message: "One of the inputs doesn't respect the required rules",
      });
    } else {
      const user = new User();
      user.email = request.input("email");
      user.username = request.input("username");
      user.password = request.input("password");
      await user.save();
      return response.json(user);
    }
  }
  async updateUser({ request, response }) {
    //
  }
  async deleteUser({ request, response }) {
    //
  }
}

module.exports = UserController;
