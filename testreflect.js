/**
 * Created by Mcd on 2017/2/22.
 */
{
    //reflect对象一共有13个静态方法

    /*Reflect.apply(target,thisArg,args);
    Reflect.construct(target,args);
    Reflect.get(target,name,receiver);
    Reflect.set(target,name,value,receiver);
    Reflect.defineProerty(target,name,desc);
    Reflect.deleteProerty(target,name);
    Reflect.has(target,name);
    Reflect.ownKeys(target);
    Reflect.isExtensible(target);
    Reflect.preventExtensions(target);
    Reflect.getOwnPropertyDescriptor(target,name);
    Reflect.getPrototypeOf(target);
    ReflectsetProtypeOf(target,prototype);*/

    //Reflect.get(target, name, receiver)
    let myObject={
        foo:1,
        bar:2,
        get baz(){
            return this.foo+this.bar;
        }

    };
    let myReceiverObject={
        foo:4,
        bar:4,
        baz:4,
    };
    //console.log(Reflect.get(myObject,'baz',myReceiverObject));

    //Reflect.set(target, name, value, receiver)
    let myObjecSet={
        foo:4,
        set bar(val){
            return this.foo=val;
        },
    };
    let myReceiverObjectSet={
        foo:1
    };
    Reflect.set(myObjecSet,'bar',2,myReceiverObjectSet);
    /*myObject.foo // 4
    myReceiverObject.foo // 2*/

    //Reflect.has(obj, name)

    let myObjectHas={foo:1,};
    Reflect.has(myObjectHas,'foo');

    //Reflect.deleteProperty(obj, name)
    /*该方法返回一个布尔值。如果删除成功，或者被删除的属性不存在，
    返回true；删除失败，被删除的属性依然存在，返回false*/
    const myObjDel={foo:'bar'};
    //console.log(Reflect.deleteProperty(myObjDel,foo));

    //Reflect.construct(target, args)
    /*等同于new target(...args)，这提供了一种不使用new，
    来调用构造函数的方法*/
    function Greeting(name){
       this.name=name,
           this.age=12
    }
    /*等同于实例化一个对象*/
    const  instance=Reflect.construct(Greeting,['张三']);
    //console.log(instance.name);

    //Reflect.getPrototypeOf(obj)
    /*于读取对象的__proto__属性*/

    const  myobjProto=new Greeting();
    //console.log(Reflect.getPrototypeOf(myobjProto),Greeting.prototype);

    //Reflect.setPrototypeOf(obj, newProto)
    /*于设置对象的__proto__属性*/

    //console.log(Reflect.setPrototypeOf(myobjProto, myObject));

    //Reflect.apply(func,thisArg,args);

    /*const ages = [11, 33, 12, 54, 18, 96];

     // 旧写法
     const youngest = Math.min.apply(Math, ages);
     const oldest = Math.max.apply(Math, ages);
     const type = Object.prototype.toString.call(youngest);

     // 新写法
     const youngest = Reflect.apply(Math.min, Math, ages);
     const oldest = Reflect.apply(Math.max, Math, ages);
     const type = Reflect.apply(Object.prototype.toString, youngest);*/

    //Reflect.defineProperty(target, propertyKey, attributes)
    /*用来为对象定义属性*/
    
    function MyDate() {

    }
    Reflect.defineProperty(MyDate,'now',{
        value:()=>new Date.now()
    });
    //console.log(MyDate.now);

    //Reflect.getOwnPropertyDescriptor(target, propertyKey)
    /*用于得到指定属性的描述对象，将来会替代掉后者。*/

    //Reflect.isExtensible (target)
    /*表示当前对象是否可扩展*/

    //Reflect.preventExtensions(target)
    /*用于让一个对象变为不可扩展。它返回一个布尔值，
    表示是否操作成功*/

    //Reflect.ownKeys (target)
    /*返回对象的所有属性，基本等同于Object.getOwnPropertyNames
    与Object.getOwnPropertySymbols之和*/
    let myobjOwn={
        foo:1,
        bar:2,
        [Symbol.for('baz')]:3,
        [Symbol.for('bing')]:4
    };
    //console.log(Reflect.ownKeys(myobjOwn));
    //console.log(Object.getOwnPropertyNames(myobjOwn),Object.getOwnPropertySymbols(myobjOwn));

    //使用Proxy实现观察者模式
    /*观察者模式（Observer mode）指的是函数自动观察数据
    对象，一旦对象有变化，函数就会自动执行。*/
    /*实现观察者代码*/
    const queuedObservers = new Set();

    const observe = fn => queuedObservers.add(fn);
    const observable = obj => new Proxy(obj, {set});

    function set(target, key, value, receiver) {
        const result = Reflect.set(target, key, value, receiver);
        queuedObservers.forEach(observer => observer());
        return result;
    }
    /*应用*/
    const person = observable({
        name: '张三',
        age: 20
    });
    function print() {
        console.log(`${person.name}, ${person.age}`)
    }

    observe(print);
    //person.name = '李四';// 李四, 20
    /*数据对象person是观察目标，函数print是观察者。一旦数据对象发生变化，
    print就会自动执行。*/
}
