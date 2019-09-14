$(document).on('turbolinks:load', function() {
  $(function(){
    function buildPost(message){
      if (message.image) {
        var html = `<div class="wrapper__chat-contents__messages__message">
                      <div class="wrapper__chat-contents__messages__message__upper-info">
                        <div class="wrapper__chat-contents__messages__message__upper-info__talker">
                          ${message.user_name}
                        </div>
                        <div class="wrapper__chat-contents__messages__message__upper-info__data">
                          ${message.data}
                        </div>
                      </div>
                      <div class="wrapper__chat-contents__messages__message__text">
                        <div class="wrapper__chat-contents__messages__message__text__content">
                          ${message.content}
                        </div>
                        <div class="wrapper__chat-contents__messages__message__text__image">
                          <img src=${message.image} >
                        </div>
                      </div>
                    </div>`

                  return html;
    } else {
      var html = `<div class="wrapper__chat-contents__messages__message">
                    <div class="wrapper__chat-contents__messages__message__upper-info">
                      <div class="wrapper__chat-contents__messages__message__upper-info__talker">
                        ${message.user_name}
                      </div>
                      <div class="wrapper__chat-contents__messages__message__upper-info__data">
                        ${message.data}
                      </div>
                    </div>
                    <div class="wrapper__chat-contents__messages__message__text">
                      <div class="wrapper__chat-contents__messages__message__text__content">
                        ${message.content}
                      </div>
                    </div>
                  </div>`
      return html;
    };
  };
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
        $('form')[0].reset();
      })
      .fail(function() {
        alert('エラー');
      })
      .always(function() {
        $(".wrapper__chat-contents__form__send-btn").removeAttr("disabled")
      })
    })
  });
});