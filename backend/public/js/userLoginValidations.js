window.addEventListener('load', () => {
    const inputUser= document.querySelector("#user");
    const errorUser= document.querySelector("#errorUser");

    const inputPassword= document.querySelector("#password");
    const errorPassword= document.querySelector("#errorPassword");

    const form = document.querySelector('form.registro');

    inputUser.addEventListener("blur",() => {
        if (inputUser.value == "") displayMessage(errorUser,`El usuario o email no puede estar vacío`);
        else if (inputUser.value.length < 2) displayMessage(errorUser,`El usuario o email no puede tener menos de 2 caracteres`);
        else deleteError(errorUser);
    })


    inputPassword.addEventListener("blur",() => {
        if (inputPassword.value == "") displayMessage(errorPassword,'Debes escribir una contraseña');
        // else if (inputPassword.value.length < 8) displayMessage(errorPassword,'Debe contener al menos 8 caracteres');
        // else if (!(inputPassword.value.match(/[a-z]/)) ) displayMessage(errorPassword,'Debe contener una letra minúscula');
        // else if (!(inputPassword.value.match(/[A-Z]/)) ) displayMessage(errorPassword,'Debe contener una letra mayúscula');
        // else if (!(inputPassword.value.match(/\d/)) ) displayMessage(errorPassword,'Debe contener un número');
        else deleteError(errorPassword);
    })

    form.addEventListener('submit', e => {
        e.preventDefault();

        inputUser.focus();
        inputPassword.focus();
        inputUser.focus();

        const allErrors = document.querySelectorAll('small.danger');
        if (allErrors.length === 0) form.submit();


    })

})

function displayMessage( item, message ) {
    item.style.display = "block";
    item.classList.add("danger");
    item.innerHTML = message;
}

function deleteError(item){
    item.classList.remove('danger');
    item.style.display = "none";
}