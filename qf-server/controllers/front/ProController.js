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
		const page = parseInt(req.query.page) || 1;
		const page_size = parseInt(req.query.page_size) || 10;
		const result = await ProService.getList({
			_id: req.params.id,
			page,
			page_size,
		});
		const total = await ProService.total({ _id: req.params.id });
		res.send({
			ActionType: 'OK',
			data: result,
			total: total.length, // 数据总数
		});
	},
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
