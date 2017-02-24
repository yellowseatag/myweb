{
    /*ES6允许直接写入变量和函数，作为对象的属性
    和方法。这样的书写更加简洁。*/

    function f(x,y) {
        return {x,y}
    }
    var o={
        method(){
            return 'hello';
        },
        *m(){
            yield 'hello';
            yield 'world';
          }
    };
    /*如果某个方法的值是一个Generator函数，前面需要加上星号*/
    //console.log([...o.m()]);

    /*es6义对象的属性*/
    let proKey='foo';
    let objs={
        [proKey]:true,
        'first':'hello',
        ['a'+'bc']:123
    };
    //console.log(objs['first']);

    var foo='bar';
    var baz={foo};
    //console.log(baz);
    /*ES6提出“Same-value equality”（同值相等）算法
    * Object.is就是部署这个算法的新方法。它用来比较
    * 两个值是否严格相等，与严格比较运算符（===）
    * 的行为基本一致。*/
    Object.is(+0,-0);
    Object.is(NaN,NaN)

    /*Object.assign方法用于对象的合并，将源对象（source）的所有
    可枚举属性，复制到目标对象（target）。
     第一个参数是目标对象，后面的参数都是源对象
     如果目标对象与源对象有同名属性，或多个源对象有同名属性，
     则后面的属性会覆盖前面的属性。
    */
    /*其他类型的值（即数值、字符串和布尔值）不在首参数，也不会报错。但
    是，除了字符串会以数组形式，拷贝入目标对象，其他值都不会产生效果。*/
    let target={a:1};
    let source1={b1:2,b2:2.1};
    let  source2={c1:3,c2(){return 3.1;}};
    let  source3='abc';
    /*Object.assign(target,source1,source2,source3);
    console.log(target);*/
    /*常见用途
    * （1）为对象添加属性*/
    class Point{
        constructor(x='hello',y='world'){
            Object.assign(this,{x,y});
        }
    }
    /*let p=new Point('a','b');
    console.log(p.x);*/

    /*(2)为对象添加方法*/

    Object.assign(Point.prototype,{
        z(a,b){
            return a+b;
        }
    });
    let p=new Point();
     /*console.log(p.x,p.y,p.z(5,6));*/
    /*(3)克隆对象*/
    function clone(origin) {
        return Object.assign({},origin);
    }
    function clones(origin) {   //保持继承
        let originProto=Object.getPrototypeOf(origin);
        return Object.assign(Object.create(originProto),origin)
    }
    /*var q=clones(p);
    console.log(q);*/
    /*（4）合并多个对象*/
    /*const merge = (target, ...sources) => Object.assign(target, ...sources);
    const merge = (...sources) => Object.assign({}, ...sources);*/

    /*设置对象属性*/
    let  proto={};
    let  objPro={x:10};
    Object.setPrototypeOf(objPro,proto);
    proto.y=11;
    proto.z=12;
    //console.log(objPro);

    function setPro(obj, proto) {
        obj.__proto__ = proto;
        return obj;
    }
    setPro(objPro,{n:13})
    /*该方法与setPrototypeOf方法配套，用于读取一个对象的prototype对象。*/
    //console.log(Object.getPrototypeOf(objPro));

    /* 引入了跟Object.keys配套的Object.values和Object.entries，
    作为遍历一个对象的补充手段，供for...of循环使用。*/
    let obj={a:1,b:2,c:3};
    for(let key of Object.keys(obj)){
        //console.log(key);
    }
    /* 扩展运算符
    * let z = { a: 3, b: 4 };
     let n = { ...z };
    * */


    /*Null 传导运算符*/
   // const firstName = message?.body?.user?.firstName || 'default';
    /*三个?.运算符，只要其中一个返回null或undefined，就不再往下运算，而是返回undefined。*/
    //“Null 传导运算符”有四种用法。

   /* obj?.prop // 读取对象属性
    obj?.[expr] // 同上
    func?.(...args) // 函数或对象方法的调用
    new C?.(...args) // 构造函数的调用*/

}


