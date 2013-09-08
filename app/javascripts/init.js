window.app = {};

if (!window.getComputedStyle) { window.getComputedStyle = function() {}; }

$(document).ready(function(){
   window.app.breakpoint = window.getComputedStyle(
      $('.js-breakpoint')[0]
   ).getPropertyValue('content')
});