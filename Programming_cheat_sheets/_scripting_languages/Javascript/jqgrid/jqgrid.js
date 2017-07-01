// jqgrid


$("#my-grid-id").jqGrid('setCell',"1","MyColumnName","",{"background-color":'red'}); // set cell color

$("#my-grid-id").getRowData(1); // get a record object from the first row

$("#my-grid-id").jqGrid("getGridParam", "colModel"); // array of column objects, see the .name field

