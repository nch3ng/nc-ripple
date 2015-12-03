angular.module('nc.ripple', [])
.directive("ncRipple", function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      
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
            size.x = ripple.offsetWidth;
            size.y = ripple.offsetHeight;
          }

          var eventType = e.type;

          // Remove animation effect
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
          ripple.className += ' animate';
        }
      element.on("mouseup", func);
    }
  }
})



var app = angular.module('demoapp', ['nc.ripple'])

app.controller('demoCtrl', function($scope){
  console.log("Controller");
})
