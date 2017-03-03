<?php
class indexControl{
    public function index(){

       $result=testModel::getInstance()->dodo();

       Tpl::show("test",array("result"=>$result));

    }
}