<?php
$config = array();
$config["is_debug"]=true;
$config['db']['0']['dbhost']        ='192.168.0.210';
$config['db']['0']['dbport']        = '3306';
$config['db']['0']['dbuser']        = 'saas';
$config['db']['0']['dbpwd']         = 'saas';
$config['db']['0']['dbname']        = 'swms-saas-db';
$config['redis']['host']            ="127.0.0.1";
$config['redis']['port']            = 6379;
$config['redis']['session_db']      =3;
$config['redis']['cache_db']        =4;