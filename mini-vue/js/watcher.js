class Watcher {
    constructor(vm,key,cb) {
        this.vm = vm
        //data中属性名
        this.key = key
        //回调函数负责更新视图
        this.cb = cb

        //把wacher对象添加到dep的subs中
        //1.把Watcher对象记录到Dep类的静态属性target
        Dep.target = this
        //2.触发get方法(observer中劫持处理)，把watcher对象添加到dep的subs中
        this.oldValue = vm[key]
        Dep.target = null //触发添加完成，置空静态变量
    }

    /**
     * 数据变化时更新视图
     */
    update() {
        let newValue = this.vm[this.key] //调用update时，数据已经更新
        if(this.oldValue === this.newValue) {
            return
        }
        //更新视图
        this.cb(newValue)
    }
}