# chart.js Tutorial





http://www.chartjs.org/docs/#getting-started-include-chart.js

# example

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
<head>
	<title>Chart.js example</title>
	<script src="https://code.jquery.com/jquery-1.11.2.min.js" ></script>
	<script src="http://cdn3.devexpress.com/jslib/13.1.5/js/dx.chartjs.js"></script>
</head>
<body>

	<div id="chartContainer" style="width:100%;height: 600px"></div>

	
	<script type="text/javascript" src="myChart.js"></script>
</body>
</html>

```



```js
// myChart.js


	  var chartDataSource = [
    {
        year: 1950, Africa: 227, Americas: 331,
        Asia: 1436, Europe: 547, Oceania: 12
    },
    {
        year: 1960, Africa: 285, Americas: 416,
        Asia: 1718, Europe: 605, Oceania: 15
    },
    {
        year: 1970, Africa: 365, Americas: 512,
        Asia: 2156, Europe: 657, Oceania: 19
    },
    {
        year: 1980, Africa: 478, Americas: 612,
        Asia: 2644, Europe: 695, Oceania: 22
    },
    {
        year: 1990, Africa: 633, Americas: 720,
        Asia: 3180, Europe: 722, Oceania: 26
    },
    {
        year: 2000, Africa: 810, Americas: 833,
        Asia: 3678, Europe: 731, Oceania: 30
    },
    {
        year: 2010, Africa: 1016, Americas: 936,
        Asia: 4149, Europe: 728, Oceania: 35
    }
];

$("#chartContainer").dxChart({
    dataSource: chartDataSource,
    commonSeriesSettings: {
        argumentField: 'year'
    },
    series: [{
        name: 'Oceania',
        valueField: 'Oceania'
    }, {
        name: 'Africa',
        valueField: 'Africa'
    }, {
        name: 'Americas',
        valueField: 'Americas'
    }, {
        name: 'Asia',
        valueField: 'Asia'
    }, {
        name: 'Europe',
        valueField: 'Europe'
    }]
});

```


