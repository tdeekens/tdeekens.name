<?php

namespace controllers;

use Scandio\lmvc\Controller;
use Scandio\lmvc\modules\assetpipeline\view\Asset;
use Underscore\Types\Arrays;

class CurriculumVitae extends Controller
{
    public static function index()
    {
        return static::render([], null, 200, 'app/views/curriculum-vitae.html');
    }

    public static function cover()
    {
        return static::render([], null, 200, 'app/views/curriculum-vitae.html');
    }

    public static function grosche()
    {
        return static::render([], null, 200, 'app/views/curriculum-vitae.html');
    }
}
