//EventUtil.js是在《JavaScript高级程序设计》提到的一个小型工具库，封装了常规的事件操作，
//为兼容不同的浏览器做了很多工作
//Jquery之所以这么流行，不单单是写法非常简洁，而且做了很多兼容不同浏览器的工作，很多库以此为生
/**
 * EventUtil.js
 * --------------
 * EventUtil.addHandler(element,type,handler);
 * EventUtil.removeHandler(element,type,handler);
 * EventUtil.get(event);
 * EventUtil.getTarge(event);
 * EventUtil.preventDefault(event);
 * EventUtil.stopPropagation(); 
 * EventUtil.getRelatedTarget(event);获取mouseover和mouseout相关元素
 * EventUtil.getButton(event);
 * EventUtil.getWheelDelta(event);//获取表示鼠标滚轮滚动方向的数值
 * EventUtil.getCharCode(event);以跨浏览器取得相同的字符编码
 * -------------------
 */
var EventUtil = {
    addHandler: function (element, type, handler) {
        if (element.addEventListener) {  //使用DOM2级方法添加事件  
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {  //使用IE方法添加事件
            element.attachEvent("on" + type, handler);
        } else {    //使用DOM0级方法添加事件
            element["on" + type] = handler;
        }
    },
    removeHandler:function(element,type,handler){  //取消事件   
        if(element.removeEventListener){         
            element.removeEventListener(type,handler,false);      
        }else if(element.detachEvent){         
            element.detachEvent("on"+type,handler);      
        }else{  
            element["on"+type]=null;      
            }   
    },
    getEvent:function(event){  //使用这个方法跨浏览器取得event对象      
        return event?event:window.event;   
    },       
    getTarget:function(event){ //返回事件的实际目标      
        return event.target||event.srcElement;   
    },
    preventDefault:function(event){   //阻止事件的默认行为      
        if(event.preventDefault){         
            event.preventDefault();       
        }else{         
            event.returnValue=false;      
        }   
    },   
    stopPropagation:function(event){  //立即停止事件在DOM中的传播  
    //避免触发注册在document.body上面的事件处理程序     
        if(event.stopPropagation){         
            event.stopPropagation();      
        }else{         
            event.cancelBubble=true;      
        }   
    },    
    getRelatedTarget:function(event){  //获取mouseover和mouseout相关元素      
        if(event.relatedTarget){         
            return event.relatedTarget;      
        }else if(event.toElement){      //兼容IE8-         
            return event.toElement;              
        }else if(event.formElement){         
            return event.formElement;      
        }else{         
            return null;      
        }   
    },          
    getButton:function(event){    //获取mousedown或mouseup按下或释放的按钮是鼠标中的哪一个 
        if(document.implementation.hasFeature("MouseEvents","2.0")){
            return event.button;     
        }else{         
            switch(event.button){   //将IE模型下的button属性映射为DOM模型下的button属性 
                case 0:            
                case 1:            
                case 3:            
                case 5:            
                case 7:               
                    return 0;  //按下的是鼠标主按钮（一般是左键）            
                case 2:           
                case 6:              
                    return 2;  //按下的是中间的鼠标按钮            
                case 4:              
                    return 1;  //鼠标次按钮（一般是右键）   

            }    
        } 
    },    
    getWheelDelta:function(event){ //获取表示鼠标滚轮滚动方向的数值      
        if(event.wheelDelta){         
            return (client.engine.opera&&client.engine.opera<9.5?-event.wheelDelta:event.wheelDelta);      
        }else{        
            return -event.detail*40;      
        }   
    },          
    getCharCode:function(event){   //以跨浏览器取得相同的字符编码，需在keypress事件中使用          
        if(typeof event.charCode=="number"){         
            return event.charCode;      
        }else{        
            return event.keyCode;    
        }  
    }        
};

