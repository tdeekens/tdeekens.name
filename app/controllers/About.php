<?php

namespace controllers;

use Scandio\lmvc\Controller;
use Scandio\lmvc\modules\assetpipeline\view\Asset;
use Underscore\Types\Arrays;

class About extends Controller
{
   use traits\Mustache;
   use traits\IndexFile;

   public static function index()
   {
      $posts = static::readIndex('Posts', true);
      $music = static::readIndex('Music', true);
      $books = static::readIndex('Books');

      return static::renderMustache([
         'about'     => Asset::markdown('about.md', [], true),
         'credits'   => Asset::markdown('credits.md', [], true),
         'songs'     => Arrays::first($music, 2),
         'posts'     => Arrays::first($posts, 2),
         'books'     => Arrays::first($books, 2)
      ], ['path' => './app/views/about/', 'files' => ['about' => 'about']]);
   }
}