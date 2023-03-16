const TxtService = require('../../services/front/TxtService');
const JWT = require('../../util/JWT');
const TxtController = {
  add: async (req, res) => {
    // console.log(req.body, req.file);
    const cover = req.file ? `/txtsuploads/${req.file.filename}` : '';
    const {
      title,
      content,
      category, //1最新动态、2典型案例、3通知公告
      isPublish,
    } = req.body;

    //调用service模块更新数据
    await TxtService.add({
      title,
      content,
      category: Number(category), //1最新动态、2典型案例、3通知公告
      isPublish: Number(isPublish),
      cover,
      editTime: new Date(),
    });
    res.send({
      ActionType: 'OK',
    });
  },
  updateList: async (req, res) => {
    // console.log(req.body, req.file);
    const cover = req.file ? `/txtsuploads/${req.file.filename}` : '';
    const {
      title,
      content,
      category, //1最新动态、2典型案例、3通知公告
      isPublish,
      _id
    } = req.body;

    //调用service模块更新数据
    await TxtService.updateList({
      _id,
      title,
      content,
      category: Number(category), //1最新动态、2典型案例、3通知公告
      isPublish: Number(isPublish),
      cover,
      editTime: new Date(),
    });
    res.send({
      ActionType: 'OK',
    });
  },
  getList: async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const page_size = parseInt(req.query.page_size) || 10
    const result = await TxtService.getList({
      _id: req.params.id,
      page,
      page_size
    });
    const total =  await TxtService.total({_id: req.params.id,})
    res.send({
      ActionType: 'OK',
      data: result,
      total:total.length // 数据总数
    });
  },
  publish: async (req, res) => {
    await TxtService.publish({
      ...req.body,
      editTime: new Date(),
    });
    res.send({
      ActionType: 'OK',
    });
  },
  delList: async (req, res) => {
    // console.log(req._id);
    await TxtService.delList({
      _id: req.params.id,
    });
    res.send({
      ActionType: 'OK',
    });
  },
};
module.exports = TxtController;