<?php

namespace controllers;

use Scandio\lmvc\Controller;
use Underscore\Types\Arrays;

class Posts extends Controller
{
   use traits\Mustache;
   use traits\IndexFile;

   public static function index()
   {
      $posts         = static::readIndex(null, true);
      $published     = Arrays::from($posts)->filter(function($post) {
         return $post->draft === null || $post->draft !== true;
      })->obtain();

      return static::renderMustache([
         # Don't ask! Handing in the $published from __ messes mustache up!
         'posts'  => array_merge($published)
      ], ['path' => './app/views/posts/', 'files' => ['posts' => 'posts']]);
   }

   public static function read($post)
   {
      return static::render([
         'post'   => $post . '.md'
      ]);
   }
}