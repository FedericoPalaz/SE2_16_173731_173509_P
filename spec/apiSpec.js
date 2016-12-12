//lib for sending requests
var request = require("request");

//set base URL
var base_url = "http://localhost:5000/";

describe("test /", function() {
    it("return status 200", function(done) {
        request.get(base_url,function(error, response, body) {
            expect(response.statusCode).toBe(200);
            done();
        })
    })
});

describe("test wrong Api, should give 404", function() {
    it("return status 404", function(done) {
        var url=base_url+"ciao"; //wrong api
        request.get(url,function(error, response, body) {
            expect(response.statusCode).toBe(404);
            done();
        })
    })
});

describe("testing setMenu", function() {
    it("not defined any parameters", function(done) {
        var url=base_url+"setDayMenu"; //set menu api
        request.post({url: url, form: {}}, function(err,response,body){
            expect(response.statusCode).toBe(404);
            done();
        });
    });

    it("should give 200, defined only Primo", function(done) {
        var url=base_url+"setDayMenu"; //set menu api
        request.post({url: url, form: {userid: 1, giornoid: 5, primo: 2}}, function(err,response,body){
            expect(response.statusCode).toBe(200);
            done();
        });
    });

    it("should give 200, all param are defined", function(done) {
        var url=base_url+"setDayMenu"; //set menu api
        request.post({url: url, form: {userid: 1, giornoid: 6, primo: 2, secondo: 9, contorno: 11, dolce: 16}}, function(err,response,body){
            expect(response.statusCode).toBe(200);
            done();
        });
    });

    it("should give 404, userid not defined", function(done) {
        var url=base_url+"setDayMenu"; //set menu api
        request.post({url: url, form: {giornoid: 5, primo: 2}}, function(err,response,body){
            expect(response.statusCode).toBe(404);
            done();
        });
    });
    it("should give 404, gironoid not defined", function(done) {
        var url=base_url+"setDayMenu"; //set menu api
        request.post({url: url, form: {userid: 1, primo: 2}}, function(err,response,body){
            expect(response.statusCode).toBe(404);
            done();
        });
    });

});