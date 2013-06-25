<?php

   namespace tdeekens\blog;

   use Underscore\Types\Arrays;

   class Posts {

      private
         $_postDirectory = 'posts',
         $_postIndex = 'index.json',
         $_posts,
         $_mustacheEngine = null;

      public function __construct() {
         $indexFile = dirname(dirname(__FILE__)) . DIRECTORY_SEPARATOR . $this->_postDirectory . DIRECTORY_SEPARATOR . $this->_postIndex;
         $this->_posts = json_decode(file_get_contents($indexFile));

         $postsRevered = array_reverse($this->_posts->posts);
         $this->_posts->posts = $postsRevered;

         $this->_mustacheEngine = new \Mustache_Engine(array(
             'loader' => new \Mustache_Loader_FilesystemLoader(dirname(__FILE__) . DIRECTORY_SEPARATOR . 'tmpl' . DIRECTORY_SEPARATOR),
         ));
      }

      public function showOne($name = '') {
         $postFile = dirname(dirname(__FILE__)) . DIRECTORY_SEPARATOR . $this->_postDirectory . DIRECTORY_SEPARATOR . $name . '.md';

         $this->_showPost($postFile);
      }

      public function showLatest() {
         $name = Arrays::first($this->_posts->posts);
         $name = $name->file;

         $postFile = dirname(dirname(__FILE__)) . DIRECTORY_SEPARATOR . $this->_postDirectory . DIRECTORY_SEPARATOR . $name . '.md';

         $this->_showPost($postFile);
      }

      public function listAll() {
         print $this->_mustacheEngine->render('posts', $this->_posts);
      }

      private function _showPost($postFile) {
         if ( file_exists($postFile) ) {
            $content = \MarkdownExtended\MarkdownExtended::create()
               ->get('Parser', array())
               ->parse( new \MarkdownExtended\Content(null, $postFile) )
               ->getContent();

            print $this->_mustacheEngine->render('post', $content->getBody());
         }
      }
   }

?>