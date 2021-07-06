class SignIn {
  constructor(){
    $('.sign-in__block').on('submit', (e)=>{
      if( !this.validate() ){
        e.preventDefault();
      }
    });

    this.validationTried = false;
  }
  validate(){
    if( !this.validationTried ){
      $('#email, #password, #confirm-checkbox').on('change keyup', this.validate);
      this.validationTried = true;
    }

    var result = true;

    var email = $("#email").val();
    var password = $("#password").val();
    var confirmCheckbox = $("#confirm-checkbox").is(":checked");

    var $emailError = $("#sign-in__error-email");
    var $passwordError = $("#sign-in__error-password");
    var $confirmError = $("#sign-in__error-confirm");

    $emailError.hide();
    $passwordError.hide();
    $confirmError.hide();
    $('.sign-in__fieldset-input').removeClass('--error --success');

    if( !email.length ){
      $emailError.text('E-mail не может быть пустым').show().siblings('.sign-in__fieldset-input').addClass('--error');
      result = false;
    } else {
      $emailError.siblings('.sign-in__fieldset-input').addClass('--success');
    }
    if( !password.length ){
      $passwordError.text('Пароль не может быть пустым').show().siblings('.sign-in__fieldset-input').addClass('--error');
      result = false;
    } else {
      $passwordError.siblings('.sign-in__fieldset-input').addClass('--success');
    }
    if( !confirmCheckbox ){
      $confirmError.text('Необходимо согласиться с условиями').show();
      result = false;
    }

    return result;
  }
}

export default SignIn;