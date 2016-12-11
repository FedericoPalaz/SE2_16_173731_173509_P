var random= require('../dataManager/random.js');
describe("random", function () {
    var min=1;
    var max=10;
    var result=max-min+1;
    it("should init numbers", function (done) {
        done();
        random.init(min, max);
        console.log(random.getLength());
        expect(random.getLength()).toEqual(result);     
    });
});