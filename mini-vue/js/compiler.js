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
            if (node.childNodes && node.childNodes.length) {
                this.compile(node)
            }
        });
    }
    //编译元素节点，处理指令
    compileElement(node) {
        console.log(node.attributes)
        //遍历节点属性
        //判断是否指令
        Array.from(node.attributes).forEach(attr => {
            let attrName = attr.name
            if (this.isDirective(attrName)) {
                //v-text --> text
                attrName = attrName.substr(2)
                let key = attr.value
                this.update(node, key, attrName)
            }
        });
    }

    update(node, key, attrName) {
        let updateFn = this[attrName + 'Updater']
        // updateFn && updateFn(node, this.vm[key], key)//指令的value对应的值是vm中data中定义的值
        // upateFn.call(this,xxx)  改变方法this指向
        updateFn && updateFn.call(this, node, this.vm[key], key)//指令的value对应的值是vm中data中定义的值
    }
    //处理v-text
    textUpdater(node, value, key) {
        node.textContent = value
        new Watcher(this.vm, key, newValue => node.textContent = newValue)
    }
    //处理v-model
    modelUpdater(node, value, key) {
        node.value = value
        new Watcher(this.vm, key, newValue => node.value = newValue)

        // 双向绑定-视图改变数据
        node.addEventListener('input', _ => {
            this.vm[key] = node.value
        })
    }

    //编译文本节点，处理插值表达式
    compileText(node) {
        // {{ msg }}
        let reg = /\{\{(.+?)\}\}/
        let value = node.textContent
        if (reg.test(value)) {
            let key = RegExp.$1.trim()
            node.textContent = value.replace(reg, this.vm[key])

            //创建watcher对象；在解析文本节点时，注册了回调。数据变化时，更新dom节点内容
            new Watcher(this.vm, key, newValue => node.textContent = newValue)
        }
    }

    //判断是否是指令
    isDirective(attrName) {
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