/**
 * Created by Mcd on 2017/2/22.
 */
const FOO_KEY=Symbol('foo');
function A() {
    this.foo='hello';
}
if (!global[FOO_KEY]){
    global[FOO_KEY]=new A();
}
module.exports = global[FOO_KEY];
