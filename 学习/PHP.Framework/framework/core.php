<?php
class core{
    public static function init()
    {
        self::start_session();
        self::inputFilter();
        self::route();
    }

    public static function autoload($class){
        $class_file=str_replace("\\","/",$class).".php";
        if(preg_match("/.+Model$/",$class)){
            if(@include_once(BASE_MODEL_PATH.DS.$class_file)) return;
            exit("Model Error:".$class." not exist");
        }
        @include_once(BASE_FRAMEWORK_PATH."/libs/".$class_file);
    }

    public static function exceptionHandler($callback=null){
        set_exception_handler(function(Throwable $e) use ($callback){
            if(IS_DEBUG){
                JsonOutput(false,$e->getMessage()."|".$e->getTraceAsString(),$e->getCode());
            }else{
                switch($e->getCode()){
                    case 1:$error_msg="服务器错误";Log::record($e->getMessage(),"EXCEPTION");break;
                    case 404:$error_msg="URI错误";break;
                    default:$error_msg=$e->getMessage();break;
                }
                if(is_callable($callback)){
                    $callback($e->getCode(),$error_msg);
                }else{
                    JsonOutput(false,$error_msg,$e->getCode());
                }
            }
        });
    }
    /*
     * 防XSS CSRF
     */
    private static function inputFilter(){
        if(PHP_SAPI=="cli") return;
//        if(empty($_COOKIE["csrf_token"])||$_COOKIE["csrf_token"]!=$_SERVER['HTTP_X_CSRF_TOKEN']){
//            header('HTTP/1.1 400 Bad Request');
//            exit("Csrf Token Error!");
//        }
        if($_SERVER['REQUEST_METHOD']=="GET"){
            $_GET = self::validForInput($_GET);
            $_REQUEST=$_GET;
            $_POST=array();
        }elseif($_SERVER['REQUEST_METHOD']=="POST"){
            $_GET =self::validForInput($_GET);
            $_POST =self::validForInput($_POST);
            $_REQUEST=array_merge($_POST,$_GET);
        }else{
            header('HTTP/1.1 400 Bad Request');
            exit("Http Method Invalid!");
        }
    }

    private static function validForInput($array){
        if (empty($array)) return array();
        while (list($k,$v) = each($array)) {
            if (is_string($v)) {
                $array[$k]= htmlspecialchars($v);
            } else if (is_array($v))  {
                $array[$k] =self::validForInput($v);
            }
        }
        return $array;
    }

    private static function start_session(){
        if(!defined("SESSION_START")||!SESSION_START) return;
        if(defined("SESSION_NAME")){
            session_name(SESSION_NAME);
        }else{
            session_name("_sess_");
        }
        if(defined("SESSION_TIMEOUT")){
            ini_set("session.gc_maxlifetime",SESSION_TIMEOUT);
        }
        ini_set("session.save_handler", "redis");
        $redis_conf=C("redis");
        ini_set("session.save_path", "tcp://{$redis_conf["host"]}:{$redis_conf["port"]}?persistent=1&timeout=2&database=".$redis_conf["session_db"]);
        session_start();
    }

    private static function route(){
        $control_file=BASE_APP_PATH.'/control/'.REQ_CONTROLLER.'.php';
        if(!file_exists($control_file)) ThrowException("Route Error: Control File ".$control_file." is not exists!",404);
        require_once($control_file);
        if (!class_exists($control=REQ_CONTROLLER."Control")) ThrowException("Route Error: Class ".$control." is not exists!",404);
        $act_obj=new $control();
        if (!method_exists($act_obj,$op_fun=REQ_ACCESS)) ThrowException("Route Error: function ".$op_fun." is not in ".$control."!",404);
        $act_obj->$op_fun();
    }
}