//封装foreach遍历形式，元素顺序不变
function forEach(list,callback){
    for(var n=0;n<list.length;n++){
        callback.call(list[n],n)
    }
}
var weapons = ["knife","guns","canons"]

forEach(weapons,function(index){
    console.log(index,weapons[index])
})