

function handleAccessToken() {
    var hash = window.location.hash.substring(1);

    var result = hash.split('&').reduce(function (res, item) {
        var parts = item.split('=');
        res[parts[0]] = parts[1];
        return res;
    }, {});

    localStorage.setItem("access_token", "Bearer " + result["access_token"]);
    window.location.replace('/');
}

function verifyToken() {
    $.ajax({
        type: "GET",
        url: "/api/verifytoken",
        headers: { 'Authorization': localStorage.getItem("access_token") },
        success: function (result) {
            //set your variable to the result 
        },
        error: function (result) {
            if (result.status == 401) {
                window.location.replace('/login');
            }
        }
    })
}


const AuthUtils = {
    handleAccessToken: handleAccessToken,
    verifyToken: verifyToken
}
