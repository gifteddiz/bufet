class DocumentsBlock {
  constructor(){
    $('.documents__tabs-item').click(function(e){
      e.preventDefault();
      var target = $(this).attr('href');
      $(this).addClass('--active').siblings().removeClass('--active');
      $(target).show().siblings().hide();
    })
  }
}
export default DocumentsBlock;