# nc-ripple
The material design effect ripple in Angular way, can be used on any button. see   
see:
#### [Demo] (http://codepen.io/boo0330/pen/dGbKmW)

add module in
```javascript
var app = angular.module('demoapp', ['nc.ripple'])
```

use nc-ripple in the button
```html
<a href='' class='btn' nc-ripple style=''>Button</a> 
```

##Options:

**r-opacity**: The transparency of the ripple, valid value >=0 or <=1.  Default: .7  
Ex:  
```html
<a href='' class='btn btn-success' nc-ripple r-opacity='.9'>Button</a>
```
**r-duration**: The duration in secs of the ripple effect.  Default: 1.5  
Ex:  
```html
<a href='' class='btn btn-success' nc-ripple r-duration='3.5'>Button</a>
```
**r-size**: The ripple size in px.  Default: 200  
Ex:   
```html
<a href='' class='btn btn-success' nc-ripple r-size='600'>Button</a>
```
**r-color**: The color of the ripple.  Default: #dcdcdc  
Ex:   
```html
<a href='' class='btn btn-success' nc-ripple r-color='#eeeeee'>Button</a>
```
Done.  If you have any issue.  Let me know


