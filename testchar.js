{
	/* 
	ES6为字符串添加了遍历器接口，
	使得字符串可以被for...of循环遍历。
	*/
	
	/* let texts='𠮷吉祥如意';
	let num=0;
	for(let i of texts){
		num++;
	} */
	
	/* 
	传统上，JavaScript只有indexOf方法，可以用来确定一个字符串
	是否包含在另一个字符串中。ES6又提供了三种新方法。
	includes()：返回布尔值，表示是否找到了参数字符串。
	startsWith()：返回布尔值，表示参数字符串是否在源字符串的头部。
	endsWith()：返回布尔值，表示参数字符串是否在源字符串的尾部。
	*/
	
	/* var s = 'Hello world!';
	s.startsWith('Hello') // true
	s.endsWith('!') // true
	s.includes('o') // true 这三个方法都支持第二个参数，表示开始搜索的位置。
	
	s.startsWith('world', 6) // true
	s.endsWith('Hello', 5) // true
	s.includes('Hello', 6) // false */
	
	/* 上面代码表示，使用第二个参数n时，endsWith的行为与其他两个方法有所不同。
		它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束。 */
	
	/* 
	Repeat()方法返回一个新字符串，
	表示将原字符串重复n次。
	*/
	
	//let rep = '2.9'.repeat(3.1);
	
	/* 如果某个字符串不够指定长度，会在头部或尾部补全。
	padStart()用于头部补全，padEnd()用于尾部补全。 */
	
	/* var x='101'.padStart(5, '0');//00101
		'x'.padEnd(5, 'ab') // 'xabab'
		'12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
		'09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12" */
	
	/* 
	模板字符串（template string）是增强版的字符串，用反引号（`）标识。
	它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。
	上面代码中的模板字符串，都是用反引号表示。如果在模板字符串中需要使用反引号
	，则前面要用反斜杠转义。
	*/

	/*// 普通字符串
		var chars=`In JavaScript '\n' is a line-feed.`;
	// 多行字符串
		var charss=`In JavaScript this is
		not legal.`;
	// 字符串中嵌入变量
		var name = "Bob", time = "today";
		var charsss=`Hello ${name}, how are you ${time}?`
		 console.log(chars,charss,charsss);
		//模板字符串之中还能调用函数。
		function fn() {
			return "Hello World";
		}
		`foo ${fn()} bar`// foo Hello World bar*/
	/*const tmpl = addrs =>
	`<table>
		${addrs.map(addr => 
		`<tr>
			<td>${addr.first}</td>
		</tr>
		<tr>
			<td>${addr.last}</td>
		</tr>`
		).join('')}
	</table>`;
	const data = [
		{ first: '<Jane>', last: 'Bond' },
		{ first: 'Lars', last: '<Croft>' },
	];

	console.log(tmpl(data));*/
	/*var obj = {x: 1, y: 2};
	console.log(`${obj.x}${obj.y}`)*/
	/*let str='console.log(`hello ${name}!`)';
	let func=new Function('name',str);
	func('jack');*/

	/*
	*模板编译
	*/
	/*var template=`
	<ul>
		<% for(var i=0;i < data.supplies.length;i++){%>
		<li><%=data.supplies[i] %></li>
		<%}%>
	</ul>
	`;
	function compile(template){
		var evalExpr = /<%=(.+?)%>/g;
		var expr = /<%([\s\S]+?)%>/g;

		template = template
			.replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
			.replace(expr, '`); \n $1 \n  echo(`');

		template = 'echo(`' + template + '`);';

		var script =
			`(function parse(data){
				var output = "";
			
				function echo(html){
				  output += html;
				}
			
				${ template }
			
				return output;
			  })`;
		return script;
	}
	var parse = eval(compile(template));
	var texts = parse({ supplies: [ "broom", "mop", "cleaner" ] });
	console.log(texts);*/

	/*标签模板 标签模板其实不是模板，而是函数调用的一种特殊形式。
	“标签”指的就是函数，紧跟在后面的模板字符串就是它的参数。*/
	/*var a=5,b=10;
	function tag(s,...v) {
		var output='';
		for(var index=0;index<v.length;index++){
			output+=s[index]+v[index]
		}
		output+=s[index];
		return output;
	}
	var res=tag`hello ${a+b} ${b-1} word ${a*b}`;
	console.log(res);*/
	/*
	 “标签模板”的一个重要应用，就是过滤HTML字符串，
	 防止用户输入恶意内容。
	*/
	/*var sender='<>jack';
	var message=saferHtml`<p>${sender} has sent you a message.</p>`;
		function saferHtml(templateData) {

			var s=templateData[0];
			for(var i=1;i<arguments.length;i++){
				var arg=String(arguments[i]);
				s+=arg.replace(/&/g,"&amp;")
					.replace(/</g, "&lt;")
					.replace(/>/g, "&gt;");
				s+=templateData[i];
			}
			return s;
		}
		console.log(message);*/
	/*var name='hhb';
	tag`First line ${name} Second line`;

	function tag(strings) {
		console.log(strings.raw);
		// "First line\\nSecond line"
	}*/

}