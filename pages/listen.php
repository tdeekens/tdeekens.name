<?php

   namespace tdeekens\blog;

   class Listen {

      private
         $_listenDirectory = 'articles',
         $_listenIndex = 'index.json',
         $_listen,
         $_mustacheEngine = null;

      public function __construct() {
         $indexFile = dirname(dirname(__FILE__)) . DIRECTORY_SEPARATOR . $this->_articleDirectory . DIRECTORY_SEPARATOR . $this->_articleIndex;
         $this->_listen = json_decode(file_get_contents($indexFile));

         $this->_mustacheEngine = new \Mustache_Engine(array(
             'loader' => new \Mustache_Loader_FilesystemLoader(dirname(__FILE__) . DIRECTORY_SEPARATOR),
         ));
      }

      public function listAll() {
         print $this->_mustacheEngine->render('listen', $this->_listen);
      }
   }

?>