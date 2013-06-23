<?php

   namespace tdeekens\blog;

   use Underscore\Types\Arrays;

   class About {

      private
         $_aboutDirectory = 'about',
         $_articleDirectory = 'articles',
         $_articleIndex = 'index.json',
         $_articles,
         $_musicDirectory = 'music',
         $_musicIndex = 'index.json',
         $_music,
         $_feed = array(),
         $_mustacheEngine = null;

      public function __construct() {
         $indexFile = dirname(dirname(__FILE__)) . DIRECTORY_SEPARATOR . $this->_articleDirectory . DIRECTORY_SEPARATOR . $this->_articleIndex;
         $this->_articles = json_decode(file_get_contents($indexFile));

         $indexFile = dirname(dirname(__FILE__)) . DIRECTORY_SEPARATOR . $this->_musicDirectory . DIRECTORY_SEPARATOR . $this->_musicIndex;
         $this->_music = json_decode(file_get_contents($indexFile));

         $this->_mustacheEngine = new \Mustache_Engine(array(
             'loader' => new \Mustache_Loader_FilesystemLoader(dirname(__FILE__) . DIRECTORY_SEPARATOR),
         ));
      }

      public function me() {
         $aboutFile = dirname(dirname(__FILE__)) . DIRECTORY_SEPARATOR . $this->_aboutDirectory . DIRECTORY_SEPARATOR . 'about.md';

         $content = \MarkdownExtended\MarkdownExtended::create()
            ->get('Parser', array())
            ->parse( new \MarkdownExtended\Content(null, $aboutFile) )
            ->getContent();

          print $content->getBody();
      }

      public function activity() {
         $this->_feed['songs'] = Arrays::last($this->_music->songs, 3);
         $this->_feed['articles'] = Arrays::last($this->_articles->articles, 2);

         print $this->_mustacheEngine->render('activity', $this->_feed);
      }
   }

?>