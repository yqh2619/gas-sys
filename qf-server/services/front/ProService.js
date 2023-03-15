const ProModel = require('../../models/ProModel');

/*
 * @作者: kerwin
 * @公众号: 大前端私房菜
 */
const ProService = {
	add: async ({ title, introduction, detail, cover, editTime }) => {
		// console.log("数据库模型处理");
		return ProModel.create({
			title,
			introduction,
			detail,
			cover,
			editTime,
		});
	},
	updateList: async ({
		_id,
		title,
		introduction,
		detail,
		cover,
		editTime,
	}) => {
		// console.log("数据库模型处理");
		if (cover) {
			return ProModel.updateOne(
				{
					_id,
				},
				{
					title,
					introduction,
					detail,
					cover,
					editTime,
				}
			);
		} else {
			return ProModel.updateOne(
				{
					_id,
				},
				{
					title,
					introduction,
					detail,
					editTime,
				}
			);
		}
	},
	getList: async ({ _id }) => {
		return _id
			? ProModel.find({
					_id,
			  })
			: ProModel.find({});
	},
	// publish: async ({ _id, isPublish, editTime }) => {
	// 	return ProModel.updateOne(
	// 		{
	// 			_id,
	// 		},
	// 		{
	// 			isPublish,
	// 			editTime,
	// 		}
	// 	);
	// },
	delList: async ({ _id }) => {
		return ProModel.deleteOne({
			_id,
		});
	},
};

module.exports = ProService;
