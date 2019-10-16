$(document).ready(function () {
  console.log("inside admin.js");
  console.log("inside the click");
  $("#newCategory").hide();
  var fname = sessionStorage.getItem("fname");
  var lname = sessionStorage.getItem("lname");
  var name = (fname + "  " + lname).toUpperCase();
  $("#adminName").append(name);
  var posts;
  var commentContainer = $(".comment-container");
  $(document).on("click", "#addbooks", function (event) {
    console.log("inside the click");
    event.preventDefault();
    var category = $("#addcat").val();
    var comments = $.trim($("#comments").val());
    console.log(category);
    console.log(comments);
    $("#add").empty();
    if (category === "Languages") {
      var p = $("<p>");
      p.addClass("errortag");
      p.text("*Need to select Category atleast for the search");
      p.css("color", "red");
      $("#add").append(p);
    } else {
      $.ajax("/api/apikey", {
        type: "GET"
      }).then(function (data) {
        console.log("Apikey inside the route" + data);
        searchCategory(category, data);

      });
    }
  });

  function searchCategory(category, apikey) {
    var queryURL =
      "https://www.googleapis.com/books/v1/volumes?q=" +
      category +
      "&api_key=" +
      apikey;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      var newArr = [];
      for (var i = 0; i < response.items.length; i++) {
        var title = response.items[i].volumeInfo.title;
        var authors = response.items[i].volumeInfo.authors["0"];
        console.log(authors);
        var description = response.items[i].volumeInfo.description;
        console.log(description);
        var averageRating = response.items[i].volumeInfo.averageRating;
        var thumbnail = response.items[i].volumeInfo.imageLinks.smallThumbnail;
        var publishedDate = response.items[i].volumeInfo.publishedDate;
        var publisher = response.items[i].volumeInfo.publisher;
        var previewlink = response.items[i].volumeInfo.previewLink;
        console.log(category);
        console.log(previewlink);
        var bookObj = {
          title: title,
          authors: authors,
          description: description,
          averageRating: averageRating,
          thumbnail: thumbnail,
          publishedDate: publishedDate,
          publisher: publisher,
          previewlink: previewlink,
          category: category,
          usercomment: $.trim($("#comments").val())
        };

        console.log("bookObj", bookObj);
        newArr.push(bookObj);
      }
      console.log("newArr", newArr);
      $.ajax("/api/addbook", {
        type: "POST",
        data: { dataArr: newArr }
      }).then(function (bookadded) {
        console.log(bookadded.message);
        $("#add").empty();
        if (bookadded.message === true) {
          console.log("Added new Record");
          var p1 = $("<p>");
          p1.addClass("message");
          p1.text("New category Added");
          p1.css("color", "red");
          $("#add").append(p1);
        } else {
          $("#add").empty();
          var p2 = $("<p>");
          p2.addClass("error-tag");
          p2.text("*Not able to add data");
          p2.css("color", "red");
          $("#add").append(p2);
        }



      });
      // }
    });
  }
  $("#books-span").click(function () {
    $("#add").empty();
    $("#categorydiv").show();
    $("#commentdiv").hide();
    $("#commentdiv>").empty();
    $("#newCategory").hide();

  });

  $("#books-span1").click(function () {
    console.log("inside the comments click");
    $("#categorydiv").hide();
    $("#newCategory").hide();
    $("#commentdiv>").val("");
    $("#addcat").val("");
    $("#comments").val("");
    // $("#commentdiv").show();
    $.ajax("/api/comments", {
      type: "GET"
    }).then(function (dbcomments) {

      console.log("inside the post");
      posts = dbcomments;
      console.log(posts);
      if (!posts || !posts.length) {
        displayEmpty();
      }
      else {
        initializeRows(posts);
      }
      // need to work on this 

    });
  });
  function displayEmpty() {
    commentContainer.empty();

    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("No Comments yet..!!");
    commentContainer.append(messageH2);
  }
  function initializeRows(posts) {
    // commentContainer.empty();
    $("#commentdiv>").empty();
    $("#commentdiv").show();
    console.log(posts.length);
    var tablediv = $("#commentdiv>");
    var th = $("<thead>")
    th.addClass("text-white thead-dark tablehead");
    var tbody = $(".table");
    var tr = $("<tr>");
    th.append("<tr scope=row><th scope=col>" + "Total Books" + "</th>" + "<th>"
      + "Category" + "</th>" + "<th>" + "Comment" + "</th>" + "<th>" + "Created" + "</th>"
      + "<th>" + "Updated" + "</th>");
    tbody.append(th);
    for (var i = 0; i < posts.length; i++) {
      // tr.data("comments",posts);
      var create = moment(posts[i].createdAt).format("MMM Do, YY");
      var update = moment(posts[i].updatedAt).format("MMM Do, YY");
      var categoryCount;
      console.log(posts[i].count);

      tbody.append("<tr><td>" + posts[i].count + "</td>" + "<td>" + posts[i].category + "</td>" + "<td>" + posts[i].usercomment + "</td>" + "<td>" + create + "</td>" + "<td>" + update + "</td></tr>");
      //  tr.append("</tr>");
      tbody.prepend(tr);
      //  tbody.append("</tr>");
      tablediv.prepend(tr);

    }

    // location.reload();
  }
  // Adding a category
  $("#books-span2").click(function () {
    $("#newCategory").show();
    $("#commentdiv").hide();
    $("#categorydiv").hide();
  });
  $(document).on("click", "#addcat", function () {
    var category = $("#inputCat").val();
    console.log(category);
    $.ajax("/api/addCat/:" + category, {
      type: "POST"

    }).then(function (addcat) {
      console.log(addcat);
    });
  });


});
// Closing of Document ready