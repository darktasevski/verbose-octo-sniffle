### Position Property

The position property accepts five different values, each of which provide different ways to uniquely position an element.

#### Position Static

Elements by default have the position value of static, meaning they don’t have, nor will they accept, any specific box offset properties. Furthermore, elements will be positioned as intended, with their default behaviors.

In the demonstration below, all the boxes are stacked one on top of the other as they are block level elements and are not floated in any specific direction. So, all of them have static position right now.
```
    <div class="box-set">
        <figure class="box box-1">Box 1</figure>
        <figure class="box box-2">Box 2</figure>
        <figure class="box box-3">Box 3</figure>
        <figure class="box box-4">Box 4</figure>
    </div>

```
```
.box-set {
  background: #eaeaed;
}
.box {
  background: #2db34a;
  height: 80px;
  width: 80px;
}
```

#### Position Relative

The relative value for the position property is very similar to that of the static value. The primary difference is that the relative value accepts the box offset properties top, right, bottom, and left. These box offset properties allow the element to be precisely positioned, shifting the element from its default position in any direction.

#### Position Absolute

Absolutely positioned elements accept box offset properties, however they are removed from the normal flow of the document. Upon removing the element from the normal flow, elements are positioned directly in relation to their containing parent whom is relatively or absolutely positioned. Should a relatively or absolutely positioned parent not be present, the absolutely positioned element will be positioned in relation to the body of the page.

Using absolutely positioned elements and specifying both vertical and horizontal offset properties will move the element with those property values in relation to its relatively positioned parent. For example, an element with a top value of 50px and a right value of 100px will position the element 50 pixels down from the top of its relatively positioned parent and 100 pixels in from the right of its relatively positioned parent.

#### Position Fixed

Using the positioning value of fixed works just like that of absolute, however the positioning is relative to the browser viewport, and it does not scroll with the page. That said, elements will always be present no matter where a user stands on a page. The only caveat with fixed positioning is that it doesn’t work with Internet Explorer 6. Should you want to force fixed positioning within Internet Explorer 6 there are suitable hacks.

Using multiple box offset properties with fixed positioning will produce the same behaviors as absolutely positioned element.

Keeping the same box offset properties from the previous demonstration, watch how the boxes are positioned in relation to the browser’s viewport and not the containing, relatively positioned parent.

### How Box Offset Properties Work

The box offset properties, _top_, _right_, _bottom_, and _left_, specify how elements may be positioned, and in which direction. These offset properties only work on elements with a *relative*, *absolute*, or *fixed* positioning value.

For relatively positioned elements, these properties specify how an element should be moved from its default position. For example, using a top value of 20px on a relatively positioned element will push the element 20 pixels down from where it was originally placed. Switching the top value to -20px will instead pull the element 20 pixels up from where it was originally placed.

For elements using absolute or fixed positioning these properties specify the distance between the element and the edges of its parent element. For example, using a top value of 20px on an absolutely positioned element will push the element 20 pixels down from the top of its relatively positioned parent. Switching the top value to -20px will then pull the element 20 pixels up from the top of its relatively positioned parent.

In the event that the top and bottom box offset properties are both declared on a relatively positioned element, the top properties will take priority. Additionally, if both the left and right box offset properties are declared on a relatively positioned element, priority is given in the direction in which the language of the page is written. For example, English pages the left offset property is given priority, and for Arabic pages the right offset property is given priority.

#### Z-Index Property
By nature web pages are often considered to be two dimensional, displaying elements upon a x and y axis. However when you begin to position elements they are occasionally placed on top of one another. To change the order of how these elements are stacked, also known as the z-axis, the z-index property is to be used.

Generally, elements are positioned upon the z-axis as they appear within the DOM. Elements coming at the top of the DOM are positioned behind elements coming after them. Changing this stacking using the z-index property is pretty straight forward. The element with the highest z-index value will appear on the top regardless of its placement in the DOM.

In order to apply the z-index property to an element, you must first apply a position value of relative, absolute, or fixed. Same as if you were to apply and box off set properties.