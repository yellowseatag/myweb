<?php
/**
 * mysqli驱动
 */
class DB{

	private static $link = array();

	private static $iftransacte = true;

	private static function connect($host){
		if (is_object(self::$link[$host])) return;
		$conf = C('db.'.$host);
		self::$link[$host] = @new mysqli($conf['dbhost'], $conf['dbuser'], $conf['dbpwd'], $conf['dbname'], $conf['dbport']);
		if (mysqli_connect_errno()){
			ThrowException("DB Error: database({$host}) connect failed",E_ERROR);
		}
		$query_string = "SET CHARACTER_SET_CLIENT = utf8mb4,
		                 CHARACTER_SET_CONNECTION = utf8mb4,
		                 CHARACTER_SET_DATABASE = utf8mb4,
		                 CHARACTER_SET_RESULTS = utf8mb4,
		                 CHARACTER_SET_SERVER = utf8mb4,
		                 COLLATION_CONNECTION = utf8mb4_general_ci,
		                 COLLATION_DATABASE = utf8mb4_general_ci,
		                 COLLATION_SERVER = utf8mb4_general_ci,
		                 sql_mode=''";
		//进行编码声明
		if (!self::$link[$host]->query($query_string)){
			ThrowException("DB Error: database({$host}) ".mysqli_error(self::$link[$host]),E_ERROR);
		}
	}
	/**
	 * 执行SQL语句
	 *
	 */
	public static function execute($sql, $host){
		self::connect($host);
		$query = self::$link[$host]->query($sql);
		if ($query === false){
			ThrowException("DB Error: database({$host}) ".mysqli_error(self::$link[$host])."\n【SQL】".$sql,E_ERROR);
			return false;
		}else {
			return $query;
		}
	}
    /**
     * ping
     */
    public static function ping($host) {
		if (is_object(self::$link[$host]) && !self::$link[$host]->ping()) {
            self::$link[$host]->close();
            self::$link[$host] = null;
        }
    }
	/**
	 * 多个查询
	 */
	public static function multi_query2data($sql, $host){
		self::connect($host);
		if (self::$link[$host]->multi_query($sql)) {
			$array = array();
			while (true) {
				if ($result=self::$link[$host]->store_result()) {
					while ($tmp=mysqli_fetch_array($result,MYSQLI_ASSOC)){
						$array[] = $tmp;
					}
					$result->free();
				}
				if (self::$link[$host]->more_results()) {
					self::$link[$host]->next_result();
				} else {
					break;
				}
			}
			return $array;
		}else{
			$error = 'Db Error: '.mysqli_error(self::$link[$host]);
			Log::record($error."\r\n".$sql);
			return array();
		}
	}
	/**
	 * 取得数组
	 *
	 */
	public static function query2data($sql, $host){
		$result = self::execute($sql, $host);
		if ($result === false) return array();
		$array = array();
		while ($tmp=mysqli_fetch_array($result,MYSQLI_ASSOC)){
			$array[] = $tmp;
		}
		return $array;
	}
	/**
	 * 取得上一步插入产生的ID
	 */
	public static function getLastInsertId($host){
		self::connect($host);
		return mysqli_insert_id(self::$link[$host]);
	}

	/**
	 * 取得服务器信息
	 */
	public static function getServerInfo($host){
		self::connect($host);
		$result = mysqli_get_server_info(self::$link[$host]);
		return $result;
	}
	/**
	 * 开始事务
	 */
    public static function beginTrans($host){
    	self::connect($host);
    	if (self::$iftransacte){
    		self::$link[$host]->autocommit(false);//关闭自动提交
    	}
    	self::$iftransacte = false;
    }
	/**
	 * 提交事务
	 */
    public static function commit($host){
    	if (self::$iftransacte) return;
		$result = self::$link[$host]->commit();
		self::$link[$host]->autocommit(true);//开启自动提交
		self::$iftransacte = true;
		if (!$result){
			ThrowException("TRANSACTION COMMIT DB Error: database({$host})  ".mysqli_error(self::$link[$host]),E_ERROR);
		}
    }
	/**
	 * 事务回滚
	 */
    public static function rollback($host){
    	if (self::$iftransacte) return;
		$result = self::$link[$host]->rollback();
		self::$link[$host]->autocommit(true);
		self::$iftransacte = true;
		if (!$result){
			ThrowException("TRANSACTION ROLLBACK DB Error: database({$host})  ".mysqli_error(self::$link[$host]),E_ERROR);
		}
    }
}
