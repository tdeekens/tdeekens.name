<?php

   namespace tdeekens\blog;

   class Posts {

      private
         $_articleDirectory = 'articles',
         $_articleIndex = 'index.json',
         $_articles,
         $_mustacheEngine = null;

      public function __construct() {
         $indexFile = dirname(dirname(__FILE__)) . DIRECTORY_SEPARATOR . $this->_articleDirectory . DIRECTORY_SEPARATOR . $this->_articleIndex;
         $this->_articles = json_decode(file_get_contents($indexFile));

         $this->_mustacheEngine = new \Mustache_Engine(array(
             'loader' => new \Mustache_Loader_FilesystemLoader(dirname(__FILE__) . DIRECTORY_SEPARATOR),
         ));
      }

      public function showOne($name = '') {
         $postFile = dirname(dirname(__FILE__)) . DIRECTORY_SEPARATOR . $this->_articleDirectory . DIRECTORY_SEPARATOR . $name . '.md';

         if ( file_exists($postFile) ) {
            $content = \MarkdownExtended\MarkdownExtended::create()
               ->get('Parser', array())
               ->parse( new \MarkdownExtended\Content(null, $postFile) )
               ->getContent();

             print $content->getBody();
         }
      }

      public function listAll() {
         print $this->_mustacheEngine->render('posts', $this->_articles);
      }
   }

?>