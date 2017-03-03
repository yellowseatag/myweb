<?php
/**
 * 记录日志
 */

class Log{
    public static function record($message,$level="ERROR") {
        $timestamp=time();
        $now = @date('Y-m-d H:i:s',$timestamp);
        $log_file = BASE_STORAGE_PATH.'/log/'.date('Ymd',$timestamp).'.log';
        $url = $_SERVER['REQUEST_URI'] ? $_SERVER['REQUEST_URI'] : $_SERVER['PHP_SELF'];
        $url .= "(control=".REQ_CONTROLLER."&access=".REQ_ACCESS.") ";
        $content = "【{$level}】---------------------------------------{$now}---------------------------------------\r\n【URL】:{$url}\r\n【CONTENT】:{$message}\r\n";
        file_put_contents($log_file,$content, FILE_APPEND);
    }
}