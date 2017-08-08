$( document ).ready(function() {

  const MyForm = [];


  const validate = function(){
    if(MyForm.fio != undefined){
      let arr = MyForm.fio.split(' ');
      console.log('arr',arr)
      if (arr.length != 3) {
        MyForm.validate.isValid = false;
        MyForm.validate.errorFields.add('fio');
      }
      console.log('MyForm.validate',MyForm.validate)
    }
    if(MyForm.email != undefined){
      let pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
      console.log('pattern.test(MyForm.email)',pattern.test(MyForm.email));
      if (pattern.test(MyForm.email) == false) {
        MyForm.validate.isValid = false;
        MyForm.validate.errorFields.add('email');
      }
    }

  };
  const getData = function() {
    MyForm.phone = $('input[name="phone"]').val();
    MyForm.fio = $('input[name="fio"]').val();
    MyForm.email  = $('input[name="email"]').val();

  };
  const setData = function(){

  };
  const submit = function(){


    $.ajax({
      url: "success.json",
      dataType: "json",
      success: function(data) {
        // let json = jQuery.parseJSON(data);
        console.log('data',data);
        // setting(data);
      }
    });


  };

  $('#submitButton').click(function (){


    getData();
    validate();

    console.log(MyForm);
    submit();
  });


});