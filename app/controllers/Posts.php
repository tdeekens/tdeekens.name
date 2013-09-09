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
      $published     = [];

      foreach ($posts as $postKey => $post) {
         if (!isset($post->draft) || $post->draft !== true) {
            $published[] = $post;
         }
      }

      return static::renderMustache([
         'posts'  => $published
      ], ['path' => './app/views/posts/', 'files' => ['posts' => 'posts']]);
   }

   public static function read($post)
   {
      return static::render([
         'post'   => $post . '.md'
      ]);
   }
}