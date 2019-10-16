$(".hide-row").hide();
var display = [];
$(document).ready(function () {
  console.log("inside book.js");
  // make a GET request
  $("#books-area").empty();
  var fname = sessionStorage.getItem("fname");
  var lname = sessionStorage.getItem("lname");
  var name = (fname + " " + lname).toUpperCase();
  $("#name").append(name);


  // Event listner for book search
  $(document).on("click", "#book-search-btn", function (event) {
    $("#error").empty();
    $("#errorsearchby").empty();
    $("#books-area").empty();
    console.log("inside the click");
    event.preventDefault();
    var category = $("#searchcat").val();
    console.log(category);
    if (category === "Languages") {
      $("#errorsearchby").empty();
      $("#error").empty();
      var p = $("<p>");
      p.addClass("errortag");
      p.text("* Please select Category");
      p.css("color", "red");
      $("#error").append(p);
    } else {
      $.ajax("/api/searchbycategory", {
        type: "POST",
        data: {
          category: category
        }
      }).then(function (category) {
        if (category.length === 0) {
          var p5 = $("<p>");
          p5.addClass("errortag");
          p5.text("Book Coming soon..!!");
          p5.css("color", "red");
          $("#error").append(p5);
        } else {
          console.log(category);
          $("#modal_category").modal('hide');
          $("#searchcat1").val("");
          $("#searchby1").val("");
          $("#book-search1").val("");
          $("#searchcat").val("");
          $("#searchby").val("");
          $("#book-search").val("")
          displayBooks(category);

        }
      });
    }
  });

  // Copy of search by author
  $(document).on("click", "#book-search-btn1", function (event) {
    $("#error1").empty();
    $("#errorsearchby1").empty();
    $("#books-area").empty();
    $("#results-modal").modal('hide');
    $("#modal_authorcategory").modal('hide');
    console.log("inside the click");
    event.preventDefault();
    var category = $("#searchcat1").val();
    console.log(category);
    var searchby = $("#searchby1").val();
    var subsearchby = $("#book-search1")
      .val()
      .trim();
    console.log(subsearchby);
    console.log(
      "category:",
      category,
      "searchby:",
      searchby,
      "subsearchby:",
      subsearchby
    );
    if (category === "Languages" && searchby === "Select") {
      $("#errorsearchby1").empty();
      $("#error1").empty();
      var p = $("<p>");
      p.addClass("errortag");
      p.text("*Need to select Category atleast for the search");
      p.css("color", "red");
      $("#error1").append(p);
    } else if (category !== "Language" && searchby === "Select") {
      console.log("in case 2");
      $.ajax("/api/searchbycategory", {
        type: "POST",
        data: {
          category: category
        }
      }).then(function (category) {
        if (category.length === 0) {
          var p5 = $("<p>");
          p5.addClass("errortag1");
          p5.text("Book Coming soon..!!");
          p5.css("color", "red");
          $("#error1").append(p5);
        } else {
          console.log(category);
          $("#modal_category").modal('hide');
          $("#searchcat1").val("");
          $("#searchby1").val("");
          $("#book-search1").val("")
          displayBooks(category);
        }
      });
    } else if (category === "Language" && searchby !== "Select") {
      console.log("in case 2");
      $("#error1").empty();
      var p3 = $("<p>");
      p3.addClass("errortag");
      p3.text("*Need to select Category atleast for the search");
      p3.css("color", "red");
      $("#error1").append(p3);
    } else if (
      category !== "Languages" &&
      searchby !== "Select" &&
      subsearchby !== ""
    ) {
      var data = {
        category: category,
        searcby: searchby,
        subsearchby: subsearchby
      };
      console.log();
      console.log("search inside 3");
      $.ajax("/api/searchbythree", {
        type: "POST",
        data: data
      }).then(function (category) {
        console.log(category);
        if (category.length === 0) {
          var p5 = $("<p>");
          p5.addClass("errortag1");
          p5.text("Books Coming soon..!!");
          p5.css("color", "red");
          $("#error").append(p5);
        } else {
          $("#modal_category").modal('hide');
          $("#searchcat1").val("");
          $("#searchby1").val("");
          $("#book-search1").val("")
          displayBooks(category);
        }
      });
    } else if (
      category !== "Languages" &&
      searchby !== "Select" &&
      subsearchby === ""
    ) {
      console.log("inside case 3");
      $("#error1").empty();
      $("#errorsearchby1").empty();
      var p1 = $("<p>");
      p1.addClass("errorsearch");
      p1.text("*Need to specify the " + searchby + " field");
      p1.css("color", "red");
      $("#errorsearchby1").append(p1);
    } else if (
      category === "Languages" &&
      searchby !== "Select" &&
      subsearchby !== ""
    ) {
      console.log("inside case 4");
      $("#error1").empty();
      $("#errorsearchby1").empty();
      var p2 = $("<p>");
      p2.addClass("errorsearch");
      p2.text("*please enter the category for the search");
      p2.css("color", "red");
      $("#error1").append(p2);
    }
  });
  // copy one display books 

  // function displayBooks(category) {
  //   $("#books-area").empty();
  //   $(".hide-row").show();
  //   var divRow = $(".hide-row");
  //   // divRow.addClass("row");
  //   for (var i = 0; i < category.length; i++) {
  //     var divColumn = $("<div>");
  //     divColumn.addClass("col-xs-12 col-sm-6 col-md-6");
  //     divColumn.css("padding", "30px,30px,30px,30px");
  //     var card = $("<div>");
  //     card.addClass("card");
  //     var showImg = $("<Img>");
  //     var src = category[i].thumbnail;
  //     var p = $("<p>");
  //     var Title = category[i].title.toUpperCase();
  //     var author = category[i].authors;
  //     var publishedDate = category[i].publishedDate;
  //     publishedDate = moment(publishedDate, "YYYY-MM-DD").format(
  //       "MMMM Do YYYY"
  //     );
  //     var rating = category[i].averageRating;
  //     p.append(Title + author + publishedDate + rating);
  //     showImg.attr("src", src);
  //     card.append(showImg);
  //     card.append(p);
  //     divColumn.append(card);
  //     divRow.append(divColumn);
  //     $("#books-area").append(divRow);
  //     display.push(divRow);

  //   }
  // }






  function displayBooks(category) {
    $("#books-area").empty();
    $(".hide-row").show();
    $(".hide-row").show();
    for (var i = 0; i < category.length; i++) {
      console.log(category[i]);

      //display books and images
      var bookDiv = $("<div>");
      bookDiv.addClass("book-div");
      var bookRow = $("<div>");
      bookRow.addClass("info-row");
      var bookTitle = category[i].title;
      var author = category[i].authors;
      var publishedDate = category[i].publishedDate;
      publishedDate = moment(publishedDate, "YYYY-MM-DD").format(
        "MMMM Do YYYY"
      );
      var bookImage = category[i].thumbnail;
      var rating = category[i].averageRating;
      console.log(bookTitle, author, publishedDate);
      console.log(bookImage);
      var preview = category[i].previewlink;
      var linkName = $("<a>");
      linkName.addClass("link-name");
      linkName.attr("href", preview);
      var id = category[i].id;
      console.log(id);

      linkName.text(bookTitle);
      var p = $("<p>");
      var titleDiv = $("<div>");
      var infoDiv = $("<div>");
      titleDiv.addClass("book-title");
      linkName.html(bookTitle + "<br>");
      linkName.addClass("book-title");
      infoDiv.addClass("info-text");
      var button = $("<button>");

      button.attr({
        "class": 'view-class btn-success btn-lg',
        "data-id": id
      });


      button.text("view");
      infoDiv.html(
        "Author: " +
        author +
        "<br>" +
        "Date Published: " +
        publishedDate +
        "<br>" +
        "Rating: " +
        rating +
        "<br>"
      );
      var imageDiv = $("<img>");
      // imageDiv.addClass("card-img-top");
      imageDiv.css("height", "225px");
      imageDiv.attr("src", bookImage);
      // imageDiv.addClass("images col-6");

      bookRow.append(imageDiv);

      // p.append(linkName);
      p.append(infoDiv);
      p.addClass("text col-6");
      bookRow.append(p);

      bookRow.append(button);
      bookDiv.append(bookRow);
      $("#books-area").append(bookDiv);
    }
  }
  $(document).on("click", ".view-class", function (event) {
    var value = parseInt($(this).attr('data-id'));
    console.log(value);
    $("#match-link").empty("");

    var id = {
      id: value
    };
    $.ajax("/api/modaldisplay", {
      type: "POST",
      data: id
    }).then(function (data) {
      console.log(data);
      $(".modal-title").text(data.title);
      $("#match-name").text("Title: " + data.title);
      $("#match-author").text("Author : " + data.authors);
      $("#match-img").attr("src", data.thumbnail);
      var link = $("<a>");
      link.attr("href", data.previewlink);
      link.text(data.title);
      $("#match-link").append(link);
      $("#results-modal").modal("toggle");

    });
  });
  //Link 

  // $(document).on("click", ".link-class", function (event) {
  //   var value = parseInt($(this).attr('data-id'));
  //   console.log(value);
  //   var id = {
  //     id: value
  //   };
  //   $.ajax("/api/link", {
  //     type: "POST",
  //     data: id
  //   }).then(function (data) {
  //     console.log(data);

  //   });
  // });




  //Search by category
  $("#searchbyCategory").click(function () {
    $("#error").empty();
    $("#errorsearchby").empty();
    $("#error1").empty();
    $("#errorsearchby1").empty();
    $("#books-area").empty();
    $("#searchcat1").val("");
    $("#searchby1").val("");
    $("#book-search1").val("");
    $("#searchcat").val("");
    $("#searchby").val("");
    $("#book-search").val("")
    $("#modal_category").modal("toggle");
  });
  // search by author
  $("#searchbyauthor").click(function () {
    $("#error").empty();
    $("#errorsearchby").empty();
    $("#error1").empty();
    $("#errorsearchby1").empty();
    $("#books-area").empty();
    $("#searchcat1").val("");
    $("#searchby1").val("");
    $("#book-search1").val("");
    $("#searchcat").val("");
    $("#searchby").val("");
    $("#book-search").val("")
    $("#modal_authorcategory").modal("toggle");
  });

});