const ProModel = require('../../models/ProModel');

const ProService = {
	getList: async ({ _id }) => {
		return _id ? ProModel.find({ _id }) : ProModel.find();
	},
};

module.exports = ProService;
