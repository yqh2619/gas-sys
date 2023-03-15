const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//user模型对应users集合
const UserTypes = {
	username: String,
	password: String,
	gender: Number, //sex,0,1,2
	introduction: String, //简介
	avatar: String,
	role: Number, //权限，一级管理员1，二级管理员2，三级管理员3，普通用户2，
};
const UserModel = mongoose.model('user', new Schema(UserTypes));

module.exports = UserModel;
