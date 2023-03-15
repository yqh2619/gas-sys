const ProController = require('../../controllers/front/ProController');
var express = require('express');
var ProRouter = express.Router();
//图片上传
const multer = require('multer');
const upload = multer({
	dest: 'public/productuploads/',
});

// /* GET home page. */
ProRouter.post(
	'/frontapi/product/add',
	upload.single('file'),
	ProController.add
);
ProRouter.post(
	'/frontapi/product/list',
	upload.single('file'),
	ProController.updateList
);
// // ProRouter.post("/frontapi/Txt/add", upload.single('file'), ProController.add)
// // //实现用户列表的增删改查
ProRouter.get('/frontapi/product/list', ProController.getList);
ProRouter.get('/frontapi/product/list/:id', ProController.getList);
// ProRouter.put('/frontapi/product/publish', ProController.publish);
ProRouter.delete('/frontapi/product/list/:id', ProController.delList);

module.exports = ProRouter;
