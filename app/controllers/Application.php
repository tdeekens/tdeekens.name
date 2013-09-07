<?php

namespace controllers;

use Scandio\lmvc\Controller;
use Underscore\Types\Arrays;
use Scandio\lmvc\LVCConfig;

class Application extends Controller
{
   public static function index()
   {
      $posts = json_decode(file_get_contents("./app/views/posts/index.json"));
      $posts->posts = array_reverse($posts->posts);
      $postInfo = Arrays::first($posts->posts);

      return static::render([
         'post'   => $postInfo->file . '.md'
      ]);
   }
}