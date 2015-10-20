
$(".choicesec").on("click", ".headl", function(event){
	event.preventDefault();
	var $this = $(this);
	var $content = $this.closest(".choicesec").find(".cont");

	if(!$content.is(".activeSlide")){
		$(".activeSlide").slideUp();
		$(".activeSlide").removeClass("activeSlide");
		$content.addClass("activeSlide");

		problemBuilder($content);
		$content.slideDown();

	}else{
		$content.slideUp();
		$(".activeSlide").removeClass("activeSlide");
	};
});

//RESULT CHECKER
var resultChecker = function($content, answer, correctAnswer){
	var $bubble = $content.find(".bubble");
	if(isNaN(answer) || answer ===""){
		$bubble.text("Please enter a valid number! No letters or symbols.");
	}else{
		if(answer == correctAnswer){
			$content.find(".img").attr("src","rightimg2.png");
			$bubble.html("Well done! The correct answer is " +correctAnswer+ ". Click below to solve the next problem!");
			$content.find(".refresh").show();
		}else{
			$content.find(".img").attr("src","tryagimg2.png");
			$bubble.html("Wrong answer! But don't worry, try again! [help icon]");
		}
	}
};

//PROBLEM BUILDER
var problemBuilder = function($content){
	var x = Math.round((Math.random())*100); 
	var y = Math.round((Math.random())*100);
	var correctAnswer = x+y; //addition is the default case
	var probSymbol = "+";

	if($content.hasClass("sub")){
		while(y>x){
			var y = Math.round((Math.random())*100);
		};
		correctAnswer = x-y; probSymbol = "-"; //set up answer & symbol for each case
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
		correctAnswer = alert("not yet set up"); probSymbol = alert("not yet set up");
	};

	var problem = x+ " <b>"+probSymbol+"</b> " +y+ " = " + "<input type=\"text\" class=\"field\" placeholder=\"result\"> <button type=\"submit\" class=\"submit\">Enter</button>";
	
	$content.find(".refresh").hide();
	$content.find(".problem").html(problem);
	
	$(".submit").on("click", function(event){
		event.preventDefault();
		var answer = $(".field").val();
		resultChecker($content, answer, correctAnswer); //delegate
	});
	$content.on("click",".refresh", function(event){
		event.preventDefault();
		problemBuilder($content); //is this a safe way to just refresh the inner HTML?
		$(this).hide();
		$content.find(".bubble").text("Maths is really fun when you get the hang of it! [help icon]");
	});	
};
