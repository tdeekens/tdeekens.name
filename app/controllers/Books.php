<?php

namespace controllers;

use Scandio\lmvc\Controller;

class Books extends Controller
{
   use traits\Mustache;
   use traits\IndexFile;

   public static function index()
   {
      $books = static::readIndex();

      return static::render([
         'books'   => $books
      ]);
   }
}