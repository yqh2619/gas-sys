const TxtController = require('../../controllers/front/TxtController');
var express = require('express');
var TxtRouter = express.Router();
//图片上传
const multer = require('multer')
const upload = multer({
  dest: 'public/txtsuploads/'
})

// /* GET home page. */
TxtRouter.post("/frontapi/txts/add", upload.single('file'), TxtController.add);
TxtRouter.post("/frontapi/txts/list", upload.single('file'), TxtController.updateList);

// 文章管理，查询接口
TxtRouter.post("/frontapi/article/list", TxtController.getArticleList);

// TxtRouter.post("/frontapi/Txt/add", upload.single('file'), TxtController.add)
// //实现用户列表的增删改查
TxtRouter.get("/frontapi/txts/list", TxtController.getList)
TxtRouter.get("/frontapi/txts/list/:id", TxtController.getList)
TxtRouter.put("/frontapi/txts/publish", TxtController.publish)
TxtRouter.delete("/frontapi/txts/list/:id", TxtController.delList)


module.exports = TxtRouter;