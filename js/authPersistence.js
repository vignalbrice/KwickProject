
window.authPersistence = {
    /** Set Item from local storage */
    setTokenAuth(token, id, name) {

        window.localStorage.setItem('user', token)
        window.localStorage.setItem('id', id)
        window.localStorage.setItem('name', name)
    },
    /** Get Item from local storage */
    getTokenAuth(){
        
        window.localStorage.getItem('user')
        window.localStorage.getItem('id')
    },
    /** Remove Item from local storage */
    clearTokenAuth(){

        window.localStorage.removeItem('user')
        window.localStorage.removeItem('id');
    }
}