const ProService = require('../../services/web/ProService');
// const JWT = require('../../util/JWT');
const ProController = {
	getList: async (req, res) => {
		const result = await ProService.getList({
			_id: req.params.id,
		});
		res.send({
			ActionType: 'OK',
			data: result,
		});
	},
};
module.exports = ProController;
