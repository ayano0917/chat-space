$(function(){
  function buildPost(message){
    var html = `<div class="wrapper__chat-contents__messages__message">
                <div class="wrapper__chat-contents__messages__message__upper-info">
                <p class="wrapper__chat-contents__messages__message__upper-info__talker">
                  ${message.user_name}
                </p>
                <p class="wrapper__chat-contents__messages__message__upper-info__data">
                  ${message.data}
                </p>
                </div>
                <p class="wrapper__chat-contents__messages__message__text">
                </p><p class="wrapper__chat-contents__messages__message__text__content">
                  ${message.content}
                </p>
                
                <p></p>
                  <img src=${message.image} >
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message) {
      var html = buildPost(message);
      $('.wrapper__chat-contents__messages').append(html);
      $('.wrapper__chat-contents__messages').animate({scrollTop: $('.wrapper__chat-contents__messages')[0].scrollHeight});
      $('#message_content').val('')
    })
    .fail(function() {
      alert('エラー');
    })
    .always(function() {
      $(".wrapper__chat-contents__form__send-btn").removeAttr("disabled")
    })
  })
});
