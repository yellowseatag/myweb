/**
 * Created by Mcd on 2017/2/23.
 */
/*Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。
它们是两个函数，由JavaScript引擎提供，不用自己部署。
resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从Pending变为Resolved），
在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；reject函数的作用是，
将Promise对象的状态从“未完成”变为“失败”（即从Pending变为Rejected），在异步操作失败时调用，
并将异步操作报出的错误，作为参数传递出去。
Promise实例生成以后，可以用then方法分别指定Resolved状态和Reject状态的回调函数。*/
{
/*
 var promise = new Promise(function(resolve, reject) {
 // ... some code

 if (/!* 异步操作成功 *!/){
 resolve(value);
 } else {
 reject(error);
 }
 });
 promise.then(function(value) {
 // success
 }, function(error) {
 // failure
 });*/

    function timeout(ms) {
        return new Promise((resolve,reject)=>{
                setTimeout(resolve,ms,'done');
    });
    }
    timeout(100).then((value)=>{
        //console.log(value);
    });

    let promise=new Promise(function (resolve,reject) {
        //console.log('promise');
        resolve();
    });
    promise.then(function () {
       //console.log('resolved')
    });
    //console.log('hi');
    // Promise
    // Hi!
    // Resolved
    /*Promise新建后立即执行，所以首先输出的是“Promise”。然后，then方法指定的回
    调函数，将在当前脚本所有同步任务执行完才会执行，所以“Resolved”最后输出。*/


    /*Promise对象实现的Ajax操作的例子*/

    let getJSON=function (url) {
        let promise=new Promise(function (resolve,reject) {
            var client=new XMLHttpRequest();
            client.open('GET',url);
            client.onreadystatechange=handler;
            client.responseType='json';
            client.setRequestHeader("Accept","application/json");
            client.send();

            function handler() {
                if (this.readyState !==4){
                    return;
                }
                if (this.status===200){
                    resolve(this.response);
                }else {
                    reject(new Error(this.statusText));
                }
            };
        });
        return promise;
    }

    /*getJSON("http://localhost/posts.json").then(function (json) {
        console.log(json);
    },function (error) {
        console.error(error);
    });*/











}