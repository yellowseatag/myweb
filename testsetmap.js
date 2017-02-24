/**
 * Created by Mcd on 2017/2/22.
 */
{
    /*ES6 提供了新的数据结构 Set。它类似于数组，
    但是成员的值都是唯一的，没有重复的值。*/
    const s=new Set();
    [2,3,2,1,4,5,2,2,4,6].forEach(x=>s.add(x));
    /*Set实例的方法分为两大类：操作方法（用于操作数据）
    和遍历方法（用于遍历成员）。下面先介绍四个操作方法。
     add(value)：添加某个值，返回Set结构本身。
     delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
     has(value)：返回一个布尔值，表示该值是否为Set的成员。
     clear()：清除所有成员，没有返回值。
     */
    /*Array.from方法可以将Set结构转为数组。*/
    Array.from(s)
    //console.log(s);
    /*这就提供了去除数组重复成员的另一种方法。*/
    function dedupe(array) {
        return Array.from(new Set(array));
    }

    /*Set结构的实例有四个遍历方法，可以用于遍历成员。

    keys()：返回键名的遍历器
    values()：返回键值的遍历器
    entries()：返回键值对的遍历器
    forEach()：使用回调函数遍历每个成员*/

    /*扩展运算符和Set结构相结合，就可以去除数组的重复成员。*/
    let arr = [3, 5, 2, 2, 5, 5];
    let unique = [...new Set(arr)];// [3, 5, 2]
    //console.log(unique);

    /*因此使用Set可以很容易地实现并集（Union）、
    交集（Intersect）和差集*/
    let a=new Set([1,2,3]);
    let b=new Set([4,3,2]);
    let union=new Set([...a,...b]);//并集
    let intersect=new Set([...a].filter(x=>b.has(x)));//交集
    let difference=new Set([...a].filter(x=>!b.has(x)));//差集
    //console.log(union,intersect,difference);


    /*ES6提供了Map数据结构。它类似于对象，也是键值对的集合，但是“键”
    的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，
    Object结构提供了“字符串—值”的对应，Map结构提供了“值—值”的对应，
    是一种更完善的Hash结构实现。如果你需要“键值对”的数据结构，
    Map比Object更合适。*/

    /*var m = new Map();
    var o = {p: 'Hello World'};
    m.set(o, 'content')
    m.get(o) // "content"
    m.has(o) // true
    m.delete(o) // true
    m.has(o) // false*/

    var map=new Map();
    map.set(['a'],333);
    //console.log(map.get(['a']));
    /*Map原生提供三个遍历器生成函数和一个遍历方法。

    keys()：返回键名的遍历器。
    values()：返回键值的遍历器。
    entries()：返回所有成员的遍历器。
    forEach()：遍历Map的所有成员。
    需要特别注意的是，Map的遍历顺序就是插入顺序。*/

    /*(1)Map结构转为数组结构，比较快速的方法是结合使用扩展运算符（...）。*/
    /*[...map.keys()]
    [...map.values()]
    [...map.entries()]
    [...map]*/

    /*（2）数组转为Map*/
    new Map([[true, 7], [{foo: 3}, ['abc']]])

    /*(3)map转对象*/
    function strMapToObj(strMap) {
        let obj=Object.create(null);
        for(let [k,v] of strMap){
            obj[k]=v;
        }
        return obj;
    }
    /*对象转map*/
    function objToStrMap(obj) {
        let strMap = new Map();
        for(let k of Object.keys(obj)){
            strMap.set(k,obj[k]);
        }
        return strMap;
    }
    /*map转json*/
    //对象转json
    function strMapToJson(strMap) {
        return JSON.stringify(strMapToObj(strMap));
    }
    //数组转json
    function mapToArrayJson(map) {
        return JSON.stringify([...map]);
    }

    /*json转map*/
    //对象
    function jsonToStrMap(jsonStr) {
        return objToStrMap(JSON.parse(jsonStr))
    }
    //console.log(JSON.parse('{"yes":true,"no":false}'));
    //数组
    function jsonToMap(jsonStr) {
        return new Map(JSON.parse(jsonStr));
    }






}