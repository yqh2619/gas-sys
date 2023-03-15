const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Txt模型对应Txts集合
const ProTypes = {
	title: String,
	introduction: String,
	cover: String,
	detail: String, //1未发布，2已发布
	editTime: Date,
};
const ProModel = mongoose.model('product', new Schema(ProTypes));

module.exports = ProModel;
