;(function ( $, window, document, undefined ) {
   // Create the defaults once
   var pluginName = "parallactic",
       defaults = {
         hide: {
            60: '.header-meta'
         }
      };

   // The actual plugin constructor
   function Plugin ( element, options ) {
      this.element = element;
      this.$element = $(element);
      this.$window = $(window);

      this.settings = $.extend( {}, defaults, options );
      this._defaults = defaults;
      this._name = pluginName;

      this.init();
   }

   Plugin.prototype = {
      init: function () {
         this.scollHandler();
      },
      scollHandler: function () {
         var that = this;

         this.$window.scroll(function() {
            var scrollTop = that.$window.scrollTop();

            $.each(that.settings.hide, function(at, el) {
               var $el = $(el);

               if(scrollTop > at && $el.is(':visible')) {
                  $el.fadeOut();
               } else if(scrollTop <= at) {
                  $el.fadeIn();
               }
            });

            var yPos =- ( scrollTop / that.$element.data('speed') );

            // Put together our final background position
            var coords = '50% '+ yPos + 'px';

            // Move the background
            that.$element.css({
               backgroundPosition: coords
            });
         });
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