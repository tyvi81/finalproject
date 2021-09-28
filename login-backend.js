export const handlePage = function () {

    let $root = $('#root');

    $root.on('click', '.login-button', handleLoginButton);

}

export const handleLoginButton = function () {
    
    let $user = $('.username-input');
    let $pass = $('.password-input');
    let $miss = $('.missing');
    let obj;
    $missing.empty();
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
                $missing.append(`<div>User does not exist</div>`);
            } else if (obj.pass != $pass.val()) {
                    $miss.append(`<div>Password is incorrect</div>`);
            } else {
                localStorage.setItem("username", $user.val());
                localStorage.setItem("score", obj.highscore);
                window.location = "./"
            }
        });
    }


}

$(function () {
    handlePage();
});