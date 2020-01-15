{
    'use-strict';
    /** Chat Function */
    $(function () {
        $('.show-newmsg').hide()
        setInterval(function(){
            var ajaxCountMsg = $.ajax({
                url:`http://greenvelvet.alwaysdata.net/kwick/api/talk/list/${window.localStorage.getItem('user')}/0`,
                method: "GET",
                dataType: 'jsonp',
                crossDomain: true,
              })
              ajaxCountMsg.done(data => window.localStorage.setItem('message', data.result.talk.length)) 

        },3000)
         function onScrollLoadData(){
             var chat =  $('.chat');
            $(chat).scroll(function() {
                if($(window).scrollTop()) {
                       // ajax call get data from server and append to the div
                       console.log('Scroll Top')
                }
            });
         }
         function getAllMessages(){
            var chat = $('.chat');
            //chat.scrollTop = chat.scrollHeight - chat.clientHeight;            
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
                    console.log(data.result)
                    var date;
                    const me = window.localStorage.getItem('name');
                    var message = data.result.talk.length;
                    var tenlastmsg = data.result.talk.slice(Math.max(data.result.talk.length - 10, 1))
                    /*var tenpreviousmsg = data.result.talk.slice(Math.max(data.result.talk.length - 10 , 0))
                    console.log(tenpreviousmsg)*/
                    if(window.localStorage.getItem('message') < message){
                        var countNewMessages = message - window.localStorage.getItem('message');
                        //console.log(countNewMessages)
                        $('.show-newmsg').show()
                         $('.show-newmsg').text(`Vous avez des nouveau(x) message(s)`)
                          $('button.show-newmsg').on('click',function(e) {
                            $('.chat').animate({ scrollTop:$('.chat').prop('scrollHeight')}, 1000);
                            $('.show-newmsg').hide()
                        })
                    }
                    const res = tenlastmsg.map(item => 
                        item.user_name === me ?
                         `<div class="chat-log__item chat-log__item--own">
                        <p class="disabled-text">${date = moment(item.timestamp * 1000)}</p>
                        <h3 class="chat-log__author">${item.user_name}</h3>
                        <div class="chat-log__message">${item.content}</div>
                        <small>${moment(date).startOf('hour-32').fromNow()}</small>
                      </div>` : `<div class="chat-log__item">
                    <p class="disabled-text">${date = moment(item.timestamp * 1000)}</p>
                    <h3 class="chat-log__author">${item.user_name}</h3>
                    <div class="chat-log__message">${item.content}</div>
                    <small>${moment(date).startOf('hour-32').fromNow()}</small>
                  </div>`);
                    chat.html(res.join(' '))
                }
            });
            request.fail(function (textStatus) {
                alert("Request failed: " + textStatus);
            });
        }
        function addEmoji(){
            var emojis = [0x1F600, 0x1F604, 0x1F34A, 0x1F344, 0x1F37F, 0x1F363, 0x1F370, 0x1F355,
                0x1F354, 0x1F35F, 0x1F6C0, 0x1F48E, 0x1F5FA, 0x23F0, 0x1F579, 0x1F4DA,
                0x1F431, 0x1F42A, 0x1F439, 0x1F424];
                const resEmoji = emojis.map(item =>
                    `<a class="emoji">${String.fromCodePoint(item)}</a>`)
                $('.emoji-list').html(resEmoji.join(' '))
            $('.emoji').on('click', function (e) {
                $('#textChat').val($('#textChat').val() + $(this).html());
            })
        }
          
         function postMessage(){
         $('#form-chat').on('submit', function (e) {
            var $elem = $('#chat');
            var message = $('#textChat').val();
            e.preventDefault();
            console.log(message)
            //$('.chat').animate({ scrollTop:$('.chat').prop('scrollHeight')}, 1000);
            if(message.length > 140){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...Une erreur est survenue!',
                    text: 'Veuillez ne pas dépassé les 140 caractères !'
                })
            }else{
            var request = $.ajax({
                url:`http://greenvelvet.alwaysdata.net/kwick/api/say/${window.localStorage.getItem('user')}/${window.localStorage.getItem('id')}/${encodeURIComponent(message)}`,
                method:'GET',
                dataType:'jsonp',
                crossDomain:true
            });
                request.done(function (success) {
                    if(success.result.status === 'failure'){
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...Une erreur est survenue!',
                        })
                    }
                    if(success.result.status === 'done'){
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
            }
          })
        }
        setInterval(function(){
            getAllMessages()
        }, 5000)
        addEmoji()
        postMessage()
        onScrollLoadData()
    })

}