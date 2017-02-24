{
	/*ES6在Number对象上，新提供了Number.isFinite()和Number.isNaN()两个方法。
	Number.isFinite()用来检查一个数值是否为有限的（finite）。
	Number.isNaN()用来检查一个值是否为NaN。
	它们与传统的全局方法isFinite()和isNaN()的区别在于，
	传统方法先调用Number()将非数值的值转为数值，再进行判断，而这两个新方法只对数值有效，非数值一律返回false。
	*/

	/*console.log(Number.isFinite('15'));
	console.log(Number.isNaN(15));*/

	// ES5的写法
	parseInt('12.34') // 12
	parseFloat('123.45#') // 123.45
	// ES6的写法
	Number.parseInt('12.34') // 12
	Number.parseFloat('123.45#') // 123.45
	/*Number.isInteger()用来判断一个值是否为整数。需要注意的是，在JavaScript内部，
	整数和浮点数是同样的储存方法，所以3和3.0被视为同一个值。*/
	Number.isInteger(25) // true
	//console.log(Number.isInteger(25.0)) // true

	//Number.EPSILON的实质是一个可以接受的误差范围。部署了一个误差检查函数:
	function withinErrorMargin (left, right) {
		return Math.abs(left - right) < Number.EPSILON;
	}
	withinErrorMargin(0.1 + 0.2, 0.3)// true
	withinErrorMargin(0.2 + 0.2, 0.3)// false
	/*JavaScript能够准确表示的整数范围在-2^53到2^53之间（不含两个端点），
		超过这个范围，无法精确表示这个值。*/
	//console.log(Math.pow(2, 53) === Math.pow(2, 53) + 1);
	//Math.trunc方法用于去除一个数的小数部分，返回整数部分。
	/*console.log(Math.trunc(10/3),Math.floor(10/3));
	console.log(Math.trunc(-10/3),Math.ceil(-10/3));*/
	/*Math.trunc = Math.trunc || function(x) {
	 if (isNaN(x)) {
	 	return NaN;
	 }
	 if (x > 0) {
	 	return Math.floor(x);
	 }
	 	return Math.ceil(x);
	 };*/

	/*Math.sign方法用来判断一个数到底是正数、负数、还是零。
	参数为正数，返回+1；
    参数为负数，返回-1；
    参数为0，返回0；
    参数为-0，返回-0;
	其他值，返回NaN。*/




}

