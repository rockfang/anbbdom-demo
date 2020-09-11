class Vue {
    constructor(options) {
        // 1. 通过属性保存选项数据
        this.$options = options || {}
        this.$data = this.$options.data || {}
        this.$el = typeof this.$options.el === 'string' ? document.querySelector(this.$options.el) : this.$options.el
        console.log('el',this.$el);
        // 2. 把data中的成员转成getter、setter，注入到Vue实例中
        this._proxyData(this.$data)

        // 3. 调用observer对象，监听数据对象
        new Observer(this.$data)
        // 4. 调用compiler对象，解析指令和表达式
        new Compiler(this)
        
    }
    //把数据
    _proxyData(data) {
        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
                configurable: true,
                enumerable: true,
                // writable: true,
                get() {
                    return data[key]
                },
                set(newValue) {
                    if (newValue !== data[key]) {
                        data[key] = newValue
                    }
                }
            })
        });
    }
}