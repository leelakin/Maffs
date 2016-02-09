
//---------EVENT LISTENERS-----------------------------------------

//NEW SLIDER CLICK EVENT

$(".choicesec").on("click", ".headl", function (event){
	//after sliding down, problemBuilder calls double up on each submit & slide down
	event.preventDefault();
	var slider = new Slider();
	slider.slide($(this)); //pass clicked element
});

//NEW SUBMIT CLICK EVENT

$(".problem").on("click",".submit", function(event){
	event.preventDefault();
	var $that = $(this);
	var entered = $that.closest(".problem").find(".field").val();
	var checker = new ResultChecker(entered, $that);
});

//NEW REFRESH CLICK EVENT

$(".cont").on("click", ".refresh", function(event){
	event.preventDefault();
	var refreshBtn = $(this);
	var $content = refreshBtn.closest(".cont");

	//problemBuilder($content);
	
	refreshBtn.hide();
});

//---------GLOBAL VARS---------------------------------------------

var correctAnswer;

//---------FUNCTIONS-----------------------------------------------

//NEW SLIDER

function Slider(){

	this.slide = function(clickedElement){

		var $content = clickedElement.closest(".choicesec").find(".cont");

		if(!$content.is(".activeSlide")){ //if the clicked slide isn't the active one
			$(".activeSlide").slideUp(); //close all currently open slides first
			$(".activeSlide").removeClass("activeSlide"); //& remove their class
			$content.addClass("activeSlide"); //add class to new active slider

			var builder = new ProblemBuilder($content);
			builder.build(); //insert problem

			$content.slideDown(); //slide down new active slide only after problemBuilder has run.

		}else{ //if the clicked slide is the active one, slide it up.
			$content.slideUp();
			$(".activeSlide").removeClass("activeSlide");
		};

	};
};

//NEW PROBLEMBUILDER

function ProblemBuilder($content){

	var $bubble = $content.find(".bubble");
	var isPrime = false;

	this.build = function(){

		console.log("ProblemBuilder.build runs.");
		var problemObj = this.generateMaths();

		//add object attributes etc.
		var problem = problemObj.nums[0]+ " <b>"+problemObj.symbol+"</b> " +problemObj.nums[1]+ " = <input type=\"text\" class=\"field\" placeholder=\"result\"> <button type=\"submit\" class=\"submit\">Enter</button>";
		
		//this goes into this.insert()
		this.insert(problem);		

	};

	this.generateMaths = function(){

		var x = Math.round((Math.random())*100); 
		var y = Math.round((Math.random())*100);
		//var correctAnswer;
		var probSymbol;

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
			if($content.hasClass("prime")){
				isPrime = true;
			};
		};
		//correctAnswer as global var OR invoke some function here to store it for resultChecker
		return {symbol:probSymbol, nums:[x,y]};
	};

	this.insert = function(problem){

		if(isPrime){
			console.log("it's prime");
			$bubble.html("A <b>Prime Numbers</b> is a number which can only be divided by 1 and itself!");
			problem = "<input type=\"text\" class=\"field\" placeholder=\"result\"> <button type=\"submit\" class=\"submit\">Enter</button>";
		}else{
			console.log("not prime");
			$bubble.html("Maths is fun when you get the hang of it! <br><img src=\"bulb.png\" class=\"bulb\"/> help")
		};

		$content.find(".problem").html(problem);
	};

};

//NEW RESULTCHECKER

function ResultChecker(entered, submitEl){

	alert("checking result " + entered + " against correct answer " + correctAnswer);

	//PASTED FROM OLD:
	var enteredLength = entered.toString().length;
	var $content = submitEl.closest(".choicesec").find(".cont");
	var $bubble = $content.find(".bubble");

	console.log("Does $content have class prime? " +$content.hasClass("prime"));

	console.log("answer length is " + enteredLength);
  
	if(isNaN(entered) || entered ===""){
		console.log("entered answer " + entered + " is NaN");
		$bubble.text("Please enter a valid number! No letters or symbols.");
		$content.find(".img").attr("src","tryagimg.png");
	}else{
		//limit length of number entered!
		if($content.hasClass("prime") && enteredLength >= 6){
			$bubble.text("Don't overdo it! Pick a slightly smaller number, please.");
		}else if($content.hasClass("prime") && enteredLength < 6){
			console.log("doing the prime checking thing. user entered number " + entered);
			var primeCounter = 2; var divisors = [];
			//iterate through possible, divisors, skipping 1 & own number
			while(primeCounter < (entered / 2) + 1){
				if(entered % primeCounter===0){
					divisors.push(primeCounter);
				};
				primeCounter++;
			};
			console.log("divisors are " +divisors);

			if(divisors.length > 1){
				var lastDivisor = divisors.pop(); //separates last divisor for legibility
				$bubble.html(entered+ " is <b>not</b> a prime number! Apart from 1 and " + entered + ", it can also be divided by <b>" + divisors + " and " + lastDivisor + "</b>.");
			}else{
				$bubble.html(entered+ " is a <b>prime number</b>! It can only be divided by the numbers 1 and " + entered + ".");
				$content.find(".img").attr("src","rightimg.png");
			};
			
		}else{
			if(entered == correctAnswer){
				console.log("correct answer " +entered+ ".");
				$(".submit").off("click");
				$content.find(".refresh").show();
				$content.find(".img").attr("src","rightimg.png");
				$bubble.html("<b>Well done!</b> The correct answer is " +correctAnswer+ ". Click below to solve the next problem!");
			}else{
				console.log("number " + entered + ", but wrong number");
				$content.find(".img").attr("src","tryagimg.png");
				$bubble.html("Wrong answer! But don't worry, try again! <br><img src=\"bulb.png\" class=\"bulb\"/> help");
			};
		};
	};

};


/*
var problemBuilder = function($content){ //passing content will keep the context (class)
	

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

*/