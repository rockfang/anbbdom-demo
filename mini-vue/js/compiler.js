class Compiler {
    constructor(vm) {
        this.vm = vm
        this.el = vm.$el
        this.compile(this.el)
    }

    //编译模板，处理文本节点和元素节点
    compile(el) {
        //通过querySelector等拿到的dom元素，天然拥有childNodes属性，标识其子元素信息.nodeType标识元素类型
        let childNodes = el.childNodes
        Array.from(childNodes).forEach(node => {
            if (this.isTextNode(node)) {
                this.compileText(node)
            } else if (this.isElementNode(node)) {
                this.compileElement(node)
            }

            // 判断node节点是否有子节点，有则递归compile
            if(node.childNodes && node.childNodes.length) {
                this.compile(node)
            }
        });
    }
    //编译元素节点，处理指令
    compileElement(node) {

    }

    //编译文本节点，处理插值表达式
    compileText(node) {
        // {{ msg }}
        let reg = /\{\{(.+?)\}\}/
        let value = node.textContent
        if(reg.test(value)) {
            let key = RegExp.$1.trim()
            node.textContent = value.replace(reg,this.vm[key])
        }
    }

    //判断是否是指令
    idDirective(attrName) {
        return attrName.startsWith('v-')
    }
    //判断是否是文本节点
    isTextNode(node) {
        return node.nodeType === 3
    }
    //判断是否是元素节点
    isElementNode(node) {
        return node.nodeType === 1
    }
}