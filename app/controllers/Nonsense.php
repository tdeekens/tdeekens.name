<?php

namespace controllers;

use Scandio\lmvc\modules\security\AnonymousController;
use Underscore\Types\Arrays;
use Scandio\lmvc\LVCConfig;

class Nonsense extends AnonymousController
{
   public static function index()
   {
      return static::render([

      ]);
   }
}