import datepickerFactory from 'jquery-datepicker';
import datepickerRUFactory from 'jquery-datepicker/i18n/jquery.ui.datepicker-ru';

class Patients {
  constructor(){
    $('.patients__filter').on('click', ()=>{
      $('.patients-filter').addClass('--visible');
    })
    $('.patients-filter__close').on('click', ()=>{
      $('.patients-filter').removeClass('--visible');
    })

    datepickerFactory($);
    datepickerRUFactory($);
    $.datepicker.regional['ru'] = {
      closeText: 'Закрыть',
      prevText: '&#x3C;Пред',
      nextText: 'След&#x3E;',
      currentText: 'Сегодня',
      monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
      dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
      dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
      dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      weekHeader: 'Нед',
      dateFormat: 'dd.mm.yy',
      firstDay: 1,
      isRTL: false,
      showMonthAfterYear: false,
      yearSuffix: '' };
    $.datepicker.setDefaults($.datepicker.regional['ru']);
  

    $('.patients-filter__datepicker-datepicker').each(function(ind, el){
      $(this).datepicker({
        onSelect: function(date){
          var target = $(this).attr('data-type');
          console.log($(this));
          $('.patients-filter__fieldset-select[data-type='+target+']').val(date);
          $('.patients-filter__datepicker-datepicker.--visible').removeClass('--visible');
        }
      });
    });
    
    $('.patients-filter__fieldset-select.--date').on('click', function(){
      var target = $(this).attr('data-type');
      $('.patients-filter__datepicker-datepicker[data-type='+target+']').addClass('--visible').siblings().removeClass('--visible');
    })
  }
}

export default Patients;