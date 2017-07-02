/**
 *  #立即执行并且销毁函数,varialbe
 * -------------------
 * (function(){})()
 *
 */

(function(name){console.log(name)})()
//output:undefined

(function(name){
    console.log(name)})("name")
//output:name
(function(name){console.log(name)})("name","wangdejun")
//output:name,
(function(name){console.log(name)})(["wang","de","jun"],["zhang","san","feng"])
//output:["wang","de","jun"],
(function(name,what){console.log(name+","+what)})("wangdejun","Hi,there!")
