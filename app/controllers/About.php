<?php

namespace controllers;

use Scandio\lmvc\Controller;
use Scandio\lmvc\modules\assetpipeline\view\Asset;
use Underscore\Types\Arrays;

class About extends Controller
{
   use traits\Mustache;

   public static function index()
   {
      $posts = json_decode(file_get_contents("./app/views/posts/index.json"));
      $music = json_decode(file_get_contents("./app/views/music/index.json"));
      $music->songs = array_reverse($music->songs);
      $posts->posts = array_reverse($posts->posts);

      return static::renderMustache([
         'about'     => Asset::markdown('about.md', [], true),
         'credits'   => Asset::markdown('credits.md', [], true),
         'songs'     => Arrays::first($music->songs, 3),
         'posts'     => Arrays::first($posts->posts, 2)
      ], ['path' => './app/views/about/', 'files' => ['about' => 'about']]);
   }
}