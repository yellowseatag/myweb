<?php

/**
 * 取得系统配置信息
 */
function C($key){
    if (strpos($key,'.')){
        $key = explode('.',$key);
        $value = $GLOBALS['config'][$key[0]];
        if (isset($key[2])){
            return $value[$key[1]][$key[2]];
        }else{
            return $value[$key[1]];
        }
    }else{
        return $GLOBALS['config'][$key];
    }
}

function ThrowException($message,$code=0){
    throw new Exception($message,$code);
}
/**
 * 取得IP
 */
function GetIp(){
    static $ip;
    if(!empty($ip)){
        return $ip;
    }
    if(getenv("HTTP_CLIENT_IP") && strcasecmp(getenv("HTTP_CLIENT_IP"), "0.0.0.0")){
        $ip = getenv("HTTP_CLIENT_IP");
    }else if(getenv("HTTP_X_FORWARDED_FOR") && strcasecmp(getenv("HTTP_X_FORWARDED_FOR"), "0.0.0.0")){
        $ip = getenv("HTTP_X_FORWARDED_FOR");
    }else if(getenv("REMOTE_ADDR") && strcasecmp(getenv("REMOTE_ADDR"), "0.0.0.0")){
        $ip = getenv("REMOTE_ADDR");
    }else if(isset($_SERVER["REMOTE_ADDR"]) && $_SERVER["REMOTE_ADDR"] && strcasecmp($_SERVER["REMOTE_ADDR"],"0.0.0.0")){
        $ip = $_SERVER["REMOTE_ADDR"];
    }else{
        $ip = "0.0.0.0";
    }
    return $ip;
}
/**
 * 获取唯一码
 */
function Guid(){
    return md5($_SERVER['REMOTE_ADDR'].$_SERVER['REMOTE_PORT'].$_SERVER['HTTP_USER_AGENT'].uniqid(rand(),true));
}
/**
 * 不显示信息直接跳转
 */
function Redirect($url){
    header('Location: '.$url);
    exit();
}

/**
 * 获取上一步来源地址
 */
function GetReferer(){
    return empty($_SERVER['HTTP_REFERER'])?'':$_SERVER['HTTP_REFERER'];
}
/**
 * JSON方式输出
 */
function JsonOutput($is_success,$data="",$code=0){
    @header("Content-Type: application/json; charset=utf-8");
    if($is_success){
        exit(json_encode(array("code"=>$code,"success"=>true,"data"=>$data),JSON_UNESCAPED_UNICODE));
    }else{
        exit(json_encode(array("code"=>$code,"success"=>false,"error"=>$data),JSON_UNESCAPED_UNICODE));
    }
}
/**
 *获取数据键集合
 */
function DataKeys($key_name,$array,$is_unique=true){
    if(!is_array($array)) return $array;
    $results=array();
    foreach($array as $item){
        $results[]=$item[$key_name];
    }
    if($is_unique){
        return array_unique($results);
    }
    return $results;
}
/**
 *产生值键数据集合[{}]
 */
function DataKeyArray($key_name,$array,$is_multiple=false){
    if(!is_array($array)) return $array;
    $result_array=array();
    if($is_multiple){
        foreach($array as $item){
            $result_array[$item[$key_name]][]=$item;
        }
    }else{
        foreach($array as $item){
            $result_array[$item[$key_name]]=$item;
        }
    }
    return $result_array;
}
/**
 * 数据扩展
 */
function DataExtend(&$main_data,$main_join_field,$extend_data,$extend_join_feild,$extend_name){
    if(!is_array($main_data)||!is_array($extend_data)){
        return;
    }
    $key_extend_array=DataKeyArray($extend_join_feild,$extend_data);
    foreach($main_data as $i=>$item){
        $main_data[$i][$extend_name]=$key_extend_array[$item[$main_join_field]];
    }
}

function USER_AGENT_IsMobile(){
    static $is_mobile;
    if(!empty($is_mobile)) return $is_mobile==1;
    $mobileDetect=new Mobile_Detect();
    $is_mobile=$mobileDetect->isMobile()?1:2;
    return $is_mobile==1;
}