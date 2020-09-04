import { h, init } from "snabbdom"

/**
 * 模块使用：
 * 1. 导入模块
 * 2. 注册模块
 * 3. 使用h()函数的第二个参数传入模块需要的数据(对象)
 */
import style from "snabbdom/modules/style";
import eventlisteners from "snabbdom/modules/eventlisteners";

let patch = init([style, eventlisteners])
/**
 * 三个参数的h函数：
 * 第一个参数：标签+选择器
 * 第二个参数：模块需要的数据对象，可配置插件内容，如样式， 事件等
 * 第三个参数：数组，放子元素；是primitive放标签文本，还可以是vnode
 */
let vnode = h("div", {
    style: {
        backgroundColor: "red",
    },
    on: {
        click: () => {
            console.log("clicked !");
        }
    },
},
    [
        h("h1", "hello"),
        h("p", "i am a child p of div")
    ]);

let app = document.querySelector("#app")
let vnode1 = patch(app, vnode);