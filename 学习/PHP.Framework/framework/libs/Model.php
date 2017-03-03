<?php
/**
 * 核心文件
 *
 * 模型类
 *
 */

class Model{

    protected static $model_pool=array();

    private $options=array();

    private $db=null;

    public function __construct($host="0"){
		$this->db = new ModelDb($host);
    }

    public function __call($method,$args) {
        if(in_array(strtolower($method),array('field','table','order','where','on','join','limit','having','group','lock','master','distinct','index','attr'),true)) {
            if(empty($args[0])){
                return $this;
            }
            $this->options[strtolower($method)] =$args[0];
            return $this;
        }else{
            ThrowException('Model Error:  Function '.$method.' is not exists!');
        }
    }
    public function page($num,$is_total=false){
        if(empty($num)){
            return $this;
        }
        Paging::setIsTotal($is_total);
        Paging::setEachNum($num);
        if($is_total){
            Paging::setTotalNum($this->_getval('COUNT(*) AS _count_'));
        }
        $this->options['page']=true;
        $this->options['limit'] = Paging::getLimitStart().",".(Paging::getEachNum()+($is_total?0:1));
        return $this;
    }
    public function getLastInsertId() {
        return $this->db->getLastInsertId();
    }
    public function select(){
        $resultSet = $this->db->select($this->options);
        if ($this->options['page']&&!Paging::isGetTotal()) {
            if (count($resultSet) <= Paging::getEachNum()) {
                Paging::setIsLast(true);
            }else{
                //去除最后一条记录
                array_pop($resultSet);
            }
        }
        $this->options=array();//清空
        return $resultSet;
    }
    public function get(){
        $this->options['limit'] = 1;
        $result = $this->db->select($this->options);
        $this->options=array();//清空
        if(empty($result)) {
            return array();
        }
        return $result[0];
    }
    private function _getval($field,$isclear_options=false){
        if(empty($field)){
            return null;
        }
        $options=$this->options;
        $options['field'] = $field;
        $options['limit'] = 1;
        $result = $this->db->select($options);
        if($isclear_options){
            $this->options=array();
        }
        if(!empty($result)) {
            return reset($result[0]);
        }
        return null;
    }
    public function getval($field) {
        return $this->_getval($field,true);
    }
    public function count(){
        return $this->getval('COUNT(*) AS _count_');
    }
    public function insert($data){
        if(empty($data)) return false;
        $result = $this->db->insert($data,$this->options,false);
        $this->options=array();
        return $result;
    }
    public function insertDuplicateUpdate($data,$update_data){
        if(empty($data)) return false;
        $result=$this->db->insertDuplicateUpdate($data,$this->options,$update_data);
        $this->options=array();
        return $result;
    }
    public function replace($data){
        if(empty($data)) return false;
        $result = $this->db->insert($data,$this->options,true);
        $this->options=array();
        return $result;
    }
    public  function  update($data){
        $result = $this->db->update($data,$this->options);
        $this->options=array();
        return $result;
    }
    public function delete(){
        $result=$this->db->delete($this->options);
        $this->options=array();
        return $result;
    }
    public function insertAll($dataList,$replace=false){
        if(empty($dataList)) return false;
        // 写入数据到数据库
        $result = $this->db->insertAll($dataList,$this->options,$replace);
        $this->options=array();
        if(false !== $result ) return true;
        return $result;
    }
    public function insertDuplicateUpdateAll($dataList,$update_data){
        if(empty($dataList)) return false;
        $result = $this->db->insertDuplicateUpdateAll($dataList,$this->options,$update_data);
        $this->options=array();
        if(false !== $result ) return true;
        return false;
    }
    //工厂模式创建对象
    public static function getInstance(){
        $class_name=get_called_class();
        if(isset(static::$model_pool[$class_name])){
            return static::$model_pool[$class_name];
        }
        return static::$model_pool[$class_name]=new static();
    }

}
/**
 * 完成模型SQL组装
 *
 */
class ModelDb{

    private $db_host;

    public function __construct($host="0")
    {
        $this->db_host=$host;
    }
    protected $comparison      = array('eq'=>'=','neq'=>'<>','gt'=>'>','egt'=>'>=','lt'=>'<','elt'=>'<=','notlike'=>'NOT LIKE','like'=>'LIKE','in'=>'IN','not in'=>'NOT IN');
    // 查询表达式
    protected $selectSql  =     'SELECT%DISTINCT% %FIELD% FROM %TABLE%%INDEX%%JOIN%%WHERE%%GROUP%%HAVING%%ORDER%%LIMIT% %UNION%';

    public function select($options=array()) {
		$sql = $this->buildSelectSql($options);
        return DB::query2data($sql,$this->db_host);
    }

    public function buildSelectSql($options=array()) {
        $sql  = $this->parseSql($this->selectSql,$options);
        $sql .= $this->parseLock(isset($options['lock'])?$options['lock']:false);
        return $sql;
    }

    public function parseSql($sql,$options=array()){
        $sql   = str_replace(
            array('%TABLE%','%DISTINCT%','%FIELD%','%JOIN%','%WHERE%','%GROUP%','%HAVING%','%ORDER%','%LIMIT%','%UNION%','%INDEX%'),
            array(
                $this->parseTable($options),
                $this->parseDistinct(isset($options['distinct'])?$options['distinct']:false),
                $this->parseField(isset($options['field'])?$options['field']:'*'),
                $this->parseJoin(isset($options['on'])?$options:array()),
                $this->parseWhere(isset($options['where'])?$options['where']:''),
                $this->parseGroup(isset($options['group'])?$options['group']:''),
                $this->parseHaving(isset($options['having'])?$options['having']:''),
                $this->parseOrder(isset($options['order'])?$options['order']:''),
                $this->parseLimit(isset($options['limit'])?$options['limit']:''),
                //$this->parseUnion(isset($options['union'])?$options['union']:''),
                $this->parseIndex(isset($options['index'])?$options['index']:'')
            ),$sql);
        return $sql;
    }

	protected function parseUnion(){
		return '';
	}

	protected function parseLock($lock=false) {
	    if(!$lock) return '';
	    return ' FOR UPDATE ';
	}

	protected function parseIndex($value){
		return empty($value) ? '':' USE INDEX ('.$value.') ';
	}

    protected function parseValue($value) {
        if(is_string($value) || is_numeric($value)) {
            return  '\''.$this->escapeString($value).'\'';
        }
        if(is_array($value)) {
            if($value[0]==="exp"&&is_string($value[1])){
                return $value[1];
            }
            return array_map(array($this, 'parseValue'),$value);
        }
        if(is_null($value)){
            return  'NULL';
        }
        return $value;
    }

    protected function parseField($fields) {
        if(is_string($fields) && strpos($fields,',')) {
            $fields    = explode(',',$fields);
        }
        if(is_array($fields)) {
            //字段别名定义
            $array   =  array();
            foreach ($fields as $key=>$field){
                if(!is_numeric($key))
                    $array[] =  $key.' AS '.$field;
                else
                    $array[] =  $field;
            }
            $fieldsStr = implode(',', $array);
        }elseif(is_string($fields) && !empty($fields)) {
            $fieldsStr = $fields;
        }else{
            $fieldsStr = '*';
        }
        return $fieldsStr;
    }

    protected function parseTable($options) {
    	if ($options['on']) return null;
    	$tables = $options['table'];
        if(is_array($tables)) {// 别名定义
            $array   =  array();
            foreach ($tables as $table=>$alias){
                if(!is_numeric($table))
                    $array[] =  $table.' '.$alias;
                else
                    $array[] =  $table;
            }
            $tables  =  $array;
        }elseif(is_string($tables)){
            $tables  =  explode(',',$tables);
        }
        return implode(',',$tables);
    }

    protected function parseWhere($where) {
        $whereStr = '';
        if(is_array($where)&&!empty($where)){
            foreach ($where as $key=>$val){
                $whereStrTemp = '';
                $key = trim($key);
                // 多条件支持   更高级模式   (a|b)&(c|d)
                if((strpos($key,'|')||strpos($key,'&'))&&is_array($val)){
                    $multi_keys=array();
                    preg_match_all('/[^\(^\)^|^&]+/',$key ,$multi_keys);
                    $m_strs=array();
                    $r_keys=array();
                    $r_clones=array();
                    foreach($multi_keys[0] as $m=>$k){
                        $m_strs[]=$this->parseWhereItem($k,$val[$m]);
                        $r_keys[]="/".$k."/";
                        $r_clones[]="{".$m."}";
                    }
                    $whereStrTemp.=str_replace(array("&","|"),array(" AND "," OR "),str_replace($r_clones,$m_strs,preg_replace($r_keys,$r_clones,$key,1)));
                }else{
                    $whereStrTemp   .= $this->parseWhereItem($key,$val);
                }
                if(!empty($whereStrTemp)) {
                    $whereStr .= '( '.$whereStrTemp.' )AND';
                }
            }
            $whereStr = substr($whereStr,0,-3);
        }
        return empty($whereStr)?'':' WHERE '.$whereStr;
    }

    // where子单元分析
    protected function parseWhereItem($key,$val) {
        $whereStr = '';
        if(is_array($val)) {
            if(preg_match('/^(EQ|NEQ|GT|EGT|LT|ELT|NOTLIKE|LIKE)$/i',$val[0])) { // 比较运算
                $whereStr .= $key.' '.$this->comparison[strtolower($val[0])].' '.$this->parseValue($val[1]);
            }elseif('exp'==strtolower($val[0])){ // 使用表达式
                $whereStr .= $val[1];
            }elseif('in'==strtolower($val[0])){ // IN 运算
                if (empty($val[1])){
                    $whereStr .= $key.' '.strtoupper($val[0]).'(\'\')';
                }elseif(is_string($val[1]) || is_numeric($val[1])) {
                     $val[1] =  explode(',',$val[1]);
                     $zone   =   implode(',',$this->parseValue($val[1]));
                     $whereStr .= $key.' '.strtoupper($val[0]).' ('.$zone.')';
                }elseif(is_array($val[1])){
                    $zone   =   implode(',',$this->parseValue($val[1]));
                    $whereStr .= $key.' '.strtoupper($val[0]).' ('.$zone.')';
                }
            }elseif(preg_match('/BETWEEN/i',$val[0])){
                $data = is_string($val[1])? explode(',',$val[1]):$val[1];
                if($data[0] && $data[1]) {
                    $whereStr .=  ' ('.$key.' '.strtoupper($val[0]).' '.$this->parseValue($data[0]).' AND '.$this->parseValue($data[1]).' )';
                } elseif ($data[0]) {
                    $whereStr .= $key.' '.$this->comparison['gt'].' '.$this->parseValue($data[0]);
                } elseif ($data[1]) {
                    $whereStr .= $key.' '.$this->comparison['lt'].' '.$this->parseValue($data[1]);
                }
            }elseif(preg_match('/TIME/i',$val[0])){
                $data = is_string($val[1])? explode(',',$val[1]):$val[1];
                if($data[0] && $data[1]) {
                    $whereStr .=  ' ('.$key.' BETWEEN '.$this->parseValue($data[0]).' AND '.$this->parseValue($data[1] + 86400 -1).' )';
                } elseif ($data[0]) {
                    $whereStr .= $key.' '.$this->comparison['gt'].' '.$this->parseValue($data[0]);
                } elseif ($data[1]) {
                    $whereStr .= $key.' '.$this->comparison['lt'].' '.$this->parseValue($data[1] + 86400);
                }
            }else{
                ThrowException( 'Model Error: args '.$val[0].' is error!');
            }
        }else {
        	$whereStr .= $key.' = '.$this->parseValue($val);
        }
        return $whereStr;
    }

    protected function parseLimit($limit) {
        return !empty($limit)?   ' LIMIT '.$limit.' ':'';
    }

    protected function parseJoin($options = array()) {
        $joinStr = '';
        if (false === strpos($options['table'],',')) return null;
        $table = explode(',',$options['table']);
        $on = explode(',',$options['on']);
        $join = explode(',',$options['join']);
        $joinStr .= $table[0];
		for($i=0;$i<(count($table)-1);$i++){
        	$joinStr .= ' '.($join[$i]?$join[$i].' JOIN':'LEFT JOIN').' '.$table[$i+1].' ON '.($on[$i]?$on[$i]:'');
        }
        return $joinStr;
    }

    public function delete($options=array()) {
        $sql   = 'DELETE '.$this->parseAttr($options).' FROM '
            .$this->parseTable($options)
            .$this->parseWhere(isset($options['where'])?$options['where']:'')
            .$this->parseOrder(isset($options['order'])?$options['order']:'')
            .$this->parseLimit(isset($options['limit'])?$options['limit']:'');
            if (stripos($sql,'where') === false && $options['where'] !== true){
            	//防止条件传错，删除所有记录
            	return false;
            }
        return DB::execute($sql,$this->db_host);
    }

    public function update($data,$options) {
        $sql   = 'UPDATE '
        	.$this->parseAttr($options)
            .$this->parseTable($options)
            .$this->parseSet($data)
            .$this->parseWhere(isset($options['where'])?$options['where']:'')
            .$this->parseOrder(isset($options['order'])?$options['order']:'')
            .$this->parseLimit(isset($options['limit'])?$options['limit']:'');
            if (stripos($sql,'where') === false && $options['where'] !== true){
            	//防止条件传错，更新所有记录
            	return false;
            }
        return DB::execute($sql,$this->db_host);
    }

	public function parseAttr($options){
		if (isset($options['attr'])){
			if (in_array($options['attr'],array('LOW_PRIORITY','QUICK','IGNORE','HIGH_PRIORITY','SQL_CACHE','SQL_NO_CACHE'))){
				return $options['attr'].' ';
			}
		}else{
			return '';
		}
	}

	public function lockAttr($options){
		if (isset($options['attr'])){
			if (in_array($options['attr'],array('FOR UPDATE'))){
				return ' '.$options['attr'].' ';
			}
		}else{
			return '';
		}
	}

	public function clear($options){
		$sql = 'TRUNCATE TABLE '.$this->parseTable($options);
		return DB::execute($sql,$this->db_host);
	}

    public function insert($data,$options=array(),$replace=false) {
        $values  =  $fields    = array();
        foreach ($data as $key=>$val){
            $value   =  $this->parseValue($val);
            if(is_scalar($value)) {
                $values[]   =  $value;
                $fields[]     =$key;
            }
        }
        $sql   =  ($replace?'REPLACE ':'INSERT ').$this->parseAttr($options).' INTO '.$this->parseTable($options).' ('.implode(',', $fields).') VALUES ('.implode(',', $values).')';
        return DB::execute($sql,$this->db_host);
    }

    public function insertDuplicateUpdate($data,$options=array(),$update_data=array()){
        $values=$fields=array();
        foreach ($data as $key=>$val){
            $value=$this->parseValue($val);
            if(is_scalar($value)) {
                $values[]=$value;
                $fields[]=$key;
            }
        }
        $sql   =  'INSERT INTO '.$this->parseTable($options).' ('.implode(',', $fields).') VALUES ('.implode(',', $values).')'.$this->parseDuplicate($update_data);
        return DB::execute($sql,$this->db_host);
    }


    public function getLastInsertId() {
        return DB::getLastInsertId($this->db_host);
    }

    public function insertAll($datas,$options=array(),$replace=false) {
        if(!is_array($datas[0])) return false;
        $fields = array_keys($datas[0]);
        $values  =  array();
        foreach ($datas as $data){
            $value   =  array();
            foreach ($data as $key=>$val){
                $val   =  $this->parseValue($val);
                if(is_scalar($val)) {
                    $value[]   =  $val;
                }
            }
            $values[]    = '('.implode(',', $value).')';
        }
        $sql   =  ($replace?'REPLACE':'INSERT').' INTO '.$this->parseTable($options).' ('.implode(',', $fields).') VALUES '.implode(',',$values);
        return DB::execute($sql,$this->db_host);
    }
    /*
     * 插入重复时更新
     */
    public function insertDuplicateUpdateAll($datas,$options=array(),$update_data=array()){
        if(!is_array($datas[0])) return false;
        $fields = array_keys($datas[0]);
        $values  =  array();
        foreach ($datas as $data){
            $value   =  array();
            foreach ($data as $key=>$val){
                $val   =  $this->parseValue($val);
                if(is_scalar($val)) {
                    $value[]   =  $val;
                }
            }
            $values[]    = '('.implode(',', $value).')';
        }
        $sql   = 'INSERT INTO '.$this->parseTable($options).' ('.implode(',', $fields).') VALUES '.implode(',',$values).$this->parseDuplicate($update_data);
        return DB::execute($sql,$this->db_host);
    }

    protected function parseOrder($order) {
        if(is_array($order)) {
            $array   =  array();
            foreach ($order as $key=>$val){
                if(is_numeric($key)) {
                    $array[] =  $val;
                }else{
                    $array[] =  $key.' '.$val;
                }
            }
            $order   =  implode(',',$array);
        }
        return !empty($order)?  ' ORDER BY '.$order:'';
    }

    protected function parseGroup($group) {
        return !empty($group)? ' GROUP BY '.$group:'';
    }

    protected function parseHaving($having) {
        return  !empty($having)?   ' HAVING '.$having:'';
    }

    protected function parseDistinct($distinct) {
        return !empty($distinct)?   ' DISTINCT '.$distinct.',' :'';
    }

    protected function parseSet($data) {
        $set=array();
        foreach ($data as $key=>$val){
            $value   =  $this->parseValue($val);
            if(is_scalar($value))
                $set[]    = $key.'='.$value;
        }
        return ' SET '.implode(',',$set);
    }

    protected function parseDuplicate($data) {
        $set=array();
        foreach ($data as $key=>$val){
            $value   =  $this->parseValue($val);
            if(is_scalar($value))
                $set[]    = $key.'='.$value;
        }
        return ' ON DUPLICATE KEY UPDATE '.implode(',',$set);
    }

    public function escapeString($str) {
    	return addslashes($str);//防注入 加反斜杠
    }

    public function checkActive() {
    	Db::ping($this->db_host);
    }
}
