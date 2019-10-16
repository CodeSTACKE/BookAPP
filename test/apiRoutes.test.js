// var chai = require("chai");
// var chaiHttp = require("chai-http");
// var server = require("../server");
// var db = require("../models");
// var expect = chai.expect;

// chai.use(chaiHttp);

// var request;

// describe("GET /api/examples", function(){
//   beforeEach(function(){
//     request = chai.request(server);
//     return db.sequelize.sync({ force: true });
//   });

//   it("should find all examples", function(done){
//     db.Example.bulkCreate([
//       {text: "something", description: "something else"},
//       {text: "something2", description: "something else2"},
//       {text: "something3", description: "something else3"}
//     ]).then(function(){
//       request.get("/api/examples").end(function(err, res){
//         var status = res.status;
//         var body = res.body;

//         expect(err).to.equal(null);
//         expect(status).to.equal(200);

//         expect(body)
//           .to.be.an("array")
//           .that.has.lengthOf(3);

//         expect(body[0])
//           .to.be.an("object")
//           .that.includes({text: "something", description: "something else"});

//         expect(body[1])
//           .to.be.an("object")
//           .that.includes({text: "something2", description: "something else2"});

//         expect(body[2])
//           .to.be.an("object")
//           .that.includes({text: "something3", description: "something else3"});

//         done();
//       });
//     });
//   });
// });

// describe("POST /api/examples", function(){
//   beforeEach(function(){
//     request = chai.request(server);
//     return db.sequelize.sync({ force: true });
//   });

//   it("should save an example", function(done){
//     var requestBody = {
//       text: "something",
//       description: "something else"
//     };

//     request
//       .post("/api/examples")
//       .send(requestBody).
//       end(function(err, res){
//         var status = res.status;
//         var responseBody = res.body;

//         expect(err).to.equal(null);
//         expect(status).to.equal(200);

//         expect(responseBody)
//           .to.be.an("object")
//           .that.includes(requestBody);

      
//         done();
//       });
//   });
// });

