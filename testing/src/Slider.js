function Slider (){
	//after sliding down, problemBuilder calls double up on each submit & slide down
	console.log("slider clicked, start functionality.");
	
	
	
	this.slide = function(clickedElement){
		var $content = $(clickedElement).closest(".choicesec").find(".cont");
		console.log("after 1st line");
		if(!$content.is(".activeSlide")){//if the clicked slide isn't the active one
			$(".activeSlide").slideUp();
			$(".activeSlide").removeClass("activeSlide");
			$content.addClass("activeSlide");

			//problemBuilder($content);

			$content.slideDown(); //slide down only after problemBuilder has run.

		}else{ //if the clicked slide is the active one, slide it up.
			$content.slideUp();
			$(".activeSlide").removeClass("activeSlide");
		};
		return true;
	};
};