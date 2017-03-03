<?php
/**
 * 模板驱动
 *
 * 模板驱动，模板引擎
 *
 *
 */

class Tpl{
	/**
	 * 输出模板内容的数组，其他的变量不允许从程序中直接输出到模板
	 */
	private static $output_value = array();
	/**
	 * 默认layout
	 */
	private static $layout_name= '';
	/**
	 * 设置布局
	 *
	 */
	public static function setLayout($layout){
		self::$layout_name = $layout;
		return true;
	}
	/**
	 * 抛出变量
	 *
	 */
	public static function data($output,$input=''){
		self::$output_value[$output] = $input;
	}
	/**
	 * 调用显示模板
	 *
	 * @param string $page_name
	 * @param string $layout
	 */
	public static function show($view_name='',$output_array=null){
		$tpl_file = BASE_APP_PATH.'/template/'.$view_name.'.tpl.php';
		$data= self::$output_value;
		if(!empty($output_array)){$data=array_merge($data,$output_array);}
		@header("Content-Type: text/html; charset=utf-8");
		if (empty(self::$layout_name)){
			if(!@include_once($tpl_file)) exit( 'Tpl ERROR:'.'can not include page');
		}else {
			if(!@include_once(BASE_APP_PATH.'/template/layout/'.self::$layout_name.'.layout.php')) exit( 'Tpl ERROR:'.'can not include layout');
		}
	}
}
