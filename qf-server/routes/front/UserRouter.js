const UserController = require('../../controllers/front/UserController');
var express = require('express');
var UserRouter = express.Router();
//图片上传
const multer = require('multer')
const upload = multer({
  dest: 'public/avataruploads/'
})

/* GET home page. */
UserRouter.post("/frontapi/user/login", UserController.login);
UserRouter.post("/frontapi/user/upload", upload.single('file'), UserController.upload)
UserRouter.post("/frontapi/user/add", upload.single('file'), UserController.add)
//实现用户列表的增删改查
UserRouter.get("/frontapi/user/list", UserController.getList)
UserRouter.get("/frontapi/user/list/:id", UserController.getList)
UserRouter.put("/frontapi/user/list/:id", UserController.putList)
UserRouter.delete("/frontapi/user/list/:id", UserController.delList)


module.exports = UserRouter;