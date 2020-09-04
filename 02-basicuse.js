//div中放两个元素h1和p 练习
import { init, h } from "snabbdom";
let patch = init([]);
/**
 * 渲染多个子元素时，第二个参数是数组，数组元素是vnode
 */
let vnode = h("div#contaner", [h("h1", "hello snabbdom"), h("p", "I am p tag")])
let app = document.querySelector("#app");
let vnode2 = patch(app, vnode);

//再次更新
setTimeout(() => {
    vnode = h("div#contaner", [h("h1", "hello world"), h("p", "update p")])
    let vnode3 = patch(vnode2, vnode);

    //清空页面元素
    setTimeout(() => {
        let vnode4 = patch(vnode3, h("!"));//创建注释节点方式清空
    }, 2000);
}, 2000);



