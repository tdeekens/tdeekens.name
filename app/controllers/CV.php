<?php

namespace controllers;

use Scandio\lmvc\Controller;
use Scandio\lmvc\modules\assetpipeline\view\Asset;
use Underscore\Types\Arrays;

class CV extends Controller
{
   public static function index()
   {
      return static::render([], null, 200, 'app/views/cv.html');
   }
}