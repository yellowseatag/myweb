/**
 * Created by Mcd on 2017/2/24.
 */
/*整个 Generator 函数就是一个封装的异步任务，或者说是
异步任务的容器。异步操作需要暂停的地方，都用yield语句注明。*/

{
    /*function *gen(x) {
        var y=yield x+2;
        return y;
    }
    var g=gen(5);
    console.log(g.next(),g.next());*/

    /*function* gen(x){
        try {
            var y = yield x + 2;
        } catch (e){
            console.log(e);
        }
        return y;
    }

    var g = gen(1);
    g.next();
    g.throw('出错了');*/

// 出错了
}