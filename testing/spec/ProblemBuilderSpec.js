describe("the Problem Builder", function(){

	var builder = new ProblemBuilder();
	var someArg = $(document);

	it("should build a problem", function(){
		expect(builder.build(someArg)).toBe(true);
	});

});