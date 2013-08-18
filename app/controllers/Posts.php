<?php

namespace controllers;

use Scandio\lmvc\modules\security\AnonymousController;

class Posts extends AnonymousController
{
   use traits\Mustache;

   public static function index()
   {
      $posts = json_decode(file_get_contents("./app/views/posts/index.json"));
      $posts->posts = array_reverse($posts->posts);

      return static::renderMustache([
         'posts'  => $posts->posts
      ], ['path' => './app/views/posts/', 'files' => ['posts' => 'posts']]);
   }

   public static function show($post)
   {
      return static::render([
         'post'   => $post . '.md'
      ]);
   }
}