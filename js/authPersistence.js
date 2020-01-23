
window.authPersistence = {
    /** Set Item from local storage */
    setTokenAuth(token, id, name) {

        window.localStorage.setItem('user', token)
        window.localStorage.setItem('id', id)
        window.localStorage.setItem('name', name)
    },
    /** Get Item from local storage */
    getTokenAuth(){
        return window.localStorage.getItem('user')
    },
    getIdAuth(){
        return window.localStorage.getItem('id')
    },
    getNameAuth(){
        return window.localStorage.getItem('name')
    },
    getUsersActivities(){
        return window.localStorage.getItem('showUsers')
    },
    /** Remove Item from local storage */
    clearTokenAuth(){
        window.localStorage.removeItem('user')
        window.localStorage.removeItem('id')
        window.localStorage.removeItem('name')
        window.localStorage.removeItem('authenticated')
        window.localStorage.removeItem('logout')

    }
}