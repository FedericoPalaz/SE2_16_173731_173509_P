describe("random", function () {
    var random= require('../dataManager/random.js');
    var min=1;
    var max=10;

    if('should init numerbers', function () {
        random.init(min, max);
        expect(random.getLength).toEqual((max-min+1));     
    });
});