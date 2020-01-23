{
    'use-strict';
    /** onScrollLoadData Function */
    $(function () {
        function onScrollLoadData(){
            var chat =  $('.chat');
            var rows;
            var getMsgs = [];
            API.getAllMessages().done(data =>  getMsgs.push(data.result.talk));
            getMsgs.push(data.result.talk);
            console.log(getMsgs)
            var rowsperpage = 10;
        $(chat).scroll(function() {
            if ($(this).scrollTop()  <= 0 ){
                if(rowsperpage <= rows){
                    API.getAllMessages().done(data => {
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
                    API.getAllMessages().fail(function (textStatus) {
                        alert("Request failed: " + textStatus);
                    });
                }
            }
        });
        }
       // onScrollLoadData()
    })

}