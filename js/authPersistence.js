
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
    },
    getIdAuth(){
        window.localStorage.getItem('id')
    },
    getNameAuth(){
        window.localStorage.getItem('name')
    },
    /** Remove Item from local storage */
    clearTokenAuth(){

        window.localStorage.clear()

    }
}