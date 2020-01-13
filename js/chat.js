{
    'use-strict';
    /** Chat Function */
    $(async function () {
         function getAllMessages(){
            var chat = $('.chat');
            var request = $.ajax({
                url: `http://greenvelvet.alwaysdata.net/kwick/api/talk/list/${window.localStorage.getItem('user')}/0`,
                method: "GET",
                dataType: 'jsonp',
                crossDomain: true,
            });
            request.done(data => {
                if(data.result.status === 'failure'){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...Une erreur est survenue!',
                      })
                }
                if(data.result.status === 'done'){
                    console.log(data)
                    var date;
                    const me = window.localStorage.getItem('name');
                    const res = data.result.talk.map(item => 
                        item.user_name === me ?
                         `<div class="chat-log__item chat-log__item--own">
                        <p class="disabled-text">${date = new Date(item.timestamp * 1000)}</p>
                        <h3 class="chat-log__author">${item.user_name}</h3>
                        <div class="chat-log__message">${item.content}</div>
                        <small>${date.getHours()}:${date.getMinutes()}</small>
                      </div>` : `<div class="chat-log__item">
                    <p class="disabled-text">${date = new Date(item.timestamp * 1000)}</p>
                    <h3 class="chat-log__author">${item.user_name}</h3>
                    <div class="chat-log__message">${item.content}</div>
                    <small>${date.getHours()}:${date.getMinutes()}</small>
                  </div>`);
                    chat.html(res.join(' '))
                }
            });
            request.fail(function (textStatus) {
                alert("Request failed: " + textStatus);
            });
        }
         function postMessage(){
         $('#form-chat').on('submit', function (e) {
            var message = $('#textChat').val();
            e.preventDefault();
            
            console.log(message)
            var request = $.ajax({
                url:`http://greenvelvet.alwaysdata.net/kwick/api/say/${window.localStorage.getItem('user')}/${window.localStorage.getItem('id')}/${encodeURIComponent(message)}`,
                method:'GET',
                dataType:'jsonp',
                crossDomain:true
            });
            request.done(function (success) {
                console.log(success)
                if(success.result.status === 'failure'){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...Une erreur est survenue!',
                      })
                }
                if(success.result.status === 'done'){
                    console.log(success);
                    $('#textChat').val('')
                    getAllMessages() 
                }
            });
            request.fail(function () {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...Une erreur est survenue!',
                    text: 'Veuillez écrire quelque chose !'
                })
            });
          })
        }
        //setInterval(function(){
            getAllMessages()
        //}, 1000)
        postMessage()
    })

}