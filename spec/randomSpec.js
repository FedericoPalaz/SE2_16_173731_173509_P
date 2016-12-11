var random= require('../dataManager/random.js');
describe("random", function () {
    var min=1;
    var max=10;
    var result=max-min+1;
    it("should init numerbers", function (done) {
        done();
        random.init(min, max);
        expect(random.getLength).toEqual(result);     
    });
    it("should return udefined if the arry is not createrd", function (done) {
        done();
        expect(random.getLength).toEqual('udefined');     
    });

});