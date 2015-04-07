describe('Number.Formatter', function() {
	var nf = L.NumberFormatter;
	it("formatts 9.27 correctly to DMS 9&deg; 16' 12''", function() {
		expect(nf.toDMS(9.27)).toEqual("9&deg; 16' 12''");
	});
	it("formatts -9.27 correctly to DMS -9&deg; 16' 12''", function() {
		expect(nf.toDMS(-9.27)).toEqual("-9&deg; 16' 12''");
	});
	it("formatts -9.1461 correctly to DMS -9&deg; 08' 46''", function() {
		expect(nf.toDMS(-9.1461)).toEqual("-9&deg; 08' 46''");
	});
	it("rounds -9.27334 correctly on 2 decimals with , seperator to -9,27", function() {
		expect(nf.round(-9.27334, 2, ",")).toEqual("-9,27");
	});
	it("rounds 9.27334 correctly on 4 decimals with , seperator to 9,2733", function() {
		expect(nf.round(9.27334, 4, ",")).toEqual("9,2733");
	});
	it("rounds 9.27394 correctly on 3 decimals with . seperator to 9.274", function() {
		expect(nf.round(9.27394, 3, ".")).toEqual("9.274");
	});
	it("rounds -9.27394 correctly on 3 decimals with . seperator to -9.274", function() {
		expect(nf.round(-9.27394, 3, ".")).toEqual("-9.274");
	});
});