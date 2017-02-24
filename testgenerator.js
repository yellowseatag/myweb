/**
 * Created by Mcd on 2017/2/23.
 */
{
    function* helloWorldGenerator() {
        yield 'hello';
        yield 'world';
        return 'ending';
    }

    var hw = helloWorldGenerator();

    /*调用Generator函数，返回一个遍历器对象，代表Generator函数的内部指针。
    以后，每次调用遍历器对象的next方法，就会返回一个有着value和done两个属性的对象。
    value属性表示当前的内部状态的值，是yield语句后面那个表达式的值；
    done属性是一个布尔值，表示是否遍历结束。*/


    /*yield语句后面的表达式，只有当调用next方法、内部指针指向该
    语句时才会执行，因此等于为JavaScript提供了手动的“惰性求值”
    （Lazy Evaluation）的语法功能。*/
    function* gen() {
        yield  123 + 456;
    }
    let hg=gen();
    //console.log(hg,hg.next());
    //console.log('Hello' + (yield 123)); // OK

    /*由于next方法的参数表示上一个yield语句的返回值，所以第一次使用next方法时，
    不能带有参数。*/

    function* dataConsumer() {
        console.log('Started');
        console.log(`1. ${yield}`);
        console.log(`2. ${yield}`);
        return 'result';
    }

    let genObj = dataConsumer();
   // genObj.next('c');
// Started
   // genObj.next('a')
// 1. a
   // genObj.next('b')
// 2. b
    function* fibonacci() {
        let [prev, curr] = [0, 1];
        for (;;) {
            [prev, curr] = [curr, prev + curr];
            yield curr;
        }
    }
    for (let n of fibonacci()) {
        if (n > 1000) break;
        //console.log(n);
    }

    function *f() {
        console.log('执行了！')
    }

    var generator=f();
    /*setTimeout(function () {
        generator.next();
    },2000);*/

    function* objectEntries(obj) {
        let propKeys = Reflect.ownKeys(obj);

        for (let propKey of propKeys) {
            yield [propKey, obj[propKey]];
        }
    }

    let jane = { first: 'Jane', last: 'Doe' };

    /*for (let [key, value] of objectEntries(jane)) {
        console.log(`${key}: ${value}`);
    }*/

    /*var g = function* () {
        try {
            yield;
        } catch (e) {
            console.log('内部捕获', e);
        }
    };

    var i = g();
    i.next();
    try {
        i.throw('a');
        i.throw('b');
        i.throw('c');
    } catch (e) {
        console.log('外部捕获', e);
    }*/

    /*var g = function* () {
        while (true) {
            try {
                yield;
            } catch (e) {
                if (e != 'a') throw e;
                console.log('内部捕获', e);
            }
        }
    };

    var i = g();
    i.next();

    try {
        i.throw('a');
        i.throw('c');
        throw new Error('b');
    } catch (e) {
        console.log('外部捕获', e);
    }*/


    /*g.throw方法被捕获以后，自动执行了一次next方法，所以会打印b。
    另外，也可以看到，只要Generator函数内部部署了try...catch代码块，
    那么遍历器的throw方法抛出的错误，不影响下一次遍历*/
    var gens = function* gens(){
        try {
            yield console.log('a');
        } catch (e) {
            // ...
            console.log(e);
        }
        yield console.log('b');
        yield console.log('c');
    }

    var g = gens();
    /*g.next() // a
    g.throw('x') // b
    g.next() // c*/

    /*Generator函数返回的遍历器对象，还有一个return方法，
    可以返回给定的值，并且终结遍历Generator函数。*/

    function* genss() {
        yield 1;
        yield 2;
        yield 3;
    }

    var gss = genss();
    gss.next()        // { value: 1, done: false }
    gss.return('foo') // { value: "foo", done: true }
    gss.next()        // { value: undefined, done: true }


    /*如果Generator函数内部有try...finally代码块，那么return
    方法会推迟到finally代码块执行完再执行。*/
    function* numbers () {
        yield 1;
        try {
            yield 2;
            yield 3;
        } finally {
            yield 4;
            yield 5;
        }
        yield 6;
    }
    var gnum = numbers()
    gnum.next() // { done: false, value: 1 }
    gnum.next() // { done: false, value: 2 }
    gnum.return(7) // { done: false, value: 4 }
    gnum.next() // { done: false, value: 5 }
    gnum.next() // { done: true, value: 7 }

    /*使用call方法绑定Generator函数内部的this。这样，构造函数
    调用以后，这个空对象就是Generator函数的实例对象了。*/

    /*function* F() {
        this.a = 1;
        yield this.b = 2;
        yield this.c = 3;
    }
    var obj = {};
    var f = F.call(obj);

    f.next();  // Object {value: 2, done: false}
    f.next();  // Object {value: 3, done: false}
    f.next();  // Object {value: undefined, done: true}

    obj.a // 1
    obj.b // 2
    obj.c // 3*/


    /*function* Fs() {
        this.a = 1;
        yield this.b = 2;
        yield this.c = 3;
    }
    var fs = Fs.call(Fs.prototype);
    console.log(fs);
    fs.next();  // Object {value: 2, done: false}
    fs.next();  // Object {value: 3, done: false}
    fs.next();  // Object {value: undefined, done: true}

    fs.a // 1
    fs.b // 2
    fs.c // 3




    function* gen() {
        this.a = 1;
        yield this.b = 2;
        yield this.c = 3;
    }

    function F() {
        return gen.call(gen.prototype);
    }

    var f = new F();

    f.next();  // Object {value: 2, done: false}
    f.next();  // Object {value: 3, done: false}
    f.next();  // Object {value: undefined, done: true}

    f.a // 1
    f.b // 2
    f.c // 3*/


    /*Generator是实现状态机的最佳结构*/

    var clock=function *() {
        while (true){
            console.log('tick!');
            yield;
            console.log('tock!');
            yield;
        }
    };
    let clo=clock();
    console.log(clo.next(),clo.next(),clo.next(),clo.next())






}
