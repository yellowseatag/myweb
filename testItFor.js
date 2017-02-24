/**
 * Created by Mcd on 2017/2/23.
 */
/*Iterator的遍历过程
*（1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象
*（2）第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员
* (3)第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。
* (4）不断调用指针对象的next方法，直到它指向数据结构的结束位置。
* */
{

    /*有三类数据结构原生具备Iterator接口：数组、某些类似数组的对象、Set和Map结构。*/
    let arr=['a','b','c'];
    let iter=arr[Symbol.iterator]();
    //console.log(iter);

    /*一个对象如果要有可被for...of循环调用的Iterator接口，就必须在
    Symbol.iterator的属性上部署遍历器生成方法（原型链上的对象具有该方法也可）。*/

    /*对象添加Iterator接口*/

    let obj={
        data:['hello','world'],
        [Symbol.iterator](){
            const self=this;
            let index=0;
            return {
                next(){
                    if (index<self.data.length){
                        return{
                            value:self.data[index++],
                            done:false
                        };
                    }else{
                        return {value:undefined,done:true};
                    }
                }
            }
        }
    };
    for(let i of obj){
        //console.log(i);
    }

    /*对于类似数组的对象（存在数值键名和length属性），部署Iterator接口，
    有一个简便方法，就是Symbol.iterator方法直接引用数组的Iterator接口。*/

    /*NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
     或者NodeList.prototype[Symbol.iterator] = [][Symbol.iterator];*/

    let objs={
        0:'e',
        1:'f',
        2:'g',
        length:3
    };
    objs[Symbol.iterator]=[][Symbol.iterator];
    /*for (let item of objs){
        console.log(item);
    }*/
    var $iterator = [1,2,3,4][Symbol.iterator]();
    var $result = $iterator.next();
    while (!$result.done) {
        var x = $result.value;
        // ...console.log(x);
        $result = $iterator.next();
    }

    /*Symbol.iterator方法的最简单实现
    * Generator函数。Symbol.iterator方法几乎不用部署任何代码，
    * 只要用yield命令给出每一步的返回值即可*/

    var myIterable={};
    myIterable[Symbol.iterator]=function* () {
        yield 1;
        yield 2;
        yield 3;
    };
    [...myIterable]// [1, 2, 3]
    /*let obj = {
        * [Symbol.iterator]() {
            yield 'hello';
            yield 'world';
        }
    };*/

    /*for...of循环可以使用的范围包括数组、Set 和 Map 结构、
    某些类似数组的对象（比如arguments对象、DOM NodeList 对象）、
    后文的 Generator 对象，以及字符串。*/

    /*并不是所有类似数组的对象都具有 Iterator 接口，一个简便的解决方法，
    就是使用Array.from方法将其转为数组。*/

    /*使用break语句跳出for...of循环。*/








}
