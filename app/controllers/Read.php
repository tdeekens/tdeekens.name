<?php

namespace controllers;

use Scandio\lmvc\modules\security\AnonymousController;

class Read extends AnonymousController
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