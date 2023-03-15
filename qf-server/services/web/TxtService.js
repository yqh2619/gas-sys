const TxtModel = require('../../models/TxtModel');

/*
 * @作者: kerwin
 * @公众号: 大前端私房菜
 */
const TxtService = {
	getList: async ({ _id }) => {
		return _id
			? TxtModel.find({
					_id,
					isPublish: 1,
			  })
			: TxtModel.find({ isPublish: 1 }).sort({ editTime: -1 });
	},
	getTopList: async ({ limit }) => {
		return TxtModel.find({ isPublish: 1 })
			.sort({ editTime: -1 })
			.limit(limit);
	},
};

module.exports = TxtService;
