$(document).ready(function(){
    $(".n_log_in").dialog({
      closeOnEscape: false,
        maxWidth: 600,
        maxHeight: 500,
        width: 400,
        height: 150,
        modal: true,
        open: function(event, ui) {
            //prevent user from closing the dialog
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
                 //$.get('register.js');
             });

          },
          //define the two button login and cancel
          "Login": function() {
             var name =$("#username").val();
             var pass =$("#password").val();
             var user = {username:name, password:pass };//username is attribute
             console.log(name + "'" + pass);
             $.post('/api/login', user, function(result) { 
               console.log(result);
               console.log('Welcome back', name);
              //login correct show the game page here using $.get
             })
           })
             .fail(function() {
                 console.log("error loading user");
             });

          },
          Cancel: function() {
              //cancel closes the dialog  
              $(this).dialog("close");
          }
      },
  });

});
