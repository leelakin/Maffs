describe("Slider", function(){

	var slider = new Slider();

	it("should slide an element", function(){
		expect(slider.slide()).toBe(true);
	});

});