<?php
//文件缓存
class FileCache{

	private static function _cachefile($key){
		return BASE_STORAGE_PATH.DS."cache".DS.$key.".php";
	}

	private static function write_file($filepath, $data, $mode = null)
	{
		if (!is_array($data) && !is_scalar($data)) {
			return false;
		}
		$data = var_export($data, true);
		$data = "<?php  return ".$data.";";
		$mode = $mode == 'append' ? FILE_APPEND : null;
		if (false === file_put_contents($filepath,($data),$mode)){
			return false;
		}else{
			return true;
		}
	}

	public static function get($key){
		$filename = realpath(self::_cachefile($key));
		if (is_file($filename)){
			return require($filename);
		}else{
			return false;
		}
	}

	public static function set($key, $value){
		if (false ==self::write_file(self::_cachefile($key),$value)){
			return false;
		}else{
			return true;
		}
	}

	public static function del($key){
		$filename = realpath(self::_cachefile($key));
		if (is_file($filename)) {
			@unlink($filename);
		}else{
			return false;
		}
		return true;
	}
}

