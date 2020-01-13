
{
    'use-strict';
    /** Login Function */
    $(function () {
        var email = $("input#emailSignIn");
        var password = $("input#passwordSignIn");
        var checkbox = $("#checkSignIn");
        function validateEmail() {
            $('#form-login').on('submit', function (e) {
                e.preventDefault();
                if (email.val() === '') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...Une erreur est survenue!',
                        text: 'l\'email doit contenir au moins un @ et un point',
                      })
                }
            })
        }
        function validatePassword() {
            $('#form-login').on('submit', function (e) {
                e.preventDefault();
                if (password.val() === '') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...Une erreur est survenue!',
                        text: 'le mote de passe doit contenir au moins 3 caractères.',
                      })
                }
            })
        }
        function validateSubmit() {
            $("#form-login").on('submit', function (e) {
                if (validateEmail() && validatePassword()) {
                    sendLoginFormToKwick();
                    return true;
                } else {
                    return false;
                }
            })
        }
        function sendLoginFormToKwick() {
            $('#form-login').on('submit', function (e) {
                e.preventDefault();
                    var request = $.ajax({
                        url: `http://greenvelvet.alwaysdata.net/kwick/api/login/${email.val()}/${password.val()}`,
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
                                text: 'Utilisateur inconnue',
                              }, () =>  $(document).reload())
                        }
                        if(success.result.status === 'done'){
                            Swal.fire({
                                icon: 'success',
                                title: 'Vous avez bien été connecter !',
                                text: success.result.message,
                              }).then(() => window.location.href= '../vues/dashboard.html')
                              if(checkbox.is(":checked")){
                                    window.authPersistence.setTokenAuth(success.result.token,success.result.id, email.val());
                              }
                        }
                        e.preventDefault()
                    });
                    request.fail(function (textStatus) {
                        alert("Request failed: " + textStatus);
                        e.preventDefault()
                    });
                })
            }
            sendLoginFormToKwick()
    })
}