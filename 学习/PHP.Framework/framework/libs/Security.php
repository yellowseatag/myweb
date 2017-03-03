<?php
class Security {
    public static function aes_encrypt($input,$key='tcPK4Yc#hq8y!gih') {
        $encrypted = mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $key, $input, MCRYPT_MODE_ECB);
        return base64_encode($encrypted);
    }
    public static function aes_decrypt($sStr,$key='tcPK4Yc#hq8y!gih') {
        $encryptedData = base64_decode($sStr);
        return mcrypt_decrypt(MCRYPT_RIJNDAEL_128, $key, $encryptedData, MCRYPT_MODE_ECB);
    }
}