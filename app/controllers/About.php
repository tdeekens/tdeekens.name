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
      $posts          = static::readIndex('Posts', true);
      $thoughts       = static::readIndex('Thoughts', true);
      $music          = static::readIndex('Music', true);
      $books          = static::readIndex('Books');
      $recentPosts    = Arrays::from($posts)->filter(function($post) {
         return $post->draft === null || $post->draft !== true;
      })->first(2)->obtain();
      $recentThoughts = Arrays::from($thoughts)->filter(function($thought) {
         return $thought->draft === null || $thought->draft !== true;
      })->first(2)->obtain();

      return static::renderMustache([
         'about'     => Asset::markdown('about.md', [], true),
         'credits'   => Asset::markdown('credits.md', [], true),
         'songs'     => Arrays::first($music, 2),
         'posts'     => array_merge($recentPosts),
         'thoughts'  => array_merge($recentThoughts),
         'books'     => Arrays::first($books, 2)
      ], ['path' => './app/views/about/', 'files' => ['about' => 'about']]);
   }
}
