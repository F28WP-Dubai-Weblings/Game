// var app = express();
function init() {
  socket = io.connect('http://localhost:3000');

  // refresh list participants
  $('#participants').click(function(e) {
      $('#users').empty();
      e.preventDefault();
      $.get("/api/users", function(users) {
              console.log("success loading participants");
              for (let i = 0; i < users.length; i++) {
                  let item = users[i];
                  $('#users').append($('<li>').attr('id', 'U' + item.id).html(item.pseudoname));
              }
          })
          .fail(function() {
              console.log("error loading participants");
          });
  });
$(document).ready(function(){
    // var socket = io('http://localhost:5501');

    $("#Login_Register").click(function(){
    socket.emit("login_register", { 
      user: $("#userName").val(), 
      pass: $("#Password").val()
      });
    });
  });
    
    socket.on("logged_in", function(name){
        $("#n_log_in").hide();
        $("#log_in").html("Welcome back " + name + ", nice to see you again!");
        $("#log_in").show();
      });
      
      socket.on("invalid", function(){
        alert("Username / Password Invalid, Please try again!");
      });
      
      socket.on("error", function(){
        alert("Error: Please try again!");
      });
}  
// show details of a signle participant
$('#users').click(function(event) {
  //Get the id of list items
  let target = $(event.target);
  if (target.is("li")) {
      $("#users").children().css("background-color", "black");
      target.css("background-color", "red");
      let userId = target.attr('id').substring(1);
      event.preventDefault();
      $.get("/api/users/" + userId,
              function(user) {
                  console.log("success loading user details");
                  $('#userName').html("<i>" + user.userName + "</i>");
              })
          .fail(function() {
              console.log("error loading user details");
          });
  }

});