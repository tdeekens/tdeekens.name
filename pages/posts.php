<?php

   namespace tdeekens\blog;

   class Posts {

      private
         $_postDirectory = 'posts',
         $_postIndex = 'index.json',
         $_posts,
         $_mustacheEngine = null;

      public function __construct() {
         $indexFile = dirname(dirname(__FILE__)) . DIRECTORY_SEPARATOR . $this->_postDirectory . DIRECTORY_SEPARATOR . $this->_postIndex;
         $this->_posts = json_decode(file_get_contents($indexFile));

         $this->_mustacheEngine = new \Mustache_Engine(array(
             'loader' => new \Mustache_Loader_FilesystemLoader(dirname(__FILE__) . DIRECTORY_SEPARATOR . 'tmpl' . DIRECTORY_SEPARATOR),
         ));
      }

      public function showOne($name = '') {
         $postFile = dirname(dirname(__FILE__)) . DIRECTORY_SEPARATOR . $this->_postDirectory . DIRECTORY_SEPARATOR . $name . '.md';

         if ( file_exists($postFile) ) {
            $content = \MarkdownExtended\MarkdownExtended::create()
               ->get('Parser', array())
               ->parse( new \MarkdownExtended\Content(null, $postFile) )
               ->getContent();

            print $this->_mustacheEngine->render('post', $content->getBody());
         }
      }

      public function listAll() {
         print $this->_mustacheEngine->render('posts', $this->_posts);
      }
   }

?>