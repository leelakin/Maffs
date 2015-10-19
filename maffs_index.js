
$(".choicesec").on("click", ".headl", function(event){
	event.preventDefault();
	var $this = $(this);
	var $content = $this.closest(".choicesec").find(".cont");

	if(!$content.is(".activeSlide")){
		$(".activeSlide").slideUp();
		$(".activeSlide").removeClass("activeSlide");
		$content.addClass("activeSlide");

		if($content.hasClass("add")){
			addRandomiser($content);
		}else if($content.hasClass("sub")){
			subRandomiser($content);
		}else if($content.hasClass("mult")){
			alert("not ready yet");
		}else if($content.hasClass("div")){
			divRandomiser();
		}else if($content.hasClass("prime")){
			alert("not ready yet");
		};

		$content.slideDown();

	}else{
		$content.slideUp();
		$(".activeSlide").removeClass("activeSlide");
	};
});


var addRandomiser = function($content){
	$("#newadd").hide();
	var x = Math.round((Math.random())*100); //not refreshing these when tab reopened
	var y = Math.round((Math.random())*100); //just displays last state before slideUp
	var addproblem = x+ " <b>+</b> " +y+ " = " + "<input type=\"text\" class=\"field\" id=\"addfield\" placeholder=\"result\"> <button type=\"submit\" id=\"addsubmit\">Enter</button>";
	$("#addmaffs").html(addproblem);

	$("#addsubmit").on("click", function(event){
		event.preventDefault;
		var answer = $("#addfield").val();
		var $bubble = $content.find(".bubble");
		if(isNaN(answer) || answer ===""){
			$bubble.html("Please enter a valid number! No letters or symbols.");
		}else{
			if(answer == (x+y)){
				$content.find(".img").attr("src","rightimg2.png");
				$bubble.html("Well done! The correct answer is " +(x+y)+ ". Click below to solve the next problem!");
				$("#newadd").show();
			}else{
				$content.find(".img").attr("src","tryagimg2.png");
				$bubble.html("Wrong answer! But don't worry, try again! [help icon]");
			}
		}
	});
	$("#newadd").on("click", function(event){
		event.preventDefault;
		addRandomiser($content); //is this a safe way to just refresh the inner HTML?
		$(this).hide();
	});
};

var subRandomiser = function($content){
	var x = Math.round((Math.random())*100);
	var y = Math.round((Math.random())*100);
	while(y>x){
		var y = Math.round((Math.random())*100);
	};
	var subproblem = x+ " - " +y+ " = " + "<input type=\"text\" class=\"field\" id=\"subfield\" placeholder=\"result\"> <button type=\"submit\" id=\"subsubmit\">Enter</button>";
	$("#submaffs").html(subproblem);

	$("#subsubmit").on("click", function(){
		var answer = $("#subfield").val();
		if(isNaN(answer) || answer ===""){
			alert("Please enter a valid number.");
		}else{
			if(answer == (x-y)){
				alert("Right!"); //change to HTML insert of Fox
			}else{
				alert("Wrong! Try again."); //change to HTML insert of help
			}
		}
	});

	$("#newsub").on("click", function(event){
		event.preventDefault;
		subRandomiser(); //is this a safe way to just refresh the inner HTML?
	});

};

var divRandomiser = function(){
	var x = Math.round((Math.random())*100);
	var y = Math.round((Math.random())*100);
	while(x%y!==0 || x==0 || y==0){
		var x = Math.round((Math.random())*100);
		var y = Math.round((Math.random())*100);
	};

	var divproblem = x+ " / " +y+ " = " + "<input type=\"text\" class=\"field\" id=\"divfield\" placeholder=\"result\"> <button type=\"submit\" id=\"divsubmit\">Enter</button>";
	$("#divmaffs").html(divproblem);

	$("#divsubmit").on("click", function(event){
		event.preventDefault;
		var answer = $("#divfield").val()
		if(isNaN(answer) || answer ===""){
			alert("Please enter a valid number.");
		}else{
			if(answer == (x/y)){
				alert("Right!"); //change to HTML insert of Fox
			}else{
				alert("Wrong! Try again."); //change to HTML insert of help
			}
		}		
	})

	$("#newdiv").on("click", function(event){
		event.preventDefault;
		divRandomiser(); //is this a safe way to just refresh the inner HTML?
	});
};

