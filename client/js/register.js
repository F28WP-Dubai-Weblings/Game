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
      
  });

});
