/** Redirect user when is already connected */
if(window.localStorage.getItem('user') != null){
   window.location.pathname ='/vues/dashboard.html?from=home';
}
/** If logout item is true, show toast alert with logout message  */
if(window.localStorage.getItem('logout') === 'true'){
   const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
        window.authPersistence.clearTokenAuth()
      }
    })
    Toast.fire({
      icon: 'success',
      title: 'Vous avez bien été déconnecté !',
    })
}