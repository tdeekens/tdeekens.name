<?php

namespace controllers\traits;

use \Scandio\lmvc\LVC;

/**
 * Trait IndexFile
 * @package controller/traits
 *
 * Trait containing methods responsible for loading index-files which themselves contain
 * information about blog-pages e.g. posts, music or books.
 *
 * Generally speaking it loads a json file from a view dependent on the current controller and
 * action which themself both can be overwritten. It might add some convienence methods at later
 * stages.
 */
trait IndexFile
{
   /**
    * Reads an index-file and returns the parsed json-result.
    * Depends on application's state in controller and action which determines the index-file's
    * location in the view folders.
    *
    * @param string $controller name which defaults to the app's currently active controller.
    * @param boolean $reverse flag indicating if the index-file's content shall be reversed (needs to be an array).
    * @param string $action of application in current state, can be overwritten with custom value.
    *
    * @return mixed value of json which was contained in index-file.
    */
   public static function readIndex($controller = null, $reverse = false, $action = null)
   {
      # Caches the app object
      $app = LVC::get();

      # The return value already
      $indexJson = json_decode(
         file_get_contents(
            # Searches the index-file by current controller and action name
            static::searchIndex(
               LVC::camelCaseTo($controller !== null ? $controller : $app->controller)
                  . DIRECTORY_SEPARATOR .
               LVC::camelCaseTo($action !== null ? $action : $app->actionName)
               . '.json'
            )
         )
      );

      # Returns the result reversed or in untouched nature
      return $reverse === true ? array_reverse($indexJson) : $indexJson;
   }

   /**
    * Searches for an index-file in all view-path registered in application.
    *
    * @param string $indexFile half-way qualified, just prepended by controller- and action-name.
    *
    * @return bool|string false in case of an unfound index-file and the fully qualified path of index-file otherwise
    */
   protected static function searchIndex($indexFile)
   {
      # Caches the app's configuration
      $config = LVC::get()->config;

      # Iterates each registered viewPath
      foreach ($config->indexFiles as $path) {
         # Builds a possible, fully qualifying path
         $indexPath = ((substr($path, 0, 1) == '/') ? '' : $config->appPath) . $path . '/' . $indexFile;
         # Returns the path in case the file exists
         if (file_exists($indexPath)) {
            return $indexPath;
         }
      }

      # Could not find an index-file at any of the view paths registered
      return false;
   }
}