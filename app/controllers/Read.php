<?php

namespace controllers;

use Scandio\lmvc\modules\security\AnonymousController;

class Read extends AnonymousController
{
    public static function index()
    {
        return static::render();
    }
}