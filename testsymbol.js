{

	/*Symbol是一个原始类型的值，不是对象。也就是说，
	由于Symbol值不是对象，所以不能添加属性。基本上，
	它是一种类似于字符串的数据类型。*/
	let s=Symbol();
	//console.log(s.toString());
	let a={};
	a.h='hi';
	a[s]='hello';
	a[Symbol()]='world';
	/*Object.getOwnPropertySymbols方法返回一个数组，
	成员是当前对象的所有用作属性名的 Symbol 值。*/
	let objectSymbols=Object.getOwnPropertySymbols(a);
	//console.log(objectSymbols);
	/*Reflect.ownKeys方法可以返回所有类型的键名，包括常
	规键名和 Symbol 键名。*/
	let objectall=Reflect.ownKeys(a);
	//console.log(objectall);

	/*由于以 Symbol 值作为名称的属性，不会被常规方法遍历得到。
	我们可以利用这个特性，为对象定义一些非私有的、但又希望只
	用于内部的方法*/

	var size=Symbol('size');
	class Collection{
		constructor(){
			this[size]=0;
		}
		add(item){
			this[this[size]]=item;
			this[size]++;
		}
		static sizeOf(instance){
			return instance[size]
		}
	}
	var sizes=Symbol.for('sizes')
	//console.log(Symbol.keyFor(sizes));


	class MyArray extends Array {
		static get [Symbol.species]() { return Array; }
	}
	var e = new MyArray(1,2,3);
	var mapped = e.map(x => x * x);

	//console.log(mapped instanceof MyArray,mapped instanceof Array) // false true
}