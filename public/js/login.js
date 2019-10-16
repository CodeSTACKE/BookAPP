$(document).ready(function () {
  console.log("Inside the js");

  //Eventlistner for register submit
  $(document).on("click", "#register_submit", function (event) {
    console.log("inside the click");
    sessionStorage.clear();
    event.preventDefault();
    var postregister = {
      firstname: $("#cmsInputName").val().trim(),
      lastname: $("#cmsInputLastName").val().trim(),
      email: $("#cmsInputEmail1").val().trim(),
      password: $("#cmsInputPassword1").val().trim(),
      // cnfpassword: $("#cmsConfirmPassword").val().trim(),
      role:$("#role").val().trim()
    };
    console.log("user info:", postregister);
    if(postregister.firstname==="" && postregister.lastname==="" && postregister.email==="" &&
     postregister.password==="" && postregister.role==="Role")
    {
      $("#error").empty();
      var p=$("<p>");
      p.addClass("errormsg");
      p.css("color","red");
      p.text("*please Enter the details");
      $("#error").append(p);

    }
    else if(postregister.firstname==="" || postregister.lastname==="" || postregister.email==="" ||
    postregister.password==="" || postregister.role==="Role"){
      $("#error").empty();
      var p1=$("<p>");
      p1.addClass("errormsg");
      p1.css("color","red");
      p1.text("*please Enter the Missing details");
      $("#error").append(p1);
    }
    else{
      $.ajax("/api/register", {
        type: "POST",
        data: postregister
      }).then(function (response) {
        console.log("Added new Record");
        var p2=$("<p>");
        p2.addClass("errormsg");
        p2.css("color","blue");
        p2.text("Record added");
        $("#error").append(p2);
        // OPTIONAL save info to local storage
        // Reload the page to get the updated list
        console.log(response);
        sessionStorage.setItem("fname", response.firstname);
        sessionStorage.setItem("lname", response.lastname);

        if(response.role==="admin"){
          window.location.href = "/admin";
        }
        else{
          window.location.href = "/welcome";
        }
        // location.reload();
      });
    }
  
  });  

  
  // Event listner for login check 
  $(document).on("click", "#login", function (event) {
    console.log("inside the click");
    event.preventDefault();
    // var role=$("#role").val().trim();
    // console.log(role);
    var login = {
      email: $("#inputEmail").val().trim(),
      password: $("#inputPassword").val().trim(),
      // role:$("#role").val().trim()
    };
    if(login.email==="" && login.password==="") 
    {
      $("#error").empty();
      var p=$("<p>");
      p.addClass("errormsg");
      p.css("color","red");
      p.text("*please Enter the details");
      $("#error").append(p);
    }
    else if(login.email===""|| login.password===""){
      $("#error").empty();
      var p1=$("<p>");
      p1.addClass("errormsg");
      p1.css("color","red");
      p1.text("*please Enter missing the details");
      $("#error").append(p1);
    }
    else{
      $.ajax("/api/login", {
        type: "POST",
        data: login
      }).then(function (data, successful, xhr) {
        console.log(arguments);
        console.log(xhr.status);
        if (xhr.status !== 200) {
          $("#error").empty();
          var p2 = $("<p>");
          p2.addClass("errortag");
          p2.text("User details does not match");
          p2.css("color", "red");
          $("#error").append(p2);
          console.log("no match");
        } else {
          console.log("test");
          sessionStorage.clear();
          sessionStorage.setItem("fname", data.firstname);
          sessionStorage.setItem("lname", data.lastname);

          if(data.role==="admin"){
            $("#categorydiv").hide();
            $("#commentdiv").hide();
            window.location.href = "/admin";
          }
          else{
            window.location.href = "/welcome";
          }
        
       
        }
      }).fail(function(xhr){
        console.log(xhr.status);
        if(xhr.status === 401){
          console.log(xhr.status);
          console.log("the error should work");
          $("#error").empty();
          var p3 = $("<p>");
          p3.addClass("errortag");
          p3.text("User details does not match");
          p3.css("color", "red");
          $("#error").append(p3);
        }
      });
    }
  });






  //End of document.ready function()     
});