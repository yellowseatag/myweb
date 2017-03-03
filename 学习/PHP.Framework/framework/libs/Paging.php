<?php
/**
 * 分页类
 */
class Paging{

	private static $page=null;

	private static function _obj(){
		if(self::$page==null){
			self::$page=new Page();
		}
		return self::$page;
	}
	/*
	 * 设置每页条数
	 */
	public static function setEachNum($num){
		self::_obj()->set("each_num",$num);
	}
	/*
	 * 设置数据量
	 */
	public static function setIsLast($is){
		self::_obj()->set("is_last",$is);
	}
	/*
	 * 设置总条数
	 */
	public static function setTotalNum($num){
		self::_obj()->set("total_num",$num);
	}
	/*
	 * 设置总条数
	 */
	public static function setIsTotal($is){
		self::_obj()->set("is_get_total",$is);
	}
	/*
	 * 输出分页条
	 */
	public static function bar(){
		echo self::_obj()->showBar();
	}

   /*
    * 获取分页信息
    */
	public static function info(){
		return self::_obj()->getInfo();
	}
	/*
	 * select limit 开始值
	 */
	public static function getLimitStart(){
		return self::_obj()->getLimitStart();
	}
	/*
	 * 获取每页条数
	 */
	public static function getEachNum(){
		return self::_obj()->get("each_num");
	}
	/*
	 * 获取数据量
    */
	public static function getDataNum(){
		return self::_obj()->get("data_num");
	}

	/*
	 * 获取总数量
	 */
	public static function getTotalNum(){
		return self::_obj()->get("total_num");
	}
	/*
	 * 获取当前页
	 */
	public static function getNowPage(){
		return self::_obj()->get("now_page");
	}
    /*
     * 获取总共页
     */
	public static function getTotalPage(){
		return self::_obj()->get("total_page");
	}
	/*
	 * 是否获取总数
	 */
	public static function isGetTotal(){
		return self::_obj()->get("is_get_total");
	}
	/*
	 * 是否最后一条
	 */
	public static function isLast(){
		return self::_obj()->get("is_last");
	}
}


class Page{
	/**
	 * url参数中页码参数名
	 */
	private $page_name = '_page_';
	/**
	 * 信息总数
	 */
	private $total_num =1;
	/**
	 * 页码链接
	 */
	private $page_url = '';
	/**
	 * 每页信息数量
	 */
	private $each_num = 10;

	/**
	 * 当前页码
	 */
	private $now_page = 1;
	/**
	 * 设置页码总数
	 */
	private $total_page = 1;

	/**
	 * 是否获取总数
	 */
	private $is_get_total=true;
	/**
	 * 实际获取信息数量
	 */
	private $is_last=false;


	public function __construct(){
		$this->now_page=intval($_GET[$this->page_name]);
		if($this->now_page==0){
			$this->now_page=1;
		}
		$this->setPageUrl();
	}
	public function get($key){
		return $this->$key;
	}
	public function set($key,$value){
		return $this->$key = $value;
	}

	public function getLimitStart(){
		if ($this->now_page <= 1){
			$tmp = 0;
		}else {
			$tmp = ($this->now_page-1)*$this->each_num;
		}
		return $tmp;
	}

	public function setTotalPage(){
		$this->total_page =intval(ceil($this->total_num/$this->each_num));
	}
    /*
     * 输出信息集合
     */
	public function getInfo(){
		if($this->is_get_total){
			$this->setTotalPage();
			return array("total_page"=>$this->total_page,"total_num"=>$this->total_num,"each_num"=>$this->each_num,"now_page"=>$this->now_page);
		}else{
			return array("each_num"=>$this->each_num,"now_page"=>$this->now_page,"is_last"=>$this->is_last);
		}
	}
	/*
	 * 输出html
	 */
	public function showBar(){
		$html_page = '';
		if($this->is_get_total){
			$this->setTotalPage();
			$html_page .= '<ul class="pagination">';
			if ($this->now_page>$this->total_page||$this->now_page <= 1){
				$html_page .= '<li class="disabled"><a href="javascript:void(0);">首页</a></li>';
				$html_page .= '<li class="disabled"><a href="javascript:void(0);">上一页</a></li>';
			}else {
				$html_page .= '<li><a href="'. $this->page_url .'1">首页</a></li>';
				$html_page .= '<li><a href="'. $this->page_url . ($this->now_page-1) .'">上一页</a></li>';
			}
			$html_page .= $this->getNowBar();
			if ($this->now_page >= $this->total_page || $this->total_page == 0){
				$html_page .= '<li class="disabled"><a href="javascript:void(0);">下一页</a></li>';
				$html_page .= '<li class="disabled"><a href="javascript:void(0);">末页</a></li>';
			}else {
				$html_page .= '<li><a href="'. $this->page_url . ($this->now_page+1) .'">下一页</a></li>';
				$html_page .= '<li><a href="'. $this->page_url . $this->total_page .'">末页</a></li>';
			}
			$html_page .= '</ul>';
		}else{
			$html_page .= '<ul class="pager">';
			if ($this->now_page <= 1){
				$html_page .= '<li class="previous disabled"><a href="javascript:void(0);">上一页</a></li>';
			}else {
				$html_page .= '<li class="previous"><a  href="'. $this->page_url . ($this->now_page-1) .'">上一页</a></li>';
			}
			if ($this->is_last){
				$html_page .= '<li class="next disabled"><a href="javascript:void(0);">下一页</a></li>';
			}else {
				$html_page .= '<li class="next"><a href="'. $this->page_url . ($this->now_page+1) .'">下一页</a></li>';
			}
			$html_page .= '</ul>';
		}
		return $html_page;
	}
	/**
	 * 页码条内容
	 * 样式为： 前面2个页码 ... 中间7个页码 ...
	 *
	 */
	private function getNowBar(){
		$now_index=$this->now_page;
		if($now_index>$this->total_page){
			$now_index=1;
		}
		if ($now_index >= 7){
			$begin =$now_index-2;
		}else {
			$begin = 1;
		}
		if ($now_index+5 < $this->total_page){
			$end =$now_index+5;
		}else {
			$end = $this->total_page;
		}
		$result = '';
		if ($begin > 1){
			$result .= $this->setPageHtml(1,1).$this->setPageHtml(2,2);
			$result .= '<li><span>...</span></li>';
		}
		for ($i=$begin;$i<=$end;$i++){
			$result .= $this->setPageHtml($i,$i);
		}
		if ($end < $this->total_page){
			$result .='<li><span>...</span></li>';
		}
		return $result;
	}

	/**
	 * 设置单个页码周围html代码
	 */
	private function setPageHtml($page_name,$page){
		/**
		 * 判断是否是当前页
		 */
		if ($this->now_page== $page){
			$result = "<li class='active'><a href='javascript:void(0);'>".$page."</a></li>";
		}else {
			$result = "<li><a href='". $this->page_url . $page ."'>".$page_name."</a></li>";
		}
		return $result;
	}

	/**
	 * 取url地址
	 */
	private function setPageUrl(){
		if(!stripos($_SERVER['REQUEST_URI'],'?')){
			$this->page_url = $_SERVER['REQUEST_URI']."?".$this->page_name."=";
		}else{
			if(stripos($_SERVER['QUERY_STRING'],$this->page_name.'=')){
				$this->page_url = str_replace($this->page_name.'='.$this->now_page,'',$_SERVER['REQUEST_URI']);
				$last = $this->page_url[strlen($this->page_url)-1];
				if($last=='?' || $last=='&'){
					$this->page_url .= $this->page_name."=";
				}else{
					$this->page_url .= '&'.$this->page_name."=";
				}
			}else{
				$this->page_url = $_SERVER['REQUEST_URI'].'&'.$this->page_name.'=';
			}
		}
		return true;
	}

}
