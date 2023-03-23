const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//user模型对应users集合
const UserTypes = {
	username: String,
	password: String,
	gender: Number, //sex,0,1,2
	introduction: String, //简介
	avatar: String,
	role: Number, //权限，1用户 2一级管理员，3二级管理员，4三级管理员
};
const UserModel = mongoose.model('user', new Schema(UserTypes));

module.exports = UserModel;
