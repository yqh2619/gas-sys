const TxtModel = require('../../models/TxtModel');

const TxtService = {
	add: async ({
		title,
		content,
		category, //1最新动态、2典型案例、3通知公告
		cover,
		editTime,
		isPublish,
		verify, //-2撤回， -1驳回， 0待审核 ，1初审通过，2终审通过
		verifyContent,
	}) => {
		// console.log("数据库模型处理");
		return TxtModel.create({
			title,
			content,
			category, //1最新动态、2典型案例、3通知公告
			cover,
			editTime,
			isPublish,
			verify, //-2撤回， -1驳回， 0待审核 ，1初审通过，2终审通过
			verifyContent,
		});
	},
	updateList: async ({
		_id,
		title,
		content,
		category, //1最新动态、2典型案例、3通知公告
		cover,
		editTime,
		isPublish,
		verify, //-2撤回， -1驳回， 0待审核 ，1初审通过，2终审通过
		verifyContent,
	}) => {
		// console.log("数据库模型处理");
		if (cover) {
			return TxtModel.updateOne(
				{
					_id,
				},
				{
					title,
					content,
					category, //1最新动态、2典型案例、3通知公告
					cover,
					editTime,
					isPublish,
					verify, //-2撤回， -1驳回， 0待审核 ，1初审通过，2终审通过
					verifyContent,
				}
			);
		} else {
			return TxtModel.updateOne(
				{
					_id,
				},
				{
					title,
					content,
					category, //1最新动态、2典型案例、3通知公告
					editTime,
					isPublish,
					verify, //-2撤回， -1驳回， 0待审核 ，1初审通过，2终审通过
					verifyContent,
				}
			);
		}
	},
	//分页、查询
	total: async ({ _id }) => {
		return _id ? TxtModel.find({ _id }) : TxtModel.find();
	},
	getArticleListTotal: async (params = {}) => {
		return TxtModel.find({ ...params });
	},
	getArticleList: async (params = {}, { page, page_size }) => {
		// console.log('456', params);
		const skip = (page - 1) * page_size; // 计算跳过的文档数量
		return TxtModel.find({ ...params })
			.skip(skip)
			.limit(page_size);
		// console.log('789', a);
	},

	//获取数据
	getList: async ({ _id, page, page_size }) => {
		const skip = (page - 1) * page_size; // 计算跳过的文档数量
		// return TxtModel.find().skip(skip).limit(page_size);
		return _id
			? TxtModel.find({
					_id,
			  })
					.skip(skip)
					.limit(page_size)
			: TxtModel.find({}).skip(skip).limit(page_size);
	},

	publish: async ({ _id, isPublish, editTime, verify, verifyContent }) => {
		return TxtModel.updateOne(
			{
				_id,
			},
			{
				isPublish,
				editTime,
				verify, //-2撤回， -1驳回， 0待审核 ，1初审通过，2终审通过
				verifyContent,
			}
		);
	},
	delList: async ({ _id }) => {
		return TxtModel.deleteOne({
			_id,
		});
	},
};

module.exports = TxtService;
