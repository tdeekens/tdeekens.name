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
         this.bindEvents();
      },
      bindEvents: function() {
         var that = this;

         this.$window.scroll( function() { that.hideHandler(); } );

         if (window.app.breakpoint !== "mobile") {
            this.$window.scroll( function() { that.parallaxHandler(); } );
         }
      },
      hideHandler: function() {
         var scrollTop = this.$window.scrollTop();

         this.hide(scrollTop);
         this.show(scrollTop);
      },
      parallaxHandler: function () {
         var scrollTop = this.$window.scrollTop();

         var yPos =- ( scrollTop / this.$element.data('speed') );

         // Put together our final background position
         var coords = '50% '+ yPos + 'px';

         // Move the background
         this.$element.css({
            backgroundPosition: coords
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