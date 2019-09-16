$(document).on('turbolinks:load', function() { 
  $(function(){
    function buildImage(message){
      if(message.image.url == null){
        return ``
      } else {
        return `<img class="lower-message__image" src='${message.image.url}'></img>`
      }
    }

    function buildPost(message){
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
                        ${buildImage(message)}
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
      // if (window.location.href.match(/\/groups\/\d+\/messages/)){
      if (window.location.href.match('/messages')){

        last_message_id = $('.message:last').data('message-id') || 0;
        // console.log(last_message_id);
        $.ajax({
          url: "api/messages",
          type: 'GET',
          dataType: 'json',
          data: {id: last_message_id}
        })

        .done(function(messages) {
          // console.log

          if(messages.length > 0){
            var insertHTML = '';
            messages.forEach(function(message) {
              // console.log(messages);
              insertHTML += buildPost(message);
            });
            $('.wrapper__chat-contents__messages').append(insertHTML);
            $('.wrapper__chat-contents__messages').animate({scrollTop: $('.wrapper__chat-contents__messages')[0].scrollHeight}, 'slow');
          }          
        })
        .fail(function() {
          alert('更新に失敗しました');
        });
      }; 
      // else {
        setInterval(reloadMessages, 5000);
      // }
      }
      $(this).on('turbolinks:click', function() {
      clearInterval(timer)
    });
  });
});