<?php

namespace controllers\traits;

use \Scandio\lmvc\LVC;

trait IndexFile
{
   public static function readIndex($controller = null, $reverse = false, $extension = 'json')
   {
      $app = LVC::get();

      $indexJson = json_decode(
         file_get_contents(
            static::searchIndex(LVC::camelCaseTo($controller !== null ? $controller : $app->controller) . DIRECTORY_SEPARATOR . LVC::camelCaseTo($app->actionName) . '.' . $extension)
         )
      );

      return $reverse === true ? array_reverse($indexJson) : $indexJson;
   }

   protected static function searchIndex($indexFile)
   {
      $config = LVC::get()->config;

      foreach ($config->viewPath as $path) {
         $viewPath = ((substr($path, 0, 1) == '/') ? '' : $config->appPath) . $path . '/' . $indexFile;
         if (file_exists($viewPath)) {
            return $viewPath;
         }
      }

      return false;
   }
}