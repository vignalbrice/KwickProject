
{
    'use-strict';
    /** Register Function */
    $(function () {
        var email = $("input#emailSignUp");
        var password = $("input#passwordSignUp");
        var password2 = $("input#passwordSignUp2");

        function sendFormToKwick() {
            $('#form-register').on('submit', function (e) {
                e.preventDefault();
                    var request = $.ajax({
                        url: `http://greenvelvet.alwaysdata.net/kwick/api/signup/${email.val()}/${password.val()}`,
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
                    else if(email.val() ===''  && password.val() != ''){
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...Une erreur est survenue!',
                            text: 'Veuillez saisir un email valide.',
                          })
                    }
                   else if(email.val() ===''  && password.val() === ''){
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...Une erreur est survenue!',
                            text: 'Veuillez remplir tout les champs!',
                          })
                    }
                    else if(password2.val() !== password.val()){
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...Une erreur est survenue!',
                            text: 'Veuillez saisir le même mot de passe!',
                          })
                    }else{
                        request.done(function (success) {
                            if(success.result.status === 'failure'){
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...Une erreur est survenue!',
                                    text: 'Un utilisateur existe déjà sous cet email/mot de passe !',
                                    }, () =>  $(document).reload())
                            }
                            if(success.result.status === 'done'){
                                window.authPersistence.setTokenAuth(success.result.token, success.result.id, email.val());
                                window.localStorage.setItem('authenticated', 'true');
                                window.localStorage.removeItem('logout')
                                window.location.href ='/vues/dashboard.html'
                            }
                        });
                        request.fail(function (textStatus) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...Une erreur est survenue!',
                                text: 'Un utilisateur existe déjà sous cet email/mot de passe !',
                            }, () =>  $(document).reload())
                        });
                    }
                })
            }
        sendFormToKwick()
    })
}