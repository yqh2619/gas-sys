const TxtService = require('../../services/web/TxtService');

const TxtController = {
	getList: async (req, res) => {
		const result = await TxtService.getList({
			_id: req.params.id,
		});
		res.send({
			ActionType: 'OK',
			data: result,
		});
	},
	getTopList: async (req, res) => {
		const result = await TxtService.getTopList({
			limit: req.query.limit,
		});
		res.send({
			ActionType: 'OK',
			data: result,
		});
	},
};
module.exports = TxtController;
