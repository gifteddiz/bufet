import axios from "axios";

class OrderScheduleComment{
  constructor(){
    $('.order-schedule__item-comment-input').on('keyup',this.keyupComment);
    $('.order-schedule__item-comment-badge-remove').on('click',this.removeComment);
    $('.order-schedule__item-comment-btn').on('click',this.addComment);
    $('.order-schedule__item-comment-create').on('click',this.newComment);
  }
  keyupComment(){
    var commentText = $(this).val();
    if(commentText.trim()){
      $(this).siblings('.order-schedule__item-comment-btn').removeClass('--disabled');
    } else {
      $(this).siblings('.order-schedule__item-comment-btn').addClass('--disabled');
    }
  }
  removeComment(e){
    e.preventDefault();
    var that = this;
    var url = $(this).attr('data-url');
    axios.delete(url).then(function(){
      $(that).closest('.order-schedule__item-comment').hide().siblings('.order-schedule__item-comment.--new').show().find('.order-schedule__item-comment-input').val('');
    }).catch(function(e){
      alert('Ошибка запроса на удаление');
    });
  }
  addComment(e){
    e.preventDefault();
    var that = this;
    var url = $(this).attr('data-url');
    var text = $(this).siblings('.order-schedule__item-comment-input').val();
    axios.post(url, {"text": text}).then(function(){
      $(that).closest('.order-schedule__item-comment').hide().siblings('.order-schedule__item-comment.--exist').show().find('.order-schedule__item-comment-badge-text').text(text);
    }).catch(function(e){
      alert('Ошибка запроса на сохранение комментария');
    });
  }
  newComment(e){
    e.preventDefault();
    $(this).closest('.order-schedule__item-comment').hide().siblings('.order-schedule__item-comment.--new').show();
  }
}
export default OrderScheduleComment;