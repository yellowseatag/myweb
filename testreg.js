{
	/*var regex = new RegExp(/xyz/, 'i');
	console.log(regex);*/

	/*
	*字符串对象共有4个方法，可以使用正则表达式：match()、replace()、search()和split()。
	 ES6将这4个方法，在语言内部全部调用RegExp的实例方法，从而做到所有与正则相关的方法，全都定义在RegExp对象上。
	 	String.prototype.match 调用 RegExp.prototype[Symbol.match]
	 	String.prototype.replace 调用 RegExp.prototype[Symbol.replace]
	 	String.prototype.search 调用 RegExp.prototype[Symbol.search]
	 	String.prototype.split 调用 RegExp.prototype[Symbol.split]
	 * */
	/*
	*正确计算字符的长度
	*/
	/*var s = '𠮷𠮷';
	function codePointLength(text) {
		var result = text.match(/[\s\S]/gu);
		return result ? result.length : 0;
	}
	console.log(codePointLength(s)); // 2*/

	// ES5的source属性 返回正则表达式的正文   /abc/ig.source	 // "abc"
	// ES6的flags属性/返回正则表达式的修饰符	/abc/ig.flags	// 'gi'


}