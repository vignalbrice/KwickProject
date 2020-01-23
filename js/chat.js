{
    'use-strict';
    /** Chat Function */
    let allMessages = [];
    let lastRequestTimestamp = 0;
    let cursorBegin, cursorEnd;

    $(function () {
        $('.show-newmsg').hide()
        $('.show-arrow').hide()
        $('.chat').scroll(function() {
            if($('.chat').scrollTop() + $('.chat').height() > $(document).height()) {
                var ajaxCountMsg = API.getAllMessages();
                ajaxCountMsg.done(data => window.localStorage.setItem('message', data.result.talk.length))
            }
         });
       // $(window).scrollTop().$(document).height() - $(window).height();
           
        //},8000)
        $('.chat').on('scroll', onMessageScroll);

        function onMessageScroll() {
            if ($(this).scrollTop()  <= 0) {
              cursorBegin = cursorBegin - 10;
              renderMessages(allMessages.slice(cursorBegin, cursorEnd));
          }
        }
        function scrollListener (){
            var lastScrollTop = 0;
            $('.chat').scroll(function(event){
               var st = $(this).scrollTop();
               if (st > lastScrollTop){
                   // downscroll code
               } else {
                  // upscroll code
                  if($(this).scrollTop() <= 250){
                    $('.show-arrow').show()
                    $('.show-arrow').html(`<i class="fas fa-arrow-circle-down"></i>`)
                    $('a.show-arrow').on('click',function(e) {
                        $('.chat').animate({ scrollTop:$('.chat').prop('scrollHeight')}, 1000);
                        $('.show-arrow').hide()
                    }) 
                  }
               }
               lastScrollTop = st;
            });
        }
        function renderMessages(messages){
            var chat = $('.chat');
            var date;
            const me = window.localStorage.getItem('name');
            const res = messages.map(item => 
                item.user_name === me ?
                 `<div class="chat-log__item chat-log__item--own">
                    <p class="disabled-text">${date = moment(item.timestamp * 1000)}</p>
                    <h3 class="chat-log__author">${item.user_name}</h3>
                    <div class="chat-log__message">${item.content}</div>
                    <small>${moment(date).startOf('hour-32').fromNow()}</small>
                  </div>` : 
                    `<div class="chat-log__item">
                        <p class="disabled-text">${date = moment(item.timestamp * 1000)}</p>
                        <h3 class="chat-log__author">${item.user_name}</h3>
                        <div class="chat-log__message">${item.content}</div>
                        <small>${moment(date).startOf('hour-32').fromNow()}</small>
                    </div>`);
            chat.html(res.join(' '))
        }
        function getNewMessages() {
            var chat = $('.chat');
            API.getAllMessages(lastRequestTimestamp).done(function(response) {
                if(response.result.status === 'failure'){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...Une erreur est survenue!',
                      })
                }
                if(response.result.status === 'done'){
                    const me = window.localStorage.getItem('name');
                    var message = allMessages.length;
                    if(window.localStorage.getItem('message') < message){
                        if(allMessages.user_name === me){
                            
                            console.log('Message From Me');

                        }else{
                            var countNewMessages = message - window.localStorage.getItem('message');
                            //console.log(countNewMessages)
                            if($(chat).scrollTop() + $(chat).innerHeight() === $(chat)[0].scrollHeight){
                                console.log('at bottom')
                            }else{
                                $('.show-arrow').hide()
                                $('.show-newmsg').show()
                                $('.show-newmsg').text(`Vous avez ${countNewMessages} nouveaux messages`)
                                $('button.show-newmsg').on('click',function(e) {
                                    $('.chat').animate({ scrollTop:$('.chat').prop('scrollHeight')}, 1000);
                                    $('.show-newmsg').hide()
                                })   
                            }        
                        }
                    }
                        setTimeout(getNewMessages, 5000);
                    
                        if (lastRequestTimestamp === 0) {
                        allMessages = response.result.talk;
                        cursorEnd = allMessages.length;
                        cursorBegin = cursorEnd - 10;
                        lastRequestTimestamp = response.result.last_timestamp;
                        }
                        else {
                        if (response.result.talk.length === 0) return;
                        lastRequestTimestamp = response.result.last_timestamp;
                        allMessages = allMessages.concat(response.result.talk);
                        cursorEnd = allMessages.length;
                        }
                    
                        renderMessages(allMessages.slice(cursorBegin, cursorEnd));
                    }
                });

            API.getAllMessages().fail(function (textStatus) {
                    alert("Request failed: " + textStatus);
            });
        }
        
        function onMessageScroll() {
            if ($(this)[0].scrollTop === 0) {
              cursorBegin = cursorBegin - 10;
            
            renderMessages(allMessages.slice(cursorBegin, cursorEnd));
          }
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
            var request =   $.ajax({
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
                        getNewMessages() 
                        //$('.chat').animate({ scrollTop:$('.chat').prop('scrollHeight')}, 1000);

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
        getNewMessages()
        postMessage()
        scrollListener()
    })

}