<?php

namespace controllers;

use Scandio\lmvc\Controller;

class Read extends Controller
{
   use traits\Mustache;

   public static function index()
   {
      $books = json_decode(file_get_contents("./app/views/read/index.json"));

      return static::render([
         'books'   => $books->books
      ]);
   }
}