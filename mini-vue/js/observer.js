class Observer {
    constructor(data) {
        this.walk(data)
    }

    walk(data) {
        if (!data || typeof data !== 'object') {
            return;
        }
        //遍历对象的所有属性
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key])
        });
    }

    defineReactive(obj, key, val) {
        //如果val是对象，会把对象中属性变成响应式数据 
        // 这就是为何在data中申明了属性的对象能响应式
        this.walk(val)
        let that = this
        //创建dep对象 (发布者)
        let dep = new Dep() 
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get() {
                //收集依赖
                Dep.target && dep.addSub(Dep.target)
                return val
            },
            set(newValue) {
                //触发依赖
                if (newValue !== val) {
                    val = newValue
                }
                //处理val初始是prmitive值，后续手动赋予成对象时，让对象中属性也响应式
                that.walk(val)
                //通知页面更新
                dep.notify()
            }
        })
    }
}