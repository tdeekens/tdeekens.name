<?php

namespace controllers;

use Scandio\lmvc\Controller;
use Underscore\Types\Arrays;

class Posts extends Controller
{
   use traits\Mustache;

   public static function index()
   {
      $posts         = json_decode(file_get_contents("./app/views/posts/index.json"));
      $posts->posts  = array_reverse($posts->posts);
      $posts         = $posts->posts;
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