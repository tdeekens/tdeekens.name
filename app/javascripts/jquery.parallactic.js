;(function ( $, window, document, undefined ) {
   // Create the defaults once
   var pluginName = "parallactic",
       defaults = {
         hide: {
            60: '.sticky-header'
         },
         show: {
            250: 'header, footer'
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

            that.hide(scrollTop);
            that.show(scrollTop);

            var yPos =- ( scrollTop / that.$element.data('speed') );

            // Put together our final background position
            var coords = '50% '+ yPos + 'px';

            // Move the background
            that.$element.css({
               backgroundPosition: coords
            });
         });
      },
      hide: function(scrollTop) {
         var that = this;

         $.each(that.settings.hide, function(at, el) {
            var $el = $(el);

            if(scrollTop > at && $el.is(':visible')) {
               $el.fadeOut();
            } else if(scrollTop <= at) {
               $el.fadeIn();
            }
         });
      },
      show: function(scrollTop) {
         var that = this;

         $.each(that.settings.show, function(at, el) {
            var $el = $(el);

            if(scrollTop > at && ! $el.is(':visible')) {
               $el.fadeIn();
            } else if(scrollTop <= at) {
               $el.fadeOut();
            }
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