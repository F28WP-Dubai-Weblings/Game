$(document).ready(function(){
    $(".n_log_in").dialog({
      closeOnEscape: false,
        maxWidth: 600,
        maxHeight: 500,
        width: 400,
        height: 150,
        modal: true,
        open: function(event, ui) {
            //aviod user from closing
            $(".ui-dialog-titlebar-close", ui).hide();
        },
      buttons: {
          //define register, login and cancel buttons
          "Register": function() {
             var name =$("#username").val();
             var pass =$("#password").val();
             var user = {username:name, password:pass };//username is attribute
             console.log(name + "'" + pass);
             $.post('/api/register', user, function(result) {
               //allow access to game using dollar get index html 
               console.log(result);
               request.session.username = username;
               location.replace("index.html");
              })
             .fail(function() {
                 console.log("error with registration");
                 location.replace("register.html");
             });

          },
          "Login": function() {
            var name =$("#username").val();
            var pass =$("#password").val();
            var user = {username:name, password:pass };//username is attribute
            console.log(name + "'" + pass);
            $.post('/api/login', user, function(result) { 
              console.log(result);
              console.log('Welcome back', name);
              //login correct show the game page here using $.get
              //request.session.username = name;
              console.log("value from regis:", sessionName);
             // if(request.session.username){
              if(sessionName){
                  response.redirect("index.html");
                  location.replace("register.html");
              }
  
            })
            .fail(function() {
                console.log("error with login");
                location.replace("register.html");
            });

          },
          Cancel: function() {
              //cancel closes the dialog  
              $(this).dialog("close");
          }
      },
  });

});
