<?php

namespace controllers\traits;

/**
 * Trait Mustache
 * @package controller/traits
 *
 * Trait giving functionality needed to easily render mustache right out of a
 * controller. It adds/contains a renderMustache-fn which behaves in the same manner as
 * render and renderJson.
 */
trait Mustache
{
    /**
     * Renders a n-mustache templates from a directory setting the result on a
     * 'mustache'-key on the $renderArgs per file.
     *
     * @param array $renderArgs containing variables used for rendering
     * @param array $mustache an array with 'path' and 'files'-key for mustache files to be rendered
     * @param string $template do the using to render into the resulting mustache (as in normal render-mode)
     * @param int $httpCode to be set as http-header
     * @param string $masterTemplate optional to be used into which $template will be injected
     *
     * @return bool true cause we never fail!
     */
    public static function renderMustache($renderArgs = array(), $mustache, $template = null, $httpCode = 200, $masterTemplate = null)
    {
        $mustacheEngine = new \Mustache_Engine(array(
           'loader' => new \Mustache_Loader_FilesystemLoader($mustache['path']),
        ));

        $renderArgs['mustache'] = isset($renderArgs['mustache']) ? $renderArgs['mustache'] : [];

        foreach ($mustache['files'] as $id => $file) {
            $renderArgs['mustache'][$id] = $mustacheEngine->render($file, $renderArgs);
        }

        static::render($renderArgs, $template, $httpCode, $masterTemplate);

        return true;
    }
}