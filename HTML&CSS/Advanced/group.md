### Effectively Containing Floats

Using the clearfix technique for example, Dan Cederholm helped coin the class name group. The group class name can then be applied to any parent element needing to contain floats.

```

.group:before,
.group:after {
  content: "";
  display: table;
}
.group:after {
  clear: both;
}
.group {
  *zoom: 1;
}


```

It is worth noting only one :before and one :after pseudo-element are allowed per element, for the time being. When trying to use the clearfix technique with other :before and :after pseudo-element content you may not achieve the desired outcome.