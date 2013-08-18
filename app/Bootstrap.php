<?php

use troba\EQM\EQM;
use Scandio\lmvc\LVC;
use Scandio\lmvc\modules\assetpipeline;

class Bootstrap extends \Scandio\lmvc\Bootstrap
{
    public function initialize()
    {
        assetpipeline\Bootstrap::configure(static::getPath());

        ui\UI::registerSnippetDirectory(static::getPath() . '/ui/snippets/');
    }
}