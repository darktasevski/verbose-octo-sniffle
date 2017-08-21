# how to use Chart.js



### add jquery cdn, and chart.min.js file (that I downloaded from http://www.chartjs.org/)

```html
<script src="https://code.jquery.com/jquery-2.1.3.min.js"></script>
<script src="chart.min.js"></script>
```


### add the canvas to receive the chart

```html
<canvas id="myChart" width="400" height="400"></canvas>

```

### add default options

```html
<script type="text/javascript">
  Chart.defaults.global = {...};
</script>
```





### get html element and create a Chart on it

```html
<script type="text/javascript">
  // Get context with jQuery - using jQuery's .get() method.
  var ctx = $("#myChart").get(0).getContext("2d");
  // This will get the first returned node in the jQuery collection.
  var myNewChart = new Chart(ctx);
</script>
```






### create data and options object

```html
<script type="text/javascript">
  var data = {...};
  var options = {...};
</script>
```




### create the "LINE" chart, and pass to it the data and options object

```html
<script type="text/javascript">
  // new Chart(ctx).PolarArea(data, options);
  var myLineChart = new Chart(ctx).Line(data, options);
</script>
```

 












