//test of the APIs

var random= require('../dataManager/db.js');

//lib for sending requests
var request = require("request");

//set base URL
var base_url = "http://localhost:5000/";

 /* Test for /
  * it checks if the server answers with 200 code header
  */
  /*
describe("Test /", function() {
    it("returns status code 200", function(done) {
        request.get(base_url + "", db.getMenuToShow()); 
        expect(response.statusCode).toBe(200);
        done();
            
    }); 
});

describe("Test /setDayMenu", function() {
    //set the data
    var data = {primo: 2, secondo: 7,contorno:6,dolce:10};
      
    it("to returns status code 200", function(done) {
      client.post(base_url + "/setDayMenu", data, db.setUserMenu);
        expect(response.statusCode).toBe(200);
        done();
    });
    
    //wrong parameter
    data1 = {primo: 'username'};
    it("to returns status code 500", function(done) {
      client.post(base_url + "/setDayMenu", data1, db.setUserMenu);
        expect(res.statusCode).toBe(500);
        done();
    });      
  });*/