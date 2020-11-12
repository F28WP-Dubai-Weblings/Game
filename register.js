// var app = express();
// socket = io.connect('http://localhost:5501');
$(document).ready(function(){
    var socket = io('http://localhost:5501');

    $("#Login_Register").click(function(){
    socket.emit("login_register", { user: $("#userName").val(), pass: $("#Password").val()
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
      