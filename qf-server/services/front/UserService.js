const UserModel = require("../../models/UserModel")

/*
 * @作者: kerwin
 * @公众号: 大前端私房菜
 */
const UserService = {
  login: async ({
    username,
    password
  }) => {
    return UserModel.find({
      username,
      password
    })
  },

  upload: async ({
    _id,
    username,
    introduction,
    gender,
    avatar
  }) => {
    if (avatar) {
      return UserModel.updateOne({
        _id
      }, {
        username,
        introduction,
        gender,
        avatar
      })
    } else {
      return UserModel.updateOne({
        _id
      }, {
        username,
        introduction,
        gender,
      })
    }

  },
  add: async ({
    username,
    password,
    introduction,
    gender,
    avatar,
    role,
  }) => {
    return UserModel.create({
      username,
      password,
      introduction,
      gender,
      avatar,
      role,
    })
  },
  getList: async ({
    id
  }) => {
    return id ? UserModel.find({
      _id: id
    }, ["username", "password", "role", "introduction"]) : UserModel.find({}, ["username", "gender", "role", "avatar", "introduction"])
  },
  delList: async ({
    _id
  }) => {
    return UserModel.deleteOne({
      _id
    })
  },
  putList: async (body) => {
    return UserModel.updateOne({
      _id: body._id
    }, body)
  }
}

module.exports = UserService