<?php

namespace controllers;

use Scandio\lmvc\Controller;

class Books extends Controller
{
   use traits\Mustache;

   public static function index()
   {
      $books = json_decode(file_get_contents("./app/views/books/index.json"));

      return static::render([
         'books'   => $books->books
      ]);
   }
}