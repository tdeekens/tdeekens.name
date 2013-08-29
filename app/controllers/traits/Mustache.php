<?php

namespace controllers\traits;

trait Mustache
{
    public static function renderMustache($renderArgs = array(), $mustache, $template = null, $httpCode = 200, $masterTemplate = null)
    {
        $mustacheEngine = new \Mustache_Engine(array(
           'loader' => new \Mustache_Loader_FilesystemLoader($mustache['path']),
        ));

        $renderArgs['mustache'] = isset($renderArgs['mustache']) ? $renderArgs['mustache'] : [];

        foreach ($mustache['files'] as $id => $file) {
            $renderArgs['mustache'][$id] = $mustacheEngine->render($file, $renderArgs);
        }

        static::render($renderArgs, $httpCode, $template, $masterTemplate);

        return true;
    }
}