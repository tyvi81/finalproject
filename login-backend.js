export const handlePage = function () {

    let $root = $('#root');

    $root.on('click', '.login-button', handleLoginButton);

}

export const handleLoginButton = function () {
    let obj;
    let $miss = $('.missing');
    let $user = $('.username-input');
    let $pass = $('.password-input');
    
    
    $miss.empty();
    if ($user.val() == null || $user.val() == "") {
        $miss.append('<div>Please fill out your username');
    } else if ($pass.val() == null || $pass.val() == "") {
        $miss.append('<div>Please fill out your password</div>');
    } else {
        db.collection("users").where("username", "==", $user.val()).get().then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                obj = (doc.data());
            })
            if (obj == null) {
                $miss.append(`<div>User does not exist</div>`);
            } else if (obj.pass != $pass.val()) {
                    $miss.append(`<div>Password is incorrect</div>`);
            } else {
                localStorage.setItem("username", $user.val());
                $miss.append('<div> SUCCESS you have logged in</div>');
                window.location = "index.html";

            }

        });
    }


}

$(function () {
    handlePage();
});