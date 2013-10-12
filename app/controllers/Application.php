<?php

namespace controllers;

use Scandio\lmvc\Controller;
use Underscore\Types\Arrays;
use Scandio\lmvc\LVCConfig;

class Application extends Controller
{
   use traits\IndexFile;

   public static function index()
   {
      self::redirect('About::index');
   }

   public static function cv()
   {
      self::redirect('CurriculumVitae::index');
   }

   public static function latest()
   {
      $posts = $posts = static::readIndex('Posts', true, 'index');
      $postInfo = Arrays::first($posts);

      return static::render([
         'post'   => $postInfo->file . '.md'
      ]);
   }

   public static function imprint()
   {
      return static::render([
         'imprint'   => 'imprint.md'
      ]);
   }
}