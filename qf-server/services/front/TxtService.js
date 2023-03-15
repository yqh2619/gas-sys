const TxtModel = require("../../models/TxtModel")

/*
 * @作者: kerwin
 * @公众号: 大前端私房菜
 */
const TxtService = {

  add: async ({
    title,
    content,
    category, //1最新动态、2典型案例、3通知公告
    cover,
    editTime,
    isPublish,
  }) => {
    // console.log("数据库模型处理");
    return TxtModel.create({
      title,
      content,
      category, //1最新动态、2典型案例、3通知公告
      cover,
      editTime,
      isPublish,
    })
  },
  updateList: async ({
    _id,
    title,
    content,
    category, //1最新动态、2典型案例、3通知公告
    cover,
    editTime,
    isPublish,
  }) => {
    // console.log("数据库模型处理");
    if (cover) {
      return TxtModel.updateOne({
        _id
      }, {
        title,
        content,
        category, //1最新动态、2典型案例、3通知公告
        cover,
        editTime,
        isPublish,
      })
    } else {
      return TxtModel.updateOne({
        _id
      }, {
        title,
        content,
        category, //1最新动态、2典型案例、3通知公告
        editTime,
        isPublish,
      })
    }
  },
  getList: async ({
    _id
  }) => {
    return _id ? TxtModel.find({
      _id
    }) : TxtModel.find({})
  },
  publish: async ({
    _id,
    isPublish,
    editTime
  }) => {
    return TxtModel.updateOne({
      _id
    }, {
      isPublish,
      editTime,
    })
  },
  delList: async ({
    _id
  }) => {
    return TxtModel.deleteOne({
      _id
    })
  },
}

module.exports = TxtService