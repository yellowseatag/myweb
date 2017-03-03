<?php

namespace Upload\Validation;

use Upload\Exception;
use Upload\FileInfoInterface;
use Upload\ValidationInterface;

class MinDimensions implements ValidationInterface
{
    /**
     * @var integer
     */
    protected $width;

    /**
     * @var integer
     */
    protected $height;

    /**
     * @param int $expectedWidth
     * @param int $expectedHeight
     */
    function __construct($minWidth, $minHeight)
    {
        $this->width = $minWidth;
        $this->height = $minHeight;
    }

    /**
     * @inheritdoc
     */
    public function validate(FileInfoInterface $info)
    {
        $dimensions = $info->getDimensions();
        if (!$dimensions) {
            throw new \Exception(sprintf('Could not detect image size'));
        }
        if ($dimensions['width'] < $this->width) {
            throw new \Exception(sprintf('宽度不能小于%dpx', $this->width));
        }
        if ($dimensions['height'] < $this->height) {
            throw new \Exception(sprintf('高度不能小于%dpx', $this->height));
        }
    }
}