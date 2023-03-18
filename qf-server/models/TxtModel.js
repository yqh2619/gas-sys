const mongoose = require("mongoose");
const Schema = mongoose.Schema
//Txt模型对应Txts集合
const TxtTypes = {
  title: {
    type: String,
    default:'123'
  },
  content: {
    type:String
  },
  category: {
    type: String
  }, //1最新动态、2典型案例、3通知公告
  cover: {
    type: String
  },
  isPublish: {
    type:Number
  } , //1未发布，2已发布
  editTime: {
    type:Date
  } 
}
const TxtModel = mongoose.model("txt", new Schema(TxtTypes))

module.exports = TxtModel;