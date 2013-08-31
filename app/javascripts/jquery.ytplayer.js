;(function ( $, window, document, undefined ) {
   // Create the defaults once
   var pluginName = "ytplayer",
       defaults = {
         playerEl: '.yt-player iframe',
         songEl: 'li a',
         playUrl: 'http://www.youtube.com/embed/'
      };

   // The actual plugin constructor
   function Plugin ( element, options ) {
      this.element = element;
      this.$element = $(element);
      this.$window = $(window);

      this.settings = $.extend( {}, defaults, options );
      this._defaults = defaults;
      this._name = pluginName;

      this.$playerEl = $(this.settings.playerEl);
      this.$songEls = this.$element.find(this.settings.songEl);

      this.init();
   }

   Plugin.prototype = {
      init: function () {
         var that = this;

         this.$songEls.on('click', function(e) {
            var isPlayerElHidden = that.$playerEl.is(':hidden');
            if (!isPlayerElHidden) { e.preventDefault(); }

            var $this = $(this);

            that.show($this.data('hash'));
         });
      },
      show: function(hash) {
         this.$playerEl.attr('src', this.settings.playUrl + hash);
      }
   };


   $.fn[ pluginName ] = function ( options ) {
      return this.each(function() {
         if ( !$.data( this, "plugin_" + pluginName ) ) {
            $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
         }
      });
   };

})( jQuery, window, document );