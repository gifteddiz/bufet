class Complex{
  constructor(){
    $('.complex__item-qty-input').on('keyup', function(){
      if( parseInt($(this).val()) > 0 ){
        $(this).closest('.complex__item').addClass('--active');
      } else {
        $(this).closest('.complex__item').removeClass('--active');
      }
    });

    $('.complex__confirm').on('click', function(e){
      e.preventDefault();
      $('.add-order-checkpoint').fadeIn();
    });

    $('.add-order-checkpoint__btn.btn-1').on('click', function(e){
      e.preventDefault();
      $('.add-order-checkpoint').fadeOut();
      $('.add-order-added').fadeIn();
    });
  }
}

export default Complex;