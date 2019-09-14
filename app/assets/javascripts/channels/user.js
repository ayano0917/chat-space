$(document).on('turbolinks:load', function() {
  $(function(){
    function buildPost(user){
      var html = `<div class="chat-group-user clearfix js-chat-member" id="697">
                  <input value="697" name="group[user_ids][]" type="hidden" id="group_user_ids">
                      <p class="chat-group-user__name">me</p>
                  </div>`
      return html;

    }
      $("user-search-field").on('submit', function(e){
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
        .done(function(user){
          var html = buildPost(user);
          $('').append(html);
          $('form')[o].reset();
        })
        .fail(function(){
          alert('エラー');
        })
        .always(function() {
          $("").removeAttr("disabled")
        })
      })
  });
});