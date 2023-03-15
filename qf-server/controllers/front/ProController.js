const ProService = require('../../services/front/ProService');
const JWT = require('../../util/JWT');
const ProController = {
	add: async (req, res) => {
		// console.log(req.body, req.file);
		const cover = req.file ? `/productuploads/${req.file.filename}` : '';
		const {
			title,
			introduction,
			detail, //1未发布，2已发布
		} = req.body;

		//调用service模块更新数据
		await ProService.add({
			title,
			introduction,
			detail,
			cover,
			editTime: new Date(),
		});
		res.send({
			ActionType: 'OK',
		});
	},
	updateList: async (req, res) => {
		// console.log(req.body, req.file);
		const cover = req.file ? `/productuploads/${req.file.filename}` : '';
		const { _id, title, introduction, detail } = req.body;

		//调用service模块更新数据
		await ProService.updateList({
			_id,
			title,
			introduction,
			detail,
			cover,
			editTime: new Date(),
		});
		res.send({
			ActionType: 'OK',
		});
	},
	getList: async (req, res) => {
		const result = await ProService.getList({
			_id: req.params.id,
		});
		res.send({
			ActionType: 'OK',
			data: result,
		});
	},
	// publish: async (req, res) => {
	// 	await ProService.publish({
	// 		...req.body,
	// 		editTime: new Date(),
	// 	});
	// 	res.send({
	// 		ActionType: 'OK',
	// 	});
	// },
	delList: async (req, res) => {
		// console.log(req._id);
		await ProService.delList({
			_id: req.params.id,
		});
		res.send({
			ActionType: 'OK',
		});
	},
};
module.exports = ProController;
