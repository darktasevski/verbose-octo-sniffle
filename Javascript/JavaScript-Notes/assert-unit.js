<html>
	<head>
		<title>
			Test Suiter
		</title>
		<script>
		
		(function(){
			var results;
			this.assert = function assert(value,desc){
				var li = document.createElement("li");
				li.className = value ? "pass":"fail";
				li.appendChild(document.createTextNode(desc));
				results.appendChild(li);

				if(!value){
					li.parentNode.parentNode.className = "fail";
				}
				return li;
			}
			this.test = function test(name,fn){
				results = document.getElementById("results")
				results = assert(true,name).appendChild(
						document.createElement("ul")
					)
				fn();
			}
		})();

			var a = 12
			var b = 12

			window.onload = function(){
				test("A test",function(){
					assert(true,"The test suiter is running")
					assert(false,"Fail!")
					assert(a==12,"a value is Good!")
					assert(b!=12,"b value is wrong")
				})
				test("B test",function(){
					assert(true,"The B test")
					assert(true,"The B Test")
				})
				test("C test",function(){
					assert(false,"The C test")
				})
			}
		</script>
		<style>
		 	#results li.pass{
		 		color:green;
		 	}
		 	#results li.fail{
		 		color:red;
		 	}
		</style>
	</head>
	<body>
		<ul id= "results"></ul>
	</body>
</html>