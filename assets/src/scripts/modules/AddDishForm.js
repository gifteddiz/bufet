import axios from 'axios';

class AddDishForm{
  constructor(){
    $('.jsAddDishForm').on('submit',function(e){e.preventDefault()});
    $('.jsAddDishName').on('keyup', this.nameEnterEvent.bind(this));
    $('.jsAddDishQty').on('keyup', this.qtyEnterEvent.bind(this));
    $('body').on('click', '.add-order__filter-name-item', this.dishClickEvent.bind(this));
    $('.jsAddDishSubmit').on('click', this.submitClickEvent.bind(this));
  }
  nameEnterEvent(){
    var name = $('.jsAddDishName').val();
    $('.jsAddDishName').parent().removeClass('--filled');
    this.checkIfFilled();
    axios.get($('.jsAddDishForm').attr('data-name') + "?q=" + name).then(function(response){
      var dishes = response.data.dishes;
      var dishesHtml = '';
      $('.jsAddDishDropdown').html('');
      if( dishes.length ){
        dishes.forEach(element => {
          dishesHtml += `<a href="#" class="add-order__filter-name-item" data-id="${element.id}">${element.name}</a>`;
        });
        $('.jsAddDishDropdown').append(dishesHtml).show();
      } else {
        $('.jsAddDishDropdown').append('<div class="add-order__filter-name-empty">Не найдено</div>').show();
      }
    })
  }
  dishClickEvent(e){
    e.preventDefault();
    var id = $(e.currentTarget).attr('data-id');
    var name = $(e.currentTarget).text();
    $('.jsAddDishID').val(id);
    $('.jsAddDishName').val(name);
    $('.jsAddDishDropdown').hide();
    $('.jsAddDishName').parent().addClass('--filled');
    this.checkIfFilled();
  }
  qtyEnterEvent(){
    var qty = $('.jsAddDishQty').val();
    if( parseInt(qty,10) > 0 ){
      $('.add-order__filter-fieldset.--qty ').addClass('--filled');
    } else {
      $('.add-order__filter-fieldset.--qty ').removeClass('--filled');
    }
    this.checkIfFilled();
  }
  checkIfFilled(){
    if( $('.add-order__filter-fieldset.--name').hasClass('--filled') && $('.add-order__filter-fieldset.--qty').hasClass('--filled') ){
      $('.jsAddDishSubmit').removeAttr('disabled');
    } else {
      $('.jsAddDishSubmit').attr('disabled','disabled');
    }
  }
  submitClickEvent(e){
    e.preventDefault();
    var request = {
      id: $('.jsAddDishID').val(),
      qty: $('.jsAddDishQty').val(),
    };
    axios.get($('.jsAddDishForm').attr('data-add') + `?id=${request.id}&qty=${request.qty}`).then(function(response){
      $('.dishes__table-name.--active').removeClass('--active');
      $('.dishes__table-full').hide();
      $('.add-order__filter-fieldset.--filled').removeClass('--filled');
      $('.jsAddDishName').val('');
      $('.jsAddDishQty').val('');

      var dishFull = response.data.dishFull;
      var itemHtml = `<div class="dishes__table-row">
        <div class="dishes__table-cell">
          <a href="#" class="dishes__table-name --active">${dishFull.name}</a>
        </div>
        <div class="dishes__table-cell">
          <div class="dishes__table-qty">
            <a href="#" class="dishes__table-qty-btn" data-qty-minus="">
              <img src="assets/dist/images/minus.svg">
            </a>
            <div class="dishes__table-qty-val" data-qty-val="">${dishFull.qty}</div>
            <a href="#" class="dishes__table-qty-btn" data-qty-plus="">
              <img src="assets/dist/images/plus.svg">
            </a>
          </div>
        </div>
        <div class="dishes__table-cell">
          <a href="#" class="dishes__table-remove">
            <img src="assets/dist/images/cross.svg">
          </a>
        </div>
      </div>
      <div class="dishes__table-full">
        <div class="dishes__table-full-text">
          ${dishFull.text}
        </div>
        <div class="dishes__table-full-allergen">Аллергены: ${dishFull.allergen}</div>
      </div>`;
      $('.dishes__table-row:first-of-type').after(itemHtml)
    })

  }
}
export default AddDishForm;