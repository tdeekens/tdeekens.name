/*!
 *  FluidVids.js v1.2.0
 *  Responsive and fluid YouTube/Vimeo video embeds.
 *  Project: https://github.com/toddmotto/fluidvids
 *  by Todd Motto: http://toddmotto.com
 *
 *  Copyright 2013 Todd Motto. MIT licensed.
 */
window.fluidvids = (function (window, document, undefined) {

  'use strict';

  /*
   * Constructor function
   */
  var Fluidvids = function ($elem) {
    this.$elem = $elem;
  };

  /*
   * Prototypal setup
   */
  Fluidvids.prototype = {

    init : function () {

      var videoRatio = (this.$elem.height / this.$elem.width) * 100;

      this.$elem.css({
        'position': 'absolute',
        'top': '0',
        'left': '0',
        'width': '100%',
        'height': '100%'
      });

      var $wrap = $('<div/>', {
        'class': 'fluidvids'
      });

      $wrap.css({
        'width': '100%',
        'position': 'relative',
        'padding-top': videoRatio + '%'
      });

      var thisParent = this.$elem.parent().prepend($wrap);
      $wrap.html(this.$elem);
    }
  };

  $(function() {
    var iframes = $('iframe');

    $.each(iframes, function(key, iframe) {
      var players = /www.youtube.com|player.vimeo.com/;
      var $iframe = $(iframe);
      if ($iframe.attr('src').search(players) > 0) {
        new Fluidvids($iframe).init();
      }
    });
  });

})(window, document);