describe("Slider", function(){

	it("should slide an element", function(){
		var slider = new Slider();
			expect(slider.slide()).toBe(true);
	});

});