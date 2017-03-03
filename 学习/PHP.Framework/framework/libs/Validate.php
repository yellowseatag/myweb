<?php
/**
 * 验证类
 */

Class Validate{

	//是否身份证
	public static function isIDCard($id){
		$len = strlen($id);
		if($len != 18) {
			return 0;
		}
		$a=str_split($id,1);
		$w=array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2);
		$c=array(1,0,'X',9,8,7,6,5,4,3,2);
		$sum = 0;
		for($i=0;$i<17;$i++){
			$sum= $sum + $a[$i]*$w[$i];
		}
		$r=$sum%11;
		$res=$c[$r];
		if ($res == $a[17]) {
			return 1;
		} else {
			return 0;
		}
		//return preg_match("/(^\d{15}$)|(^\d{17}\d|x|X$)/",$str);
	}
	//是否Email
    public static function isEmail($str){
		return preg_match('/^([\\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\\.[a-zA-Z0-9_-])+/',$str);
	}
	//是否手机号
	public static function isMobile($str){
		return preg_match("/^13[0-9]{9}$|15[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$/",$str);
		//return preg_match("/^1\d{10}$/",$str);
	}

//	/**
//	 * 存放验证信息
//	 *
//	 * @var array
//	 */
//	public $validateparam = array();
//	/**
//	 * 验证规则
//	 *
//	 * @var array
//	 */
//	private $validator = array(
//		"email"=>'/^([.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\\.[a-zA-Z0-9_-])+/',
//		"phone"=>'/^(([0-9]{2,3})|([0-9]{3}-))?((0[0-9]{2,3})|0[0-9]{2,3}-)?[1-9][0-9]{6,7}(-[0-9]{1,4})?$/',
//		"mobile"=>'/^1[0-9]{10}$/',
//		"url"=>'/^http:(\\/){2}[A-Za-z0-9]+.[A-Za-z0-9]+[\\/=?%-&_~`@\\[\\]\':+!]*([^<>\"\"])*$/',
//		"currency"=>'/^[0-9]+(\\.[0-9]+)?$/',
//		"number"=>'/^[0-9]+$/',
//		"zip"=>'/^[0-9][0-9]{5}$/',
//		"qq"=>'/^[1-9][0-9]{4,8}$/',
//		"integer"=>'/^[-+]?[0-9]+$/',
//		"integerpositive"=>'/^[+]?[0-9]+$/',
//		"double"=>'/^[-+]?[0-9]+(\\.[0-9]+)?$/',
//		"doublepositive"=>'/^[+]?[0-9]+(\\.[0-9]+)?$/',
//		"english"=>'/^[A-Za-z]+$/',
//		"chinese"=>'/^[\x80-\xff]+$/',
//		"username"=>'/^[\\w]{3,}$/',
//		"nochinese"=>'/^[A-Za-z0-9_-]+$/',
//	);
}
?>
