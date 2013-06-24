<?php

   namespace tdeekens\blog;

   use Underscore\Types\Arrays;

   class About {

      private
         $_aboutDirectory = 'about',
         $_postDirectory = 'posts',
         $_postIndex = 'index.json',
         $_posts,
         $_musicDirectory = 'music',
         $_musicIndex = 'index.json',
         $_music,
         $_feed = array(),
         $_mustacheEngine = null;

      public function __construct() {
         $indexFile = dirname(dirname(__FILE__)) . DIRECTORY_SEPARATOR . $this->_postDirectory . DIRECTORY_SEPARATOR . $this->_postIndex;
         $this->_posts = json_decode(file_get_contents($indexFile));

         $indexFile = dirname(dirname(__FILE__)) . DIRECTORY_SEPARATOR . $this->_musicDirectory . DIRECTORY_SEPARATOR . $this->_musicIndex;
         $this->_music = json_decode(file_get_contents($indexFile));

         $this->_mustacheEngine = new \Mustache_Engine(array(
             'loader' => new \Mustache_Loader_FilesystemLoader(dirname(__FILE__) . DIRECTORY_SEPARATOR . 'tmpl' . DIRECTORY_SEPARATOR),
         ));
      }

      private function _me() {
         $aboutFile = dirname(dirname(__FILE__)) . DIRECTORY_SEPARATOR . $this->_aboutDirectory . DIRECTORY_SEPARATOR . 'about.md';

         $content = \MarkdownExtended\MarkdownExtended::create()
            ->get('Parser', array())
            ->parse( new \MarkdownExtended\Content(null, $aboutFile) )
            ->getContent();

          return $content->getBody();
      }

      private function _credits() {
         $creditsFile = dirname(dirname(__FILE__)) . DIRECTORY_SEPARATOR . $this->_aboutDirectory . DIRECTORY_SEPARATOR . 'credits.md';

         $content = \MarkdownExtended\MarkdownExtended::create()
            ->get('Parser', array())
            ->parse( new \MarkdownExtended\Content(null, $creditsFile) )
            ->getContent();

          return $content->getBody();
      }

      public function about() {
         $this->_feed['songs'] = Arrays::last($this->_music->songs, 3);
         $this->_feed['posts'] = Arrays::last($this->_posts->posts, 2);
         $this->_feed['about'] = $this->_me();
         $this->_feed['credits'] = $this->_credits();

         print $this->_mustacheEngine->render('about', $this->_feed);
      }
   }

?>