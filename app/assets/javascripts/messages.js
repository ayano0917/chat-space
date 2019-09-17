$(document).on('turbolinks:load', function() { 
  $(function(){
    function buildPost(message){
      image = (message.image.url == null) ? '' : `<img class="lower-message__image" src='${message.image.url}'></img>`;
      var html = `<div class="wrapper__chat-contents__messages__message" data-message-id ="${message.id}" >
                    <div class="wrapper__chat-contents__messages__message__upper-info">
                    <div class="wrapper__chat-contents__messages__message__upper-info__talker">
                      ${message.user_name}
                    </div>
                    <div class="wrapper__chat-contents__messages__message__upper-info__data">
                      ${message.created_at}
                    </div>
                    </div>  
                    <div class="wrapper__chat-contents__messages__message__text">
                      <div class="wrapper__chat-contents__messages__message__text__content">
                        ${message.content}
                      </div>
                      <div class="wrapper__chat-contents__messages__message__text__image">
                        ${image}
                      </div>
                    </div>
                  </div>`
      return html
    }

    $('#new_message').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action');
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(message) {
        var html = buildPost(message)
        $('.wrapper__chat-contents__messages').append(html)
        $('.wrapper__chat-contents__messages').animate({scrollTop: $('.wrapper__chat-contents__messages')[0].scrollHeight});
        $('form')[0].reset();
      })
      .fail(function() {
        alert('エラー')
      })
      return false;
    })

    var reloadMessages = function() {
        if (window.location.href.match(/messages/)){
        last_message_id = $('.wrapper__chat-contents__messages__message:last').data('message-id') || 0;
        $.ajax({
          url: "api/messages",
          type: 'GET',
          dataType: 'json',
          data: {id: last_message_id}
        })
        .done(function(messages) {
          var insertHTML = '';
          messages.forEach(function(message) {
              // console.log(messages);
              insertHTML += buildPost(message);
            $('.wrapper__chat-contents__messages').animate({scrollTop: $('.wrapper__chat-contents__messages')[0].scrollHeight}, 'slow');
          });
        $('.wrapper__chat-contents__messages').append(insertHTML);
          })          
        .fail(function() {
          alert('更新に失敗しました');
        });
      }
      }
      var timer = setInterval(reloadMessages, 5000);
      $(this).on('turbolinks:click', function() {
      clearInterval(timer)
    });
  });
});