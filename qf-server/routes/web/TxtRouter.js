const TxtController = require('../../controllers/web/TxtController');
var express = require('express');
var TxtRouter = express.Router();

// //实现用户列表的增删改查
TxtRouter.get('/webapi/txts/list', TxtController.getList);
TxtRouter.get('/webapi/txts/list/:id', TxtController.getList);
TxtRouter.get('/webapi/txts/toplist', TxtController.getTopList);

module.exports = TxtRouter;

// mongod --dbpath "D:\Developtools\MongoDB\Server4.2.15\data" --logpath "D:\Developtools\MongoDB\Server4.2.15\log\mongodb.log" --install --serviceName "MongoDB"

// mongod.exe --dbpath "D:\Application\Mongodb\data\db" --logpath "D:\Application\Mongodb\log\mongodb.log"  --serviceName "mongo" --logappend --directoryperdb --install
