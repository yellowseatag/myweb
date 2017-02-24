{
	/*Array.from方法用于将两类对象转为真正的数组：类似数组的对象
	（array-like object）和可遍历（iterable）的对象
	（包括ES6新增的数据结构Set和Map）。*/
	/*let arrayLike = {
		'0': 'a',
		'1': 'b',
		'2': 'c',
		length: 3
	};
	let arr=Array.from(arrayLike);
	console.log(arr);*/

	/*实际应用中，常见的类似数组的对象是DOM操作返回的NodeList集合，
	以及函数内部的arguments对象。Array.from都可以将它们转为真正的数组。*/
	/*function foo() {
		var args = Array.from(arguments);
		console.log(args) ;
	}
	foo('aaa','bbb','ccc','ddd');*/

	/*Array.of基本上可以用来替代Array()或new Array()，并且不存在由于
	参数不同而导致的重载。它的行为非常统一。*/
	Array.of() // []
	Array.of(undefined) // [undefined]
	Array.of(1) // [1]
	Array.of(1, 2) // [1, 2]
	//Array.of方法可以用下面的代码模拟实现。
	function ArrayOf(){
		return [].slice.call(arguments);
	}

	/*数组实例的copyWithin方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），
	然后返回当前数组。也就是说，使用这个方法，会修改当前数组。
	 Array.prototype.copyWithin(target, start = 0, end = this.length)
	 它接受三个参数。
	 target（必需）：从该位置开始替换数据。
	 start（可选）：从该位置开始读取数据，默认为0。如果为负值，表示倒数。
	 end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。
	 */
	//console.log([1, 2, 3, 4, 5,6,7].copyWithin(0,4));

	/*数组实例的find方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员
	依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成
	员，则返回undefined。find方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组。*/
	/*[1, 5, 10, 15].find(function(value, index, arr) {
		return value > 9;
	}) // 10*/
	/*数组实例的findIndex方法的用法与find方法非常类似，返回第一个符合条件的数组成员的位置，
	如果所有成员都不符合条件，则返回-1。*/
	[1, 5, 10, 15].findIndex(function(value, index, arr) {
		return value > 9;
	}) // 2
	/*fill方法使用给定值，填充一个数组。fill方法用于空数组的初始化非常方便。数组中已有的元素，会被全部抹去。*/
	//['a', 'b', 'c'].fill(7);	// [7, 7, 7]
	//new Array(3).fill(7);	// [7, 7, 7]

	//fill方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。
	//['a', 'b', 'c'].fill(7, 1, 2);	// ['a', 7, 'c']

	/*ES6提供三个新的方法——entries()，keys()和values()——用于遍历数组。
	它们都返回一个遍历器对象（详见《Iterator》一章），可以用for...of循环进行遍历，
	唯一的区别是keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。*/

	for(let [key,value] of ['a','b','c'].entries()){
		//console.log(key,value);
	}

	/*Array.prototype.includes方法返回一个布尔值，表示某个数组是否包含给定的值，
	与字符串的includes方法类似。该方法属于ES7，但Babel转码器已经支持。*/
	//console.log([1,2,3].includes(5));

	/*该方法的第二个参数表示搜索的起始位置，默认为0。如果第二个参数为负数，则表示倒数的位置，
	如果这时它大于数组长度（比如第二个参数为-4，但数组长度为3），则会重置为从0开始。*/
	//console.log([1,2,3].includes(3,1));




}