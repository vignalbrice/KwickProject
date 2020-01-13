
{
    'use-strict';
    /** Register Function */
    $(function () {
        var email = $("input#emailSignUp");
        var password = $("input#passwordSignUp");

        function sendFormToKwick() {
            $('#form-register').on('submit', function (e) {
                event.preventDefault();
                    var request = $.ajax({
                        url: `http://greenvelvet.alwaysdata.net/kwick/api/signup/${email.val()}/${password.val()}`,
                        method: "GET",
                        dataType: 'jsonp',
                        crossDomain: true,
                    });
                    request.done(function (success) {
                        if(success.result.status){
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...Une erreur est survenue!',
                                text: 'Un utilisateur existe déjà sous cet email/mot de passe !',
                              }, () =>  $(document).reload())
                        }
                        e.preventDefault()
                    });
                    request.fail(function (textStatus) {
                        alert("Request failed: " + textStatus);
                        e.preventDefault()
                    });
                })
            }
        sendFormToKwick()
    })
}