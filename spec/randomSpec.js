var random= require('../dataManager/random.js');
describe("random", function () {
    var min=1;
    var max=10;
    var result=max-min+1;
    it("should init numbers", function (done) {
        done();
        random.init(min, max);
        expect(random.getLength).toEqual(result);     
    });

    it("should not init array numbers, min or max is not number",function() {
        random.init('a',2);
        expect(random.get).toBeUndefined();
    });
});