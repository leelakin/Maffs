$(".choicesec").on("click", ".headl", function (event){
	//after sliding down, problemBuilder calls double up on each submit & slide down
	console.log("slider clicked, start functionality.");
	event.preventDefault();
	var $content = $(this).closest(".choicesec").find(".cont");
	
	if(!$content.is(".activeSlide")){//if the clicked slide isn't the active one
		$(".activeSlide").slideUp();
		$(".activeSlide").removeClass("activeSlide");
		$content.addClass("activeSlide");

		problemBuilder($content);

		$content.slideDown(); //slide down only after problemBuilder has run.

	}else{ //if the clicked slide is the active one, slide it up.
		$content.slideUp();
		$(".activeSlide").removeClass("activeSlide");
	};
});


$(document).on("click", ".refresh", function(){
	var $content = $(this).closest(".cont");
	problemBuilder($content); //this didn't pass properly before bc I removed $(this) before $content could get defined
	$(this).hide();
});


var problemBuilder = function($content){ //passing content will keep the context (class)
	var $bubble = $content.find(".bubble");
	console.log("problemBuilder starts running.");

	if(!$content.hasClass("activeSlide")){ //if problemBuilder is still running on an old inactive slide, return.
		console.log("returned!");
		return;
	};

	if($content.hasClass("prime")){
		$bubble.html("<b>Prime Numbers</b> are numbers which can only be divided by 1 and themselves!")
	}else{
		$bubble.html("Maths is fun when you get the hang of it! <br><img src=\"bulb.png\" class=\"bulb\"/> help")
	};
	//create problem based on class
	var x = Math.round((Math.random())*100); 
	var y = Math.round((Math.random())*100);
	var correctAnswer; var probSymbol;
	if($content.hasClass("add")){
		correctAnswer = x+y; probSymbol = "+";
	}else if($content.hasClass("sub")){
		while(y>x){
			y = Math.round((Math.random())*100);
		};
		correctAnswer = x-y; probSymbol = "-";
	}else if($content.hasClass("div")){
		while(x%y!==0 || x==0 || y==0){
			x = Math.round((Math.random())*100);
			y = Math.round((Math.random())*100);
		};
		correctAnswer = x/y; probSymbol = "/";
	}else if($content.hasClass("mult")){
		x = Math.round((Math.random())*10); 
		y = Math.round((Math.random())*10);
		correctAnswer = x*y; probSymbol = "*";
	}else{
		if(!$content.hasClass("prime")){
			alert("default triggered");
		};
	};
	//insert custom problem
	var problem;
	if(!$content.hasClass("prime")){ //works
		console.log("problem gets inserted for anything but prime");
		problem = x+ " <b>"+probSymbol+"</b> " +y+ " = " + "<input type=\"text\" class=\"field\" placeholder=\"result\"> <button type=\"submit\" class=\"submit\">Enter</button>";
		$content.find(".problem").html(problem);		
	}else if ($content.hasClass("prime")){ //why doesn't this work??
		console.log("class was prime, insert problem");
		problem = "<input type=\"text\" class=\"field\" placeholder=\"result\"> <button type=\"submit\" class=\"submit\">Enter</button>";
		$content.find(".problem").html(problem);
	};

	//SUBMIT LISTENER
	$(".submit").on("click", function(event){
		var answer = $(this).closest(".problem").find(".field").val();
		var answerLength = answer.toString().length;
		var $content = $(this).closest(".choicesec").find(".cont");
		console.log("Does $content have class prime? " +$content.hasClass("prime"));

		console.log("answer length is " +answerLength);

		if(isNaN(answer) || answer ===""){
			console.log("answer " +answer+ " is NaN");
			$bubble.text("Please enter a valid number! No letters or symbols.");
			$content.find(".img").attr("src","tryagimg.png");
		}else{
			//limit length of number entered!
			if($content.hasClass("prime") && answerLength>=6){
				$bubble.text("Don't overdo it! Pick a slightly smaller number, please.");
			}else if($content.hasClass("prime") && answerLength<6){
				console.log("doing the prime checking thing. user entered number " +answer);
				var primeCounter = 2; var divisors = [];
				//iterate through possible, divisors, skipping 1 & own number
				while(primeCounter<(answer/2)+1){
					if(answer%primeCounter===0){
						divisors.push(primeCounter);
					};
					primeCounter++;
				};
				console.log("divisors are " +divisors);

				if(divisors.length>0){
					var lastDivisor = divisors.pop(); //separates last divisor for legibility
					$bubble.html(answer+ " is <b>not</b> a prime number! Apart from 1 and " +answer+ ", it can also be divided by <b>" +divisors+ " and " +lastDivisor+ "</b>.");
				}else{
					$bubble.html(answer+ " is a <b>prime number</b>! It can only be divided by the numbers 1 and " +answer+ ".");
					$content.find(".img").attr("src","rightimg.png");
				};
				
			}else{
				if(answer == correctAnswer){
					console.log("correct answer " +answer+ ".");
					$(".submit").off("click");
					$content.find(".refresh").show();
					$content.find(".img").attr("src","rightimg.png");
					$bubble.html("<b>Well done!</b> The correct answer is " +correctAnswer+ ". Click below to solve the next problem!");
				}else{
					console.log("number " +answer+ ", but wrong number");
					$content.find(".img").attr("src","tryagimg.png");
					$bubble.html("Wrong answer! But don't worry, try again! <br><img src=\"bulb.png\" class=\"bulb\"/> help");
				};
			};
		};
		console.log("answer: " +answer+ ", correctAnswer: " +correctAnswer);
	});
};


//HELP LISTENER
$(document).on("click", ".bulb", function (event){
	event.preventDefault();
	var $content = $(event.target).closest(".choicesec").find(".cont");
	console.log("bulb clicked. $content classes: " +$content.attr("class"));

	$("#help").show();
	
	var helpClass = $content.attr("class").split(" ");

	console.log("split array method shows class " +helpClass[0]);
	//build custom ajax request
	$.ajax({
		url: "ajax_" +helpClass[0]+ ".html",
		success: function(result){
			$("#helptext").html(result);
		},
		error: function(request, errorType, errorMsg){
			$("#helptext").text("Error! " +errorType+ " with message " +errorMsg);
		},
		timeOut: 4000,
		beforesend: function(){
			$("#helptext").text("Please wait, help loading...")
		}
	});


	$(document).on("click", "#closeX", function(event){
		event.preventDefault();
		$("#help").hide();
	});
});