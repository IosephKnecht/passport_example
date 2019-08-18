$(document).ready(function(){
   $('#but_log').click(function(){
      $('.form_registration').toggle();
      $('.form_login').toggle();
   });

   $('#but_reg').click(function(){
      $('.form_login').toggle();
      $('.form_registration').toggle();
   });
});