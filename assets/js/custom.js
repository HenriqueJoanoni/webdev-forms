function login() {
    const form = document.querySelector("form");
    let fieldEmail = document.querySelector("[name='email']");
    let fieldPassword = document.querySelector("[name='password']");
    let errorMessage = document.querySelector("span");

    form.addEventListener('submit', function (e) {
       e.preventDefault();

        if (fieldEmail.value !== 'admin' || fieldPassword.value !== '1234') {
            errorMessage.innerHTML = "User or Password doesn't exist";
            fieldEmail.style.borderColor = "red";
            fieldPassword.style.borderColor = "red";
        }
    });
}
