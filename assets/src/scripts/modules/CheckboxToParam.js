class CheckboxToParam {
  constructor(){
    const urlParams = new URLSearchParams(window.location.search);
    $('.jsCheckboxToParam').each(function(ind,el){
      var name = $(el).attr('name');
      if( urlParams.get(name) ) $(el).attr('checked', 'checked');
    });

    $('.jsCheckboxToParam').on('change', function(){
      var result = [];
      $('.jsCheckboxToParam').each(function(ind,el){
        if($(el).is(':checked')){
          result.push(`${$(el).attr('name')}=true`)
        }
      });
      window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + result.join('&');
    })
  }
}

export default CheckboxToParam;