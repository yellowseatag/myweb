{
	//ES6 允许为函数的参数设置默认值，即直接写在参数定义的后面。
	function logd(x,y='world') {
		console.logd(x,y);
	}
	//log('hello');log('hello','');log('hello','china');
	//参数默认值可以与解构赋值的默认值，结合起来使用。

	/*只有当函数foo的参数是一个对象时，变量x和y才会通过解构赋值而生成。如果函数foo调用时参数
	不是对象，变量x和y就不会生成，从而报错。如果参数对象没有y属性，y的默认值5才会生效。*/
	function foo({x, y = 5}) {
		console.log(x, y);
	}
	/*foo({}) // undefined, 5
	foo({x: 1}) // 1, 5
	foo({x: 1, y: 2}) // 1, 2
	foo() // TypeError: Cannot read property 'x' of undefined*/
// 写法一
	function m1({x = 0, y = 0} = {}) {
		return [x, y];
	}
// 写法二
	function m2({x, y} = { x: 0, y: 0 }) {
		return [x, y];
	}
	// 函数没有参数的情况
	m1() // [0, 0]
	m2() // [0, 0]

// x和y都有值的情况
	m1({x: 3, y: 8}) // [3, 8]
	m2({x: 3, y: 8}) // [3, 8]

// x有值，y无值的情况
	m1({x: 3}) // [3, 0]
	m2({x: 3}) // [3, undefined]

// x和y都无值的情况
	m1({}) // [0, 0];
	m2({}) // [undefined, undefined]

	m1({z: 3}) // [0, 0]
	m2({z: 3}) // [undefined, undefined]

	//有默认值的参数都不是尾参数。这时，无法只省略该参数，而不省略它后面的参数，除非显式输入undefined
	function f(x, y= 5 , z) {
		console.log(x, y, z) ;
	}
	//f('',,2) // 报错
	/*函数f调用时，参数y = x形成一个单独的作用域。这个作用域里面，变量x本身没有定义，所以指向外层的
	全局变量x。函数调用时，函数体内部的局部变量x影响不到默认值变量x。*/
	let x = 1;
	function f(y = x) {
		let x = 2;
		console.log(y);
	}
	//f() // 1

	/*利用参数默认值，可以指定某一个参数不得省略，如果省略就抛出一个错误。
	* 另外，可以将参数默认值设为undefined，表明这个参数是可以省略的。
	* */
	function throwIfMissing() {
		throw new Error('Missing parameter');
	}
	function foos(mustBeProvided=throwIfMissing()) {
		console.log('这个可以有');
	}
	//foos();

	/*ES6 引入 rest 参数（形式为“...变量名”），用于获取函数的多余参数，
	这样就不需要使用arguments对象了。rest 参数搭配的变量是一个数组，
	该变量将多余的参数放入数组中。*/

	function add(...params) {
		let sum=0;
		for(var par of params){
			sum +=par;
		}
		console.log(sum);
	}
	//add(2,3,4,5,6);

	function sortNumbers(...numbers) {

		console.log( Array.prototype.slice.call(arguments).sort());// arguments变量的写法
		console.log(numbers.sort());// rest参数的写法
	}
	//sortNumbers(8,2,5,1,4);

	//一个利用 rest 参数改写数组push方法的例子。rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错
	function push(array,...items) {
		items.forEach(function (item) {
			array.push(item);
			console.log(item);
		});
		console.log(array);
	}
	/*var a=Array.of();
	push(a,1,2,3,4);*/

	/*扩展运算符（spread）是三个点（...）。它好比 rest 参数的逆运算
 ，将一个数组转为用逗号分隔的参数序列。*/
	//console.log(...[1, 2, 3])// 1 2 3
	//console.log(1, ...[2, 3, 4], 5)// 1 2 3 4 5
	function f(v, w, x, y, z) {
		console.log(v, w, x, y, z);
	}
		var args = [0, 1];
	//f(-1, ...args, 2, ...[3]);
	/*扩展运算符取代apply方法的一个实际的例子*/
	// ES5的写法
	Math.max.apply(null, [14, 3, 77])
	// ES6的写法
	Math.max(...[14, 3, 77])
	// 等同于
	Math.max(14, 3, 77);

	/*扩展运算符的应用
	（1）合并数组*/
	var arr1 = ['a', 'b'];
	var arr2 = ['c'];
	var arr3 = ['d', 'e'];
	// ES5的合并数组
	arr1.concat(arr2, arr3);// [ 'a', 'b', 'c', 'd', 'e' ]
	// ES6的合并数组
	[...arr1, ...arr2, ...arr3]// [ 'a', 'b', 'c', 'd', 'e' ]

	/*(2)扩展运算符可以与解构赋值结合起来，用于生成数组。如果将扩展
		运算符用于数组赋值，只能放在参数的最后一位，否则会报错*/
	let arrayLike = Array.from({
		'0': 'a',
		'1': 'b',
		'2': 'c',
		length: 3
	})
// TypeError: Cannot spread non-iterable object.
	let arr = [...arrayLike];
	//console.log(arrayLike);

	/*函数的name属性，返回该函数的函数名。*/
	/*ES6允许使用“箭头”（=>）定义函数。
	* 如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分。*/
	/*var f = () => 5;
	//等同于
	var f=function () {return 5;}
	var sum=(num1,num2)=>num1+num2;
	//等同于
	var sum=function (num1,num2) {
		return num1+num2;
	}*/

	/* 返回对象*/
	var getTempItem = id => ({ id: '110', name: "Temp" });
	//console.log(getTempItem().id);

	/*箭头函数可以与变量解构结合使用。*/
	const full=({first,last})=>first+' '+last;
	//console.log(full({first:'huang',last:'haibiao'}));
	const isEven = n => n % 2 == 0;
	//console.log(isEven(5));
	const square = n => n * n;
	//console.log(square(5));

/*
* 箭头函数可以让setTimeout里面的this，绑定定义时所在的作用域，而不是指向运行时
* 所在的作用域。箭头函数可以让this指向固定化，这种特性很有利于封装回调函数。*/
	function Timer() {
		this.s1 = 0;
		this.s2 = 0;
		// 箭头函数
		setInterval(() => {this.s1++;console.log(this.s1);}, 1000);
		// 普通函数
		setInterval(function () {
			this.s2++;
		}, 1000);
	}
	/*var timer = new Timer();
	setTimeout(() => console.log('s1: ', timer.s1), 2100);
	setTimeout(() => console.log('s2: ', timer.s2), 2100);*/

	let map=new Map(
		[
			[1,'a'],
			[2,'b'],
			[3,'c']
		]
	);
	let arrmap=[...map.keys()];
	//console.log(arrmap);

	//Generator函数运行后，返回一个遍历器对象，
	// 因此也可以使用扩展运算符
	var go = function* () {
		yield 1;
		yield 2;
		yield 3;
	}
	//let [a,b,c]=go();
	//console.log([...go()]);

	/*函数参数使用了默认值、解构赋值、或者扩展运算符，
	那么函数内部就不能显式设定为严格模式，否则会报错*/

	/*箭头函数的一个用处是简化回调函数。*/
	/*[1,2,3].map(function (x) {
		return x*x;
	});	//正常函数

	[1,2,3].map(x=>x*x);	//箭头函数

	var result=values.sort(function (a,b) {
		return a-b;
	})

	var result=values.sort((a,b) =>	a-b);

	const numbers=(...nums)=>nums;
	const headAndTail=(head,...tail)=>[head,tail];*/

	const insert=(value)=>({into:(array)=>({after:(afterValue)=>{
				array.splice(array.indexOf(afterValue)+1,0,value);
				console.log(array);
			}})})
	//insert(2).into([1,3]).after(1);

	/*递归函数尽量写成尾递归递归非常耗费内存，因为需要同时保存成千上百个调用帧，
	很容易发生“栈溢出”错误（stack overflow）。但对于尾递归来说，由于只存在一个调用帧，
	所以永远不会发生“栈溢出”错误
	如果改写成尾递归，只保留一个调用记录，复杂度 O(1) 。
	 */
	//非尾递归
	function factorial(n) {
		if (n===1) return 1;
		return n*factorial(n-1);
	}
	//尾递归
	function factorials(n,total=1) {
		if (n===1) return total;
		return factorials(n-1,n*total)
	}




}