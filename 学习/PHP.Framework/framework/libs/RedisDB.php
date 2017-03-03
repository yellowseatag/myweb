<?php
class RedisDB extends Redis{
    private static $_redisdb;
    public function __construct( ) {
        $redis_conf=C("redis");
        $this->pconnect($redis_conf["host"],$redis_conf["port"]);
    }
    public static function getInstance($db=false){
         if(empty(self::$_redisdb)){
             self::$_redisdb=new self();
         }
         if($db===false){
             $redis_conf=C("redis");
             if(isset($redis_conf["cache_db"])){
                 self::$_redisdb->select($redis_conf["cache_db"]);
             }
         }else{
             self::$_redisdb->select($db);
         }
         return self::$_redisdb;
    }
}