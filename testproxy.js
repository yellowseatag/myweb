/**
 * Created by Mcd on 2017/2/22.
 */
{
    /*Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，
    都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。
    Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。*/

    var obj=new Proxy({},{
        get:function (target,key,receiver) {
            console.log(`getting ${key}!`);
            return Reflect.get(target,key,receiver);
        },
        set:function (target,key,value,receiver) {
            console.log(`setting ${key}!`);
            return Reflect.set(target,key,value,receiver);
        }
    });
   // obj.count=1;
    //++obj.count;
    //(1)GET
    /*ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例。
     var proxy = new Proxy(target, handler);
     Proxy 对象的所有用法，都是上面这种形式，不同的只是handler参数的写法
     其中，new Proxy()表示生成一个Proxy实例，target参数表示所要拦截的目标对象，
     handler参数也是一个对象，用来定制拦截行为。*/

    /*利用get拦截，实现一个生成各种DOM节点的通用函数dom*/
    const  dom=new Proxy({},{
        get(target,property){
            return function (attrs={},...children) {
                const e1=document.createElement(property);
                for(let prop of Object.keys(attrs)){
                    e1.setAttribute(prop,attrs[prop]);
                }
                for(let child of children){
                    if (typeof child === 'string'){
                        child=document.createTextNode(child);
                    }
                    e1.appendChild(child);
                }
                return e1;
            }
        }
    });
    const e1=dom.div({},
        'hello,my name is',
        dom.a({href:'//example.com'},'Mark'),
        '. I like:',
        dom.ul({},
            dom.li({},'the web'),
            dom.li({},'food'),
            dom.li({},'...actually that\'s id')
        )
    );
    document.body.appendChild(e1);
    /*如果一个属性不可配置（configurable）和不可写（writable），则该属性不能被代理，
    通过 Proxy 对象访问该属性会报错。*/


    //(2)SET
    /*我们会在对象上面设置内部属性，属性名的第一个字符使用下划线开头，
    表示这些属性不应该被外部使用。结合get和set方法，就可以做到防止
    这些内部属性被外部读写。*/
    var handler={
        get (target,key){
            invariant(key,'get');
            return target[key];
        },
        set (target,key,value){
            invariant(key,'set');
            target[key]=value;
            return true;
        }
    };
    function invariant(key,action) {
        if (key[0]==='_'){
            throw new Error(`无效的${action}操作，该${key}属性不能访问！`);
        }
    }
    var neibu=new Proxy({},handler);
    var neibu1=Object.create(neibu);
    //neibu1._aaa;

    //(3)apply() call()
    var twice={
        apply(target,ctx,args){
            return Reflect.apply(...arguments)*2;
        }
    };
    function sum(left,right) {
        //console.log(left,right);
        return left+right;
    };
    var proxy=new Proxy(sum,twice);
    proxy(1,2);
    proxy.apply(null,[1,2]);
    proxy.call(null,1,2);

    //has()

}
