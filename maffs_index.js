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

	$bubble.html("Maths is fun when you get the hang of it! <br><img src=\"bulb.png\" class=\"bulb\"/> help")

	//create problem based on class
	var x = Math.round((Math.random())*100); 
	var y = Math.round((Math.random())*100);
	var correctAnswer; var probSymbol;
	if($content.hasClass("add")){
		correctAnswer = x+y; probSymbol = "+";
	}else if($content.hasClass("sub")){
		while(y>x){
			var y = Math.round((Math.random())*100);
		};
		correctAnswer = x-y; probSymbol = "-";
	}else if($content.hasClass("div")){
		while(x%y!==0 || x==0 || y==0){
			var x = Math.round((Math.random())*100);
			var y = Math.round((Math.random())*100);
		};
		correctAnswer = x/y; probSymbol = "/";
	}else if($content.hasClass("mult")){
		var x = Math.round((Math.random())*10); 
		var y = Math.round((Math.random())*10);
		correctAnswer = x*y; probSymbol = "*";
	}else if($content.hasClass("prime")){
		alert("prime triggered");
		correctAnswer = "NOPE"; probSymbol = "NOPE";
	}else{
		alert("default triggered");
	};
	//insert custom problem
	var problem = x+ " <b>"+probSymbol+"</b> " +y+ " = " + "<input type=\"text\" class=\"field\" placeholder=\"result\"> <button type=\"submit\" class=\"submit\">Enter</button>";
	$content.find(".problem").html(problem);

	//HELP LISTENER
	$(document).on("click", ".bulb", function(event){
		event.preventDefault();
		$("#help").show();
		$(document).on("click");
		$(document).on("click", "#closeX", function(event){
			event.preventDefault();
			$("#help").hide();
		});
	});

	//SUBMIT LISTENER
	$(".submit").on("click", function(event){
		var answer = $(this).closest(".problem").find(".field").val();
		console.log("answer got collected by submit listener.");

		if(isNaN(answer) || answer ===""){
			console.log("answer " +answer+ " is NaN");
			$bubble.text("Please enter a valid number! No letters or symbols.");
			$content.find(".img").attr("src","tryagimg.png");
		}else{
			if(answer == correctAnswer){
				console.log("correct answer " +answer+ ".");
				$(".submit").off("click");
				$content.find(".refresh").show();
				$content.find(".img").attr("src","rightimg.png");
				$bubble.html("<b>Well done!</b> The correct answer is " +correctAnswer+ ". Click below to solve the next problem!");

				//this is an important point! problemBuilder should stop running completely here until it's called again

			}else{
				console.log("number " +answer+ ", but wrong number");
				$content.find(".img").attr("src","tryagimg.png");
				$bubble.html("Wrong answer! But don't worry, try again! <br><img src=\"bulb.png\" class=\"bulb\"/> help");
			};
		};
		console.log("answer: " +answer+ ", correctAnswer: " +correctAnswer);
	});
};