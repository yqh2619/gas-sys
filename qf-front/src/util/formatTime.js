import moment from "moment/moment"

//格式化时间
moment.locale("zh-cn")
const formatTime = {
  getTime: (date) => {
    return moment(date).format('YYYY/MM/DD, HH:mm:ss')
  }
}
export default formatTime