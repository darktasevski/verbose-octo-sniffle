README.txt
    -> load the js and css scripts for ui-grid
    -> angular.module('myApp', ['ui.grid'])
    -> <div ui-grid="gridOptions1" class="myGrid"></div>
    GOTCHAS:
        -> if there is an error, the computer is right... check typos, if js is loaded, etc
    ui.grid.edit
        -> add to your module ['ui.grid', ui.grid.edit']
        -> add the ui-grid-edit directive in the HTML: <div ui-grid="gridOptions1" ui-grid-edit class="myGrid"></div>
    ui.grid.pagination
        -> add to your module ['ui.grid', ui.grid.pagination']
        -> add the ui-grid-edit directive in the HTML: <div ui-grid="gridOptions1" ui-grid-pagination class="myGrid"></div>
