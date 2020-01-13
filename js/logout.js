
{
    'use-strict';
    $(function () {
        /** Logout Function */
        function logoutUser() {
            $('a#logout').on('click', function (e) {
                e.preventDefault();
                var request = $.ajax({
                    url: `http://greenvelvet.alwaysdata.net/kwick/api/logout/${window.localStorage.getItem('user')}/${window.localStorage.getItem('id')}`,
                    method: "GET",
                    dataType: 'jsonp',
                    crossDomain: true,
                });
                request.done(function (success) {
                    console.log(success)
                    if(success.result.status === 'failure'){
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...Une erreur est survenue!',
                            text: success.result.message,
                          }, () =>  $(document).reload())
                    }
                    if(success.result.status === 'done'){
                        Swal.fire({
                            icon: 'success',
                            title: 'Vous allez être déconnecter après avoir cliqué sur ok !',
                            text: success.result.message,
                          }).then(() => window.location.href= '../index.html')
                          window.authPersistence.clearTokenAuth()
                    }
                    e.preventDefault()
                });
                request.fail(function (textStatus) {
                    alert("Request failed: " + textStatus);
                    e.preventDefault()
                });
            })
        }
        logoutUser()
    })

}