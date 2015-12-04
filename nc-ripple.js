angular.module('nc.ripple', [])
.directive("ncRipple", function() {
  return {
    restrict: 'A',
    scope: {
      rOpacity: '@',
      rSize: '@',
      rDuration: '@'
    },
    link: function(scope, element, attrs) {
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
          
          ripple.style.background = 'rgba(220,220,220,' + scope.rOpacity + ')'
          ripple.style.height=scope.rSize+'px';
          ripple.style.width=scope.rSize+'px';
          size.x = ripple.offsetWidth;
          size.y = ripple.offsetHeight;
          //ripple.style.webkitTransitionDuration="1s";
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
        
        console.log()

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