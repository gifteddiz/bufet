class Qty{
  constructor(){
    $('body').on('click', '[data-qty-minus]', function(e){
      e.preventDefault();
      var $val = $(this).siblings('[data-qty-val]');
      var val = parseInt($val.text());
      $val.text(--val);
      if( val > 0 ){
        $(this).removeAttr('data-qty-disabled');
      } else {
        $(this).attr('data-qty-disabled', 'disabled');
      }
    })
    $('body').on('click', '[data-qty-plus]', function(e){
      e.preventDefault();
      var $val = $(this).siblings('[data-qty-val]');
      var val = parseInt($val.text());
      $val.text(++val);
      $(this).siblings('[data-qty-minus]').removeAttr('data-qty-disabled');
    })
  }
}
export default Qty;