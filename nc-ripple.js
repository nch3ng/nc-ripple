angular.module('nc.ripple', [])
.directive("ncRipple", function() {
  return {
    restrict: 'A',
    scope: {
      rOpacity: '@',
      rSize: '@',
      rDuration: '@',
      rColor: '@'
    },
    link: function(scope, element, attrs) {
      
      var COLOR_REGEXP = "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$";
      var cutHex = function(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}
      var hexToR = function(h) {return parseInt((cutHex(h)).substring(0,2),16)}
      var hexToG = function(h) {return parseInt((cutHex(h)).substring(2,4),16)}
      var hexToB = function(h) {return parseInt((cutHex(h)).substring(4,6),16)}
      
      /* Initailizing */
      element.css('overflow', 'hidden');
      element.css('transform', 'translateZ(0)');
      
      if(scope.rOpacity && scope.rOpacity >= 0 && scope.rOpacity <=1)
        ;  
      else
         scope.rOpacity = '.5';
      
      if(!scope.rSize)
        scope.rSize = 200;
      if(!scope.rDuration)
        scope.rDuration=1.5;
      
      scope.rDurationS = scope.rDuration +'s';
      /* End of initializing */
      var r=220,g=220,b=220;
      
      var validates = new RegExp(COLOR_REGEXP);
      if (scope.rColor && validates.test(scope.rColor)){
        
        r=hexToR(scope.rColor);
        g=hexToG(scope.rColor);
        b=hexToB(scope.rColor);
      }
      
      
      var x, y=0, size={},
      offsets,
      func = function(e) {

        var ripple = this.querySelector('b.drop');

        if (ripple == null) {
          // Create ripple
          ripple = document.createElement('b');
          ripple.className += 'drop';

          // Prepend ripple to element
          this.insertBefore(ripple, this.firstChild);
          
          ripple.style.background = 'rgba(' + r + ',' + g +',' + b + ',' + scope.rOpacity + ')'
          ripple.style.height=scope.rSize+'px';
          ripple.style.width=scope.rSize+'px';
          size.x = ripple.offsetWidth;
          size.y = ripple.offsetHeight;
        }

        var eventType = e.type;

        // Remove animation effect
        ripple.style.animationDuration=null;
        ripple.style.oAnimationDuration=null;
        ripple.style.webkitAnimationDuration=null;
        ripple.style.mozAnimationDuration=null;
        ripple.style.msAnimationDuration=null;
        ripple.className = ripple.className.replace(/ ?(animate)/g, '');

        // get click coordinates by event type

        x = e.pageX;
        y = e.pageY;

        // set new ripple position by click or touch position
        function getPos(element) {
          var de = document.documentElement;
          var box = element.getBoundingClientRect();
          var top = box.top + window.pageYOffset - de.clientTop;
          var left = box.left + window.pageXOffset - de.clientLeft;
          return {
            top: top,
            left: left
          };
        }
        offsets = getPos(element[0]);

        innerPos = {};
        innerPos.x = e.pageX;
        innerPos.y = e.pageY;

        ripple.style.left = (innerPos.x - offsets.left - size.x / 2) + 'px';
        ripple.style.top = (innerPos.y - offsets.top - size.y / 2) + 'px';

        // Add animation effect
        ripple.style.animationDuration=scope.rDurationS;
        ripple.style.oAnimationDuration=scope.rDurationS;
        ripple.style.webkitAnimationDuration=scope.rDurationS;
        ripple.style.mozAnimationDuration=scope.rDurationS;
        ripple.style.msAnimationDuration=scope.rDurationS;
        ripple.className += ' animate';
      }
      element.on("mouseup", func);
    }
  }
})