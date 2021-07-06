class Qty{
  constructor(){
    $('[data-qty-minus]').on('click', function(e){
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
    $('[data-qty-plus]').on('click', function(e){
      e.preventDefault();
      var $val = $(this).siblings('[data-qty-val]');
      var val = parseInt($val.text());
      $val.text(++val);
      $(this).siblings('[data-qty-minus]').removeAttr('data-qty-disabled');
    })
  }
}
export default Qty;