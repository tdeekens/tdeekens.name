<?php

namespace controllers;

use Scandio\lmvc\modules\security\AnonymousController;

class Music extends AnonymousController
{
   use traits\Mustache;

   public static function index()
   {
      $music = json_decode(file_get_contents("./app/views/music/index.json"));
      $music->songs = array_reverse($music->songs);

      return static::renderMustache([
         'songs'  => $music->songs
      ], ['path' => './app/views/music/', 'files' => ['songs' => 'music']]);
   }
}