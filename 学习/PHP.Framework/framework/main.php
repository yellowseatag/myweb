<?php
@date_default_timezone_set('Asia/Shanghai');
error_reporting(E_ALL & ~E_NOTICE);
define('BASE_ROOT_PATH',str_replace('\\','/',dirname(dirname(__FILE__))));
define('BASE_APP_PATH',BASE_ROOT_PATH.APP_PATH);
define('BASE_FRAMEWORK_PATH',BASE_ROOT_PATH.'/framework');
define('BASE_MODEL_PATH',BASE_ROOT_PATH.'/model');
define('BASE_DATA_PATH',BASE_ROOT_PATH.'/data');
define('BASE_VENDOR_PATH',BASE_ROOT_PATH.'/vendor');
define('BASE_STORAGE_PATH',BASE_ROOT_PATH.'/storage');
define('BASE_UPLOAD_PATH',BASE_ROOT_PATH.'/upload');
define('DS','/');
define('TIMESTAMP',time());
if (!@include_once(BASE_DATA_PATH.'/config/global.config.php')) exit('config.ini.php isn\'t exists!');
global $config;
define('UPLOAD_SITE_URL',$config['upload_site_url']);
define('IS_DEBUG',$config['is_debug']===true?true:false);
define('REQ_CONTROLLER',preg_match('/^[\w]+$/i',$_REQUEST['_c']) ? strtolower($_REQUEST['_c']) : 'index');
define('REQ_ACCESS',preg_match('/^[\w]+$/i',$_REQUEST['_a']) ? strtolower($_REQUEST['_a']): 'index');
require_once('global_funs.php');
require_once('core.php');
spl_autoload_register(array('core', 'autoload'));