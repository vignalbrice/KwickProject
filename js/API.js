const API = {}


API.getAllMessages = (timestamp = 0) =>{
    return $.ajax({
        url:`http://greenvelvet.alwaysdata.net/kwick/api/talk/list/${window.localStorage.getItem('user')}/${timestamp}`,
        method: "GET",
        dataType: 'jsonp',
        crossDomain: true,
      })
}

API.postMessage = (message) =>{
    return $.ajax({
        url:`http://greenvelvet.alwaysdata.net/kwick/api/say/${window.localStorage.getItem('user')}/${window.localStorage.getItem('id')}/${encodeURIComponent(message)}`,
        method:'GET',
        dataType:'jsonp',
        crossDomain:true
    });
}

API.logout = () =>{
    return $.ajax({
        url: `http://greenvelvet.alwaysdata.net/kwick/api/logout/${window.localStorage.getItem('user')}/${window.localStorage.getItem('id')}`,
        method: "GET",
        dataType: 'jsonp',
        crossDomain: true,
    });
}

API.getUsers = () =>{
    return $.ajax({
        url: `http://greenvelvet.alwaysdata.net/kwick/api/user/logged/${window.localStorage.getItem('user')}`,
        method: "GET",
        dataType: 'jsonp',
        crossDomain: true,
    });
}