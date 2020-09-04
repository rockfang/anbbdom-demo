// var snabbdom = require('snabbdom');
import { init, h, thunk } from "snabbdom";
console.log({ init, h, thunk });

/**
 * 参数：数组，模块
 * 返回值：patch函数，功能：对比两个vnode差异，渲染到页面
 */
let patch = init([]);
/**
 * 第一个参数：标签+选择器
 * 第二个参数：string则是标签中的内容
 */
let vnode = h("div#contaner.cls", {
    hook: {
        init: vnode => {
            console.log(vnode.elm);
        },
        create: (enmyptyNode, vnode) => {
            console.log(vnode.elm);
        }
    }
}, '内容')
let app = document.querySelector("#app");
/**
 * 第一个参数：可以是DOM元素， 内部会把dom转化成VNode
 * 第二个参数：VNode
 * 作用：更新差异到界面，并返回新的VNode
 * 返回值：VNode
 */
let vnode2 = patch(app, vnode);

//再一次跟新
vnode = h("div#app", "更新内容");
let vnode3 = patch(vnode2, vnode);