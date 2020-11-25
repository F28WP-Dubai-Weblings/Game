$(document).ready(function(){
    $(".n_log_in").dialog({
      closeOnEscape: false,
        maxWidth: 600,
        maxHeight: 500,
        width: 400,
        height: 150,
        modal: true,
        open: function(event, ui) {
            
            //to avoid the user from closing the dialog
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
              })
             .fail(function() {
                 console.log("error with registration");
                 response.redirect("register.html");
                 //$.get('register.js');
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
              if(request.session.username){
                location.replace("index.html");
              }
             })
            .fail(function() {
                console.log("error with login");
            });

         },
          Cancel: function() {
              //cancel closes the dialog  
              $(this).dialog("close");
              response.redirect("register.html");
          }
      },
  });

});
