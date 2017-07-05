# CSS

### links

http://www.tizag.com/cssT/properties.php

http://www.tizag.com/cssT/reference.php



## use this to make sure most CSS work
```html
<!DOCTYPE html>
```

## comments
```css
/*This is a comment*/
```

## syntax
```
"HTML tag" { "CSS Property" : "Value" ; }
p {color: white; }
```

## internal CSS
```html

<html>
	<head>
		<style>
			p {color: white; }
			body {background-color: black; }
		</style>
	</head>
	<body>
		<p>White text on a black background!</p>
	</body>
</html>

```

## external CSS
```css
/* test.css */

body{ background-color: gray;}
p { color: blue; }
h3{ color: white; }
```
```html
<!-- something.html -->
<html>
	<head>
		<link rel="stylesheet" type="text/css" href="test.css" />
	</head>
	<body>
		<h3> A White Header </h3>
		<p> This paragraph has a blue font.  
		The background color of this page is gray because
		we changed it with CSS! </p>
	</body>
</html>
```
## inline CSS
```html


<p style="background: blue; color: white;">
	hello
</p>

```


##Class
```css
 p.first{ color: blue; }
 p.second{ color: red; }
```



## background color
```css
h4 { background-color: white; }
p  { background-color: #1078E1; }
```


#background image

```css

 p { background-image: url(smallPic.jpg); }


/*
background-repeat: repeat;
background-repeat:no-repeat;
background-position:right top;
background-position: 0px 5px;
background-attachment:fixed;
*/
```
##font and text
```css
 h4 { color: red; }

 h6 { font-family: arial; }

 ol{ font-size: 10px; }

 p { font-style: italic; }    /* italic, normal, oblique */

 h6{ text-decoration: underline; }

 a { text-decoration: none; }

 p { text-align: right; } /* right center left justify */

 h5{ text-align: justify; }

 p { text-transform: capitalize; }

 h5{ text-transform: uppercase; }

 h6{ text-transform: lowercase; }

 p { word-spacing: 10px; }

 p { letter-spacing: 3px; } /* word-spacing */

 p {text-indent:50px;}
```

## padding
```css
 p {padding: 15px; border: 1px solid black; }     /*  padding:25px 50px;  */

 h5{padding: 0px; border: 1px solid red;}


 p { padding-left: 5px; border: 1px solid black; }

 h5{
    padding-top: 0px;
    padding-right: 2px;
    padding-bottom: 13px;
    padding-left: 21px;
    border: 1px solid red;
 }


 p {
    padding: 5px 15px;
    border: 1px solid black;
 }  
 h5{
    padding: 0px 5px 10px 3px;
    border: 1px solid red;
 }
```
## margin
```css
p {margin: 5px; border: 1px solid black; }     /* margin:100px 50px; */
h5{margin: 0px; border: 1px solid red;}


 p { margin-left: 5px; border: 1px solid black; }
h5{ margin-top: 0px;
margin-right: 2px;
margin-bottom: 13px;
margin-left: 21px;
border: 1px solid red; }

p {margin: 5px 15px;
border: 1px solid black; }  
h5{margin: 0px 5px 10px 3px;
 border: 1px solid red;}
```
## border
```css
p.solid {border-style: solid; }
p.double {border-style: double; }
p.groove {border-style: groove; }
p.dotted {border-style: dotted; }
p.dashed {border-style: dashed; }
p.inset {border-style: inset; }
p.outset {border-style: outset; }
p.ridge {border-style: ridge; }
p.hidden {border-style: hidden; }


 /* ..................................border width */
 table { border-width: 7px;
border-style: outset; }

td { border-width: medium;
border-style: outset; }

p { border-width: thick;
border-style: solid; }

/* ...................................border color */
p { border-color: blue;
border-style: solid; }

/* .....................................border sides */
h4 { border-top-style: double;
border-top-color: purple;
border-top-width: thick; }
```
##list style
```css
ol { list-style-type: upper-roman; }
ol { list-style-type: none; }
ul { list-style-type: circle; }
ul { list-style-type: square;}
ol { list-style-type: lower-alpha;}
ul { list-style-image: url('sqpurple.gif');}
ul { list-style-position: inside; }
ol { list-style-position: outside; }
```

## links
 ```css
a:link { color: red; }
a:visited { color: red; }
a:hover { color: blue; }
a:active {color: blue;}


a:link {
color: white;
background-color: black;
text-decoration: none;
border: 2px solid white;

}
a:visited {
color: white;
background-color: black;
text-decoration: none;
border: 2px solid white;

}
a:hover {
color: black;
background-color: white;
text-decoration: none;
border: 2px solid black;

}
```
##cursor
```css
p { cursor: wait }
h4 { cursor: help }
h5 { cursor: crosshair }
```
## properties

## position
 ```css
h3 {
	 position: relative;
	top: 15px;
	left: 150px;
}
p {
	 position: relative;
	left: -10px;
}



b{
	position: absolute;
	top: 10px;
	left: 30px;
}

p.pos_fixed
{
position:fixed;
top:30px;
right:5px;
}
```
##layers


##float
 ```css
img.floatLeft {
    float: left;
    margin: 4px;
}
img.floatRight {
    float: right;
    margin: 4px;
}



img.floatRightClear {
    float: right;
    clear: right;        /* right, left, both */
    margin: 4px;
}

```

##ID
 ```css
p#exampleID1 { background-color: white; }
p#exampleID2 { text-transform: uppercase; }
```

##visibility and display
```css
h1.hidden {display:none;} /* hides and does not take up space */

h1.hidden {visibility:hidden;} /* hides but occupies the same space */

li {display:inline;} /* makes elements go in the same line */

p.hide {display:block;} /* makes elements take up all the line */
```
## grouping
```css
 h1,h2,p { color:green; }
```


## z-index
```css
img
{
position:absolute;    /* absolute, fixed, relative */
left:0px;
top:0px;
z-index:-1;   /* the smallest number goes behind, the largest number goes infront  */
}
```

## when you click a form
```css
input:focus
{
background-color:yellow;
}
```

##overflow
```css
div.scroll
{
background-color:#00FFFF;
width:100px;
height:100px;
overflow:scroll;    /* scroll, hidden */
}

```

##opacity
```css
img
{
opacity:0.4;
filter:alpha(opacity=40); /* For IE8 and earlier */
}
img:hover
{
opacity:1.0;
filter:alpha(opacity=100); /* For IE8 and earlier */
}
```

## descendent
```css


ul em {
  color: #000000;
}


```

## attribute selector

```html

<!DOCTYPE html>
<html>
<head>
<style>
[title~=hello]
{
color:blue;
}
</style>
</head>

<body>
<h2>Will apply to:</h2>
<h1 title="hello world">Hello world</h1>
<p title="student hello">Hello CSS students!</p>
<hr>
<h2>Will not apply to:</h2>
<p title="student">Hi CSS students!</p>
</body>
</html>
```

## attribute selector 2
```css
/* select elements by their attribute */

[title] { color:blue; }


[title=W3Schools] { border:5px solid green; } /* dont use " " ????? */


[title~=hello] { color:blue; }    /* that contains the word "hello"  */


[lang|=en] { color:blue; }  /* a word that contains "en" inside it */
```

## CSS Image Sprites



```html

<!DOCTYPE html>
<html>
<head>
<style>
img.home
{
width:46px;       /* the size of the frame */
height:44px;      /* the size of the frame */
background:url(img_navsprites.gif) 0 0;    /* its like positioning a big picture to a small frame */  /* 0 0   <----- could be:    -30px 34px */
}
img.next
{
width:43px;
height:44px;
background:url(img_navsprites.gif) -91px 0;
}
</style>
</head>

<body>
<img class="home" src="img_trans.gif" width="1" height="1" />
<br><br>
<img class="next" src="img_trans.gif" width="1" height="1" />
</body>
</html>

```


## EXTRAS



```css

@media screen


<head>
@import "mystyle.css";
</head>

```
