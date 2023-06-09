import Vue from 'vue'
import dayjs from 'dayjs'

// 加载中文语言包
import 'dayjs/locale/zh-cn'

// 导入相对时间的插件 相对时间 几秒前 几分钟前
import relativeTime from 'dayjs/plugin/relativeTime'

// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)

// 配置使用中文语言包
dayjs.locale('zh-cn')

// 全局过滤器：处理相对时间
// 定义一个全局过滤器，然后就可以在任何组件的模板中使用了
// 其实过滤器就相当于一个全局可用的方法(仅供模板使用templete，script用不了)
// 参数1：过滤器名称(自取)
// 参数2：过滤器函数
// 使用方式：{{ 表达式 | 过滤器名称 }} 在模板中使用
// 管道符前面的表达式结果会作为参数传递到过滤器函数中
// 过滤器的返回值会渲染到使用过滤器的模板位置
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
// dayjs() 获取当前时间
