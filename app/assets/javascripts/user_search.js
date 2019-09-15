$(document).on('turbolinks:load', function() {
  $(function(){

    var search_list = $("#user-search-result");
    var member_list = $("#member_search_result");

      function appendUsers(user) {
        var html = `<div class="chat-group-user clearfix">
                      <p class="chat-group-user__name">${ user.name }</p>
                      <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${ user.id } data-user-name=${ user.name }>追加</a>
                    </div>`
        search_list.append(html);
        return html;
      }

      function appendErrUsers(info) {
        var html =`<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${ info }</p>
                  </div>`
    
        search_list.append(html);
      }

      $(function() {
        $("#user-search-field").on('keyup', function(){
          var input = $("#user-search-field").val();

        $.ajax({
          url: '/users',
          type: "GET",
          data: { keyword: input },
          dataType: 'json'       
        })
        .done(function(users) {
          $('#user-search-result').empty();
          if (users.length !== 0) {
            users.forEach(function(user){
            appendUsers(user);
            });
          }
          else {
            appendErrUsers("一致するユーザーはいません");
          }
        })
        .fail(function() {
          alert('ユーザー検索に失敗しました');
        })
      });
    });
  });
});
