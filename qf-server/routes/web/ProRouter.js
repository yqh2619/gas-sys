const ProController = require('../../controllers/web/ProController');
var express = require('express');
var ProRouter = express.Router();

// //实现用户列表的增删改查
ProRouter.get('/webapi/product/list', ProController.getList);
// ProRouter.get('/webapi/product/list/:id', ProController.getList);
// ProRouter.get('/webapi/product/toplist', ProController.getTopList);

module.exports = ProRouter;
