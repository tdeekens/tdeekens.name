<?php

namespace controllers;

use Scandio\lmvc\Controller;
use Underscore\Types\Arrays;

class Thoughts extends Controller
{
   use traits\Mustache;
   use traits\IndexFile;

   public static function index()
   {
      $thoughts = static::readIndex(null, true);
      $published = Arrays::from($thoughts)->filter(function($thought) {
         return $thought->draft === null || $thought->draft !== true;
      })->obtain();

      return static::renderMustache([
         # Don't ask! Handing in the $published from __ messes mustache up!
         'thoughts'  => array_merge($published)
      ], ['path' => './app/views/thoughts/', 'files' => ['thoughts' => 'thoughts']]);
   }

   public static function capture($thought)
   {
      return static::render([
         'thought'   => $thought . '.md'
      ]);
   }
}
