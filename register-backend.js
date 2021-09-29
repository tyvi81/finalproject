export const handlePage = function () {

    let $root = $('#root');
    
    $root.on('click', '.register-button', handleRegisterButton);
}

export const handleRegisterButton = function () {
    let $pass = $('.password-input');
    let $miss = $('.missing');
    let $user = $('.username-input');
    
    
    $miss.empty();

    if ($user.val() == null || $user.val() == "") {
        $miss.append('<div>Please fill out your username');

    } else if ($pass.val() == null || $pass.val() == "") {
        $miss.append('<div>Please fill out your password</div>');
    } else {
        db.collection("users").doc($user.val()).get().then((snapshot) => {
            if (snapshot.exists) {

                $miss.append('<div>This username is already taken</div>');
            } else {

                db.collection("users").doc($user.val()).set({
                    user: $user.val(),
                    pass: $pass.val(),
                    

                }).then(() => {

                    localStorage.setItem("username", $user.val());
                    $miss.append('<div> SUCCESS you have created a new login</div>');
                    window.location = "./"
                })
            }
        });
    }
}

$(function () {
    handlePage();
});