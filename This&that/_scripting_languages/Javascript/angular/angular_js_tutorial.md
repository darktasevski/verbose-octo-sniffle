# Angular.js

### Notes
- angular is just a javascript framework, so its javascript!
- remember to include your js code in the HTML
- you will need an API to get info (so you dont hard code stuff)
- controllers are grouped together in modules?
- controllers are used to add behaviour to PARTS of the page
- use DIRECTIVES to render 'partials'

### what you need:
- a folder with:
  - an html file
  - js files:
    - angular.min.js
    - bootstrap.min.css
    - your js file for writting code in angular

## directives
```js
ng-app="store"
ng-controller="StoreController as store"
ng-show
ng-hide
ng-repeat="product in store.products"

// to add images with the name of the image file: img.jpg
ng-src="{{product.images[0].full}}"

ng-click="tab = 3" // its setting a variable wich we can read like this: {{tab}}

ng-init="tab = 1"  // set an initial value

ng-class="{ active:tab === 3 }"  // set a html class if expression is true

ng-model="review.stars" // binds form inputs to variables, it plays well also with checkboxes and radio-buttons


ng-submit="reviewCtrl.addReview(product)" // goes to a controller function

ng-include="'foo.html'"











```


## filtes
```mustache
// example: {{some-data |filter:options}}

{{product.price | curreny}}

{{product.price | uppercase}}

{{13884593459345 | date:'MM/dd/yyyy @ h:mma'}}
```
