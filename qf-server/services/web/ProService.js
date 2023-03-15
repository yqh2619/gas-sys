const ProModel = require('../../models/ProModel');

/*
 * @作者: kerwin
 * @公众号: 大前端私房菜
 */
const ProService = {
	getList: async ({ _id }) => {
		return _id ? ProModel.find({ _id }) : ProModel.find();
	},
};

module.exports = ProService;
