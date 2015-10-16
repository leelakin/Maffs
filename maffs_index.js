
$(".choicesec").on("click", ".headl", function(event){
	event.preventDefault();
	var $this = $(this);
	var $content = $this.closest(".choicesec").find(".cont");

	if(!$content.is(".activeSlide")){
		//if($content.className != "activeSlide"){ ...didn't work.
		//problem because 
		$(".activeSlide").slideUp();
		$(".activeSlide").removeClass("activeSlide");
		$content.addClass("activeSlide");
		//runAjaxCall($content);
		$content.slideDown();

	}else{
		//could have alert 'Are you sure you want to close [section name]?'
		$content.slideUp();
		$(".activeSlide").removeClass("activeSlide");
	};

	if($content.hasClass("add")){
		addRandomiser();
	};

});

var addRandomiser = function(){

	var x = Math.round((Math.random())*10);
	var y = Math.round((Math.random())*10);
	var addproblem = x+ " + " +y+ " = " + "<input type=\"text\" id=\"addfield\" placeholder=\"result\"> <input type=\"submit\" id=\"addsubmit\">";
	$("#addmaffs").html(addproblem);

	$("#addsubmit").on("click", function(){
		var answer = $("#addfield").val();
		if(isNaN(answer)){
			alert("Please enter a valid number.");
		}else{
			if(answer == (x+y)){
				alert("Right!");
			}else{
				alert("Wrong! Try again.");
			}
		}
	})
	//when submit is clicked, get .val() & see if it's a number. alert.
	//check whether number is the right result; alert.

	$("#newadd").on("click", function(){
		addRandomiser(); //is this a safe way to just refresh the inner HTML?
	});
};



/*var runAjaxCall = function(sectionType){

	if(sectionType.hasClass("add")){

		$.ajax("maffs_addition.html", { //local works in Firefox, not Chrome.
			//this url works in neither when all is uploaded, throws empty error
			type: "GET",
			dataType: "html",
			success: function(response){
				sectionType.append(response);
			},
			error: function(request,errorType,errorMsg){
				alert("Error: "+errorType+" with message: "+errorMsg);
			},
			timeOut: 4000
		})
	}else if(sectionType.hasClass("sub")){
		alert("sub");
	}else if(sectionType.hasClass("mult")){
		alert("mult");
	}else if(sectionType.hasClass("div")){
		alert("div");
	}else if(sectionType.hasClass("prime")){
		alert("prime");
	};

};*/