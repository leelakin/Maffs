
$(".choicesec").on("click", ".headl", function(){
	var $this = $(this);
	var $content = $this.closest(".choicesec").find(".cont");

	if(!$content.is(".activeSlide")){
		//if($content.className != "activeSlide"){ ...didn't work.
		//problem because 
		$(".activeSlide").slideUp();
		$(".activeSlide").removeClass("activeSlide");
		$content.addClass("activeSlide");
		runAjaxCall($content);
		$content.slideDown();

	}else{
		//could have alert 'Are you sure you want to close [section name]?'
		$content.slideUp();
		$(".activeSlide").removeClass("activeSlide");
	};
});

var runAjaxCall = function(sectionType){

	if(sectionType.hasClass("add")){
		alert("add");
		$.ajax("http://www.leelakin.com/code/maffs_addition.html", { //local works in Firefox, not Chrome.
			//this url works in neither, throws empty error
			type: "GET",
			dataType: "html",
			success: function(response){
				sectionType.html(response);
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

};