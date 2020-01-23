
{
    'use-strict';
    $(function () {
        /** Logout Function */
        function logoutUser() {
            $('a#logout').on('click', function (e) {
                e.preventDefault();
                API.logout().done(function (success) {
                    console.log(success)
                    if(success.result.status === 'failure'){
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...Une erreur est survenue!',
                            text: success.result.message,
                          }, () =>{window.location.pathname ='/index.html'})
                    }
                    if(success.result.status === 'done'){
                          window.location.pathname ='/index.html'
                          window.authPersistence.clearTokenAuth()
                          window.localStorage.setItem('logout', 'true')
                    }
                    e.preventDefault()
                });
                API.logout().fail(function (textStatus) {
                    alert("Request failed: " + textStatus);
                    e.preventDefault()
                });
            })
        }
        logoutUser()
    })

}