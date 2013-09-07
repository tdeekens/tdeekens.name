<?php

namespace controllers;

use Scandio\lmvc\Controller;
use Underscore\Types\Arrays;

class Music extends Controller
{
   use traits\Mustache;

   public static function index()
   {
      $music = json_decode(file_get_contents("./app/views/music/index.json"));
      $music->songs  = array_reverse($music->songs);
      $music->song   = Arrays::first($music->songs);

      return static::renderMustache([
         'songs'  => $music->songs,
         'song'   => $music->song
      ], ['path' => './app/views/music/', 'files' => ['songs' => 'music']]);
   }
}