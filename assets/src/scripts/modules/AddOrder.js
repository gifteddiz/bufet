class AddOrder{
  constructor(){
    $('body').on('click', '.dishes__table-name' ,function(e){
      e.preventDefault();
      $(this).toggleClass('--active').closest('.dishes__table-row').next('.dishes__table-full').slideToggle();
    });

    $('.dishes__btn.btn-1').on('click', function(e){
      e.preventDefault();
      $('.add-order-added').fadeIn();
    })
  }
}
export default AddOrder;