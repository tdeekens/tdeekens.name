<?php

   namespace tdeekens\blog;

   class Files {

      private
         $_fileRoot = 'http://www.drop.umsicht.eu/tdeekens/public/',
         $_router = null;

      public function __construct($router) {
         $this->_router = $router;
      }

      public function load($file) {
         $this->_router->redirect($this->_fileRoot . $file);
      }
   }

?>