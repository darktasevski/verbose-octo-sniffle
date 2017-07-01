% helloworld.erl

% http://learnyousomeerlang.com/introduction#about-this-tutorial


% compiling:
% $ erlc foo.erl

%------------------------------------------------------------ basic program
-module(helloworld).
-export([start/0]).

start() ->
    io:fwrite("Hello, world!~n"). % `~n` is a new line 
    
%------------------------------------------------------------ variables
-module(helloworld).
-export([start/0]).

-define(MyMessage, "Hello").
-define(MyFirstName, "Brian").
-define(MyLastName, "Spinos").
-define(MyAge, 27).

start() ->
    io:fwrite("MyMessage: ~s~n", [?MyMessage]), % use a comma
    io:fwrite("MyFirstName: ~s~n", [?MyFirstName]), % use a comma
    io:fwrite("MyLastName: ~s~n", [?MyLastName]), % use a comma
    io:fwrite("MyAge: ~p~n", [?MyAge]). % use a dot        `~p`  is to print numbers also

%------------------------------------------------------------
-module(helloworld).
-export([start/0]).

start() ->
    MyMessage = "hello",
    io:fwrite("~p~n", [MyMessage]).

%------------------------------------------------------------ functions
% moduleName:functionname(arguments).
% functionName(arguments).

-module(helloworld).
-export([start/0]).

% defining a function
sayHello(Name) ->
    io:format("hello ~s~n", [Name]).

sayNumber(Num) ->
    io:format("Number is: ~p~n", [Num]).

start() ->
    io:fwrite(sayHello("brian")),
    io:fwrite(sayNumber(123)).

%------------------------------------------------------------
