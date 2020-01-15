{
    'use-strict';
    /** Dashboard Function */
    $(function () {

        /*if(document.location.pathname.indexOf('../vues/dashboard.html')){
            nav = $('li.nav-item');
            chatNav = $('#chatnav')
            chatNav.css('.active')
        }*/
        
        function getUserList () {
            const list = $('.list-user');
            var request = $.ajax({
                url: `http://greenvelvet.alwaysdata.net/kwick/api/user/logged/${window.localStorage.getItem('user')}`,
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
                    const me = window.localStorage.getItem('name');
                    const res = data.result.user.map(item => 
                        item === 'undefined'  ?
                        ``: `<div class="user-connected">
                         <i class="fas fa-circle connected"></i>
                         ${item === 'undefined' ? '' : item}
                       </div>`);
                    list.html(res.join(''))
                }
            });
            request.fail(function (textStatus) {
                alert("Request failed: " + textStatus);
            });
        }
    function getUserConnected (){
        const name = window.localStorage.getItem('name');
        const token = window.localStorage.getItem('user');

        $('p.name').html(`Username : ${name}`);
        $('p.token').html(`Token : ${token}`);
    }
        getUserList()
        getUserConnected()
    })

}