const ProModel = require('../../models/ProModel');

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
	total: async ({ _id }) => {
		return _id
			? ProModel.find({
					_id,
			  })
			: ProModel.find();
	},
	getList: async ({ _id, page, page_size }) => {
		const skip = (page - 1) * page_size; // 计算跳过的文档数量
		return ProModel.find().skip(skip).limit(page_size);
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
