{
    'use-strict';
    /** Dashboard Function */
    let countUsers;
    let users = [];
    $(function () {

        /*if(document.location.pathname.indexOf('../vues/dashboard.html')){
            nav = $('li.nav-item');
            chatNav = $('#chatnav')
            chatNav.css('.active')
        }*/
        if(window.localStorage.getItem('user') === null){
            window.location.pathname ='/index.html';
        }
        function showConnectedUserPopup(){
            if(window.localStorage.getItem('authenticated') === 'true'){
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    timer: 5000,
                    timerProgressBar: true,
                    onOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                      window.localStorage.setItem('authenticated', 'false')
                    }
                  })
                    Toast.fire({
                        icon: 'success',
                        title: 'Welcome',
                        text:`${window.localStorage.getItem('name')}`
                    })
                    
            }
        }
        function getUserList () {
            const list = $('.list-user');
            API.getUsers().done(data => {
                if(data.result.status === 'failure'){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...Une erreur est survenue!',
                      })
                }
                if(data.result.status === 'done'){
                    countUsers = data.result.user.length;
                    const me = window.localStorage.getItem('name');
                    const res = data.result.user.map(item => 
                        item === 'undefined'  ?
                        ``: `<div class="user-connected">
                         <i class="fas fa-circle connected"></i>
                         ${item === 'undefined' ? '' : item}
                       </div>`);
                    const activities = data.result.user.map(item => item === 'undefined' ? '' : item)
                    $('.dropdown-menu').html(res.join(''))
                    $('.text-user').text(countUsers);
                    if(window.localStorage.getItem('showUsers') < countUsers){

                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: false,
                            onOpen: (toast) => {
                              toast.addEventListener('mouseenter', Swal.stopTimer)
                              toast.addEventListener('mouseleave', Swal.resumeTimer)
                              window.localStorage.setItem('showUsers', countUsers)
                            }
                          })
                          Toast.fire({
                            icon: 'info',
                            title: `Utilisateur déconnecté ${activities}`,
                          })
                    }
                }
            });
            API.getUsers().fail(function (textStatus) {
                alert("Request failed: " + textStatus);
            });
        }
        function getUserConnected (){
            const name = window.localStorage.getItem('name');
            const token = window.localStorage.getItem('user');

            $('p.name').html(`Username : ${name}`);
            $('p.token').html(`Token : ${token}`);
        }
        function showActivityUsers () {
            if(window.localStorage.getItem('showUsers') === countUsers){
                API.getUsers().done(data => window.localStorage.setItem('showUsers', data.result.user.length));
            }
        }
            showActivityUsers()
            showConnectedUserPopup()
            setInterval(() =>{
                getUserList()
            }, 1000)
            getUserConnected()
        })

}