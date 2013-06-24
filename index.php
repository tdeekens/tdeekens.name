<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <?php
            define('baseUri', str_replace("index.php", "", $_SERVER['SCRIPT_NAME']));
        ?>

        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">

        <link rel="stylesheet" type="text/css" href="<?php echo baseUri; ?>assets/scss/style.css">

        <script src="<?php echo baseUri; ?>assets/components/jquery/jquery.min.js"></script>
    </head>
    <body>
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->
        <div class="wrap-outer">
            <div class="navigation">
                <ul>
                    <li><a href="<?php echo baseUri; ?>about">It's about</a></li>
                    <li><a href="<?php echo baseUri; ?>posts">posts</a></li>
                    <li><a href="<?php echo baseUri; ?>music">and music</a></li>
                    <li><a href="<?php echo baseUri; ?>read">with reading</a></li>
                </ul>
            </div>
            <div class="content-body">
                <?php
                    require_once 'php/components/autoload.php';

                    $pageDirectory = "pages/";
                    $router = new \Slim\Slim();

                    $router->get('/', function() use ($pageDirectory) {
                        $file = $pageDirectory . "about.php";

                        require_once $file;

                        $about = new tdeekens\blog\About();

                        $about->about();
                    });

                    $router->get('/posts/', function() use ($pageDirectory) {
                        $file = $pageDirectory . "posts.php";

                        require_once $file;

                        $posts = new tdeekens\blog\Posts();

                        $posts->listAll();
                    });

                    $router->get('/post/:file', function($name) use ($pageDirectory) {
                        $file = $pageDirectory . "posts.php";

                        require_once $file;

                        $posts = new tdeekens\blog\Posts();

                        $posts->showOne($name);
                    });

                    $router->get('/music/', function() use ($pageDirectory) {
                        $file = $pageDirectory . "music.php";

                        require_once $file;

                        $music = new tdeekens\blog\Music();

                        $music->listAll();
                    });

                    $router->get('/read/', function($file) use ($pageDirectory) {
                        $file = $pageDirectory . "read.php";

                        require_once $file;

                        $posts = new tdeekens\blog\Read();
                    });

                    $router->get('/file/:name', function($name) use ($router, $pageDirectory) {
                        $file = $pageDirectory . "files.php";

                        require_once $file;

                        $files = new tdeekens\blog\Files($router);

                        $files->load($name);
                    });

                    $router->run();
                ?>
            </div>
        </div>
    </body>
</html>