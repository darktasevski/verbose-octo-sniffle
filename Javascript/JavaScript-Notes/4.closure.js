var pet = function(name) {          
  //外部函数定义了一个变量"name"
  var getName = function() {            
    //内部函数可以访问 外部函数定义的"name"
    return name; 
  }
  //返回这个内部函数，从而将其暴露在外部函数作用域
  return getName;               
};

myPet = pet("Vivie");
console.log(myPet()); 

function settingCountry(country_param){
    var getName = function(){
        if(country_param){
            return country_param
        }
    }
    return getName;
}
myCountry=settingCountry("zh")
console.log(myCountry());
myCountry=settingCountry("cn")
console.log(myCountry());
console.log(myCountry());
