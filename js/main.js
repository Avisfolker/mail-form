$(document).ready(function () {

  const MyForm = [];

  $('input').focus(function()  {
    $(this).removeClass('error');
  })


  $('input[name="phone"]').inputmask({"mask": "+7(999)999-99-99"});


  const validate = function () {
    $('input').removeClass('error');
    MyForm.errorFields = [];
    if (MyForm.fio != undefined) {
      MyForm.fio = MyForm.fio.slice(0, -1);
      let arr = MyForm.fio.split(' ');
      if (arr.length != 3) {
        MyForm.errorFields.push('fio');
      }

    }
    if (MyForm.email != undefined) {
      let pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
      let emailArray = ['ya.ru', 'yandex.ru', 'yandex.ua', 'yandex.by', 'yandex.kz', 'yandex.com'];
      if (pattern.test(MyForm.email) == true) {
        let arr = MyForm.email.split('@');
        if (emailArray.includes(arr[1]) == false) {

          MyForm.errorFields.push('email');
          alert('Email: не в доменах ya.ru, yandex.ru, yandex.ua, yandex.by, yandex.kz, yandex.com');
        }
      }
      else {
        MyForm.errorFields.push('email');
      }

    }
    if (MyForm.phone != undefined) {

      var arr = MyForm.phone.split('');

      if (arr.length > 0) {
        let sum = 0;

        function isNumeric(n) {
          return !isNaN(parseFloat(n)) && isFinite(n);
        }
        let count = 0
        arr.forEach(function (item) {
          if (isNumeric(item)) {
            count++;
            sum += parseInt(item);
          }
        })
        console.log(count);
        if (count == 11) {
          if (sum > 30) {

            MyForm.errorFields.push('phone');
            alert('Телефон: сумма всех цифр телефона не должна превышать 30. У Вас: ' + sum);
          }
        }
        else {
          MyForm.errorFields.push('phone');
        }


      }
      else {
        MyForm.errorFields.push('phone');
      }

    }

    if (MyForm.errorFields.length > 0) {
      return false
    }
    else {
      return true
    }


  };
  const getData = function () {
    MyForm.phone = $('input[name="phone"]').val();
    MyForm.fio = $('input[name="fio"]').val();
    MyForm.email = $('input[name="email"]').val();

  };
  const setData = function () {

  };
  const submit = function () {

    $('#resultContainer').removeClass('error').removeClass('progress').removeClass('success');

    let random = Math.random()*10;
    let url;
    if(random < 3){
      url = "progress.json";
    }
    else if (random > 3 && random < 7){
      url = "error.json";
    }
    else {
      url = "success.json";
    }



    console.log(random);
    $.ajax({
      url: url,
      dataType: "json",
      success: function (data) {
        console.log('data', data);

        if (data.status == "success" ){
          $('#resultContainer').addClass(data.status);
          $('#resultContainer').html(data.status);
          $('#submitButton').attr("disabled", false);
        }
        else if(data.status == "error" ){
          $('#resultContainer').addClass(data.status);
          $('#resultContainer').html(data.reason);
          $('#submitButton').attr("disabled", false);
        }
        else if(data.status == "progress" ){
          let count = -1;
          function beginTimer()
          {
            count++;
            if(count <parseInt(data.timeout)/1000)
            {
              $('#resultContainer').html((parseInt(data.timeout)/1000-count)+" seconds left");
              setTimeout(beginTimer,1000);
            }
            else
            {
              endTimer();
            }
          }
          function endTimer()
          {

            submit()
          }
          beginTimer();
          $('#resultContainer').addClass(data.status);
        }
      }
    });


  };

  $('#submitButton').click(function () {




    getData();
    if (validate() == true) {
    // if (validate() == false) {
      $(this).attr("disabled", true);
      console.log(MyForm);
      submit();
    }
    else {
      MyForm.errorFields.forEach(function (item) {
        $('input[name="' + item + '"]').addClass('error');
      })
    }


  });


});