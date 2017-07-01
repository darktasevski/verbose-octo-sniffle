//import the net module package
var net = require('net')
//asignment
//make a server instance
var server = net.createServer(function(socket){
    socket.on("data",function(){
        socket.write("hello,world");
    })
    socket.on("end",function(){
        console.log("链接断开！")
    })
    socket.write("欢迎光临dejunwang.com")
})
//bint the server instance with the port 8142
server.listen(8124,function(){
    console.log("Server Bound........")
})

