// var $ = require('jquery')(window);
$(document).ready(function(){
    $(".n_log_in").dialog({
      closeOnEscape: false,
        maxWidth: 600,
        maxHeight: 500,
        width: 400,
        height: 150,
        modal: true,
        open: function(event, ui) {
            //when the dialog displays, we hide the close (x) button
            //to avoid the user from closing the dialog intempestively
            $(".ui-dialog-titlebar-close", ui).hide();
        },
      buttons: {
          //define the two button login and cancel
          "Login_Register": function() {
              //when login is clicked, we create a user with the data , we emit the object with socket
              //and we close the dialog
             // user = new User($("#userName").val(), $("#Password").val());
             var name =$("#userName").val();
             var pass =$("#Password").val();
             var user = {username:name, password:pass };//username is attribute
             console.log(name + "'" + pass);
             $.post('/register', user, function(result) { 
               console.log(result);
              
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
