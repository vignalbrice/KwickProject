
{
    'use-strict';
    /** Login Function */
    $(function () {
        var email = $("input#emailSignIn");
        var password = $("input#passwordSignIn");
        var checkbox = $("#checkSignIn");

        function sendLoginFormToKwick() {
            $('#form-login').on('submit', function (e) {
                e.preventDefault();
                    var request = $.ajax({
                        url: `http://greenvelvet.alwaysdata.net/kwick/api/login/${email.val()}/${password.val()}`,
                        method: "GET",
                        dataType: 'jsonp',
                        crossDomain: true,
                    });
                    if(email.val() != ''  && password.val() === ''){
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...Une erreur est survenue!',
                            text: 'le mote de passe doit contenir au moins 3 caractères.',
                          })
                    }
                    if(email.val() ===''  && password.val() != ''){
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...Une erreur est survenue!',
                            text: 'Veuillez saisir un email valide.',
                          })
                    }
                    request.done((success) => {
                        console.log(success)
                        if(success.result.status === 'failure'){
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...Une erreur est survenue!',
                                text: 'Utilisateur inconnue',
                              }, () =>  $(document).reload())
                        }
                        if(success.result.status === 'done'){
                            window.authPersistence.setTokenAuth(success.result.token,success.result.id, email.val());
                            window.localStorage.setItem('authenticated', 'true');
                            window.localStorage.removeItem('logout')
                            window.location.href ='/vues/dashboard.html'
                        }
                        e.preventDefault()
                    });
                    request.fail(() => {
                        //alert("Request failed: " + textStatus);
                        e.preventDefault()
                        if (email.val() === '' && password.val() === '') {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...Une erreur est survenue!',
                                text: 'Vous devez remplir tout les champs !',
                              })
                        }
                    });
                })
            }
            sendLoginFormToKwick()
    })
}