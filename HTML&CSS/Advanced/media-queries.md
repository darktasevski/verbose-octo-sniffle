```
/* Default styles first then media queries */
@media screen and (min-width: 400px)  {...}
@media screen and (min-width: 600px)  {...}
@media screen and (min-width: 1000px) {...}
@media screen and (min-width: 1400px) {...}
```

Generally speaking, avoiding CSS3 shadows, gradients, transforms, and animations within mobile styles isn’t a bad idea either. When used excessively, they cause heavy loading and can even reduce a device’s battery life.

```
/* Default media */
body {
  background: #ddd;
}
/* Media for larger devices */
@media screen and (min-width: 800px) {
  body {
    background-image: url("bg.png") 50% 50% no-repeat;
  }
}
```

#### Flexible Media
The final, equally important aspect to responsive web design involves flexible media. As viewports begin to change size media doesn’t always follow suit. Images, videos, and other media types need to be scalable, changing their size as the size of the viewport changes.

One quick way to make media scalable is by using the max-width property with a value of 100%. Doing so ensures that as the viewport gets smaller any media will scale down according to its containers width.

```
img, video, canvas {
  max-width: 100%;
}
```