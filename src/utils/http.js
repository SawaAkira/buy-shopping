// 导入axios插件
import Axios from "axios"
// 导出get方法
export let get = (url, option) => {
    return Axios.get(url, { params: option })
}
// 导出post方法
export let post = (url, option) => {
    return Axios.post(url, option)
}