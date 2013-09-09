<?php

namespace controllers;

use Scandio\lmvc\Controller;
use Underscore\Types\Arrays;

class Music extends Controller
{
   use traits\Mustache;
   use traits\IndexFile;

   public static function index()
   {
      $music = static::readIndex(null, true);

      return static::renderMustache([
         'songs'  => $music,
         'song'   => Arrays::first($music),
      ], ['path' => './app/views/music/', 'files' => ['songs' => 'music']]);
   }
}