<?php

   namespace tdeekens\blog;

   class Music {

      private
         $_musicDirectory = 'music',
         $_musicIndex = 'index.json',
         $_music,
         $_mustacheEngine = null;

      public function __construct() {
         $indexFile = dirname(dirname(__FILE__)) . DIRECTORY_SEPARATOR . $this->_musicDirectory . DIRECTORY_SEPARATOR . $this->_musicIndex;
         $this->_music = json_decode(file_get_contents($indexFile));

         $songsRevered = array_reverse($this->_music->songs);
         $this->_music->songs = $songsRevered;

         $this->_mustacheEngine = new \Mustache_Engine(array(
             'loader' => new \Mustache_Loader_FilesystemLoader(dirname(__FILE__) . DIRECTORY_SEPARATOR),
         ));
      }

      public function listAll() {
         print $this->_mustacheEngine->render('music', $this->_music);
      }
   }

?>