let validations = {
    image: (inputItem, messageItem) => {
    let imageAllowed = inputItem.value.match(/(\.jpg|\.jpeg|\.png|\.gif)$/) !== null;
        if ( !imageAllowed && inputItem.value !== '' ) displayMessage(messageItem,'La imagen debe ser en formato .jpeg, .jpg, .gif o .png');
        else deleteError(messageItem);
    },

    text: (inputItem, messageItem, itemName) => {
        if (inputItem.value == "") displayMessage(messageItem,`${itemName} no puede estar vacío`);
        else if (inputItem.value.length < 2) displayMessage(messageItem,`${itemName} no puede tener menos de 2 caracteres`);
        else deleteError(messageItem);
    },

    phone: (inputItem, messageItem) => {
        if (inputItem.value == "") displayMessage(messageItem,'El número no puede estar vacío');
        else if (parseInt(inputItem.value) < 0) displayMessage(messageItem,'El número no puede ser negativo');
        else deleteError(messageItem);
    },

    email: (inputItem, messageItem) => {
        if (inputItem.value == "") displayMessage(messageItem,'El usuario no puede estar vacío');
        else if (!inputItem.value.includes("@") || !inputItem.value.includes(".com")) displayMessage(messageItem,'El formato del correo es incorrecto');
        else deleteError(messageItem);
    },

    birthDate: (inputItem, messageItem) => {
        let birthday = new Date(inputItem.value);
        let age = (Date.now() - birthday) / (365*24*60*60*1000);

        if (inputItem.value == '' ) displayMessage(messageItem,'La fecha no puede estar vacía');
        else if ( age < 18 ) displayMessage(messageItem,'El usuario debe ser mayor de edad');
        else deleteError(messageItem);
    },

    multiple: (inputItem, messageItem) => {
        let isChecked = false;
        inputItem.forEach( select => {
                if ( select.checked ) isChecked = true
            } );
        if (!isChecked) displayMessage(messageItem,'Debes seleccionar un item');
        else deleteError(messageItem);
    },
    
    password: (inputItem, messageItem) => {
        if (inputItem.value == "") displayMessage(messageItem,'Debes escribir una contraseña');
        else if (inputItem.value.length < 8) displayMessage(messageItem,'Debe contener al menos 8 caracteres');
        else if (!(inputItem.value.match(/[a-z]/)) ) displayMessage(messageItem,'Debe contener una letra minúscula');
        else if (!(inputItem.value.match(/[A-Z]/)) ) displayMessage(messageItem,'Debe contener una letra mayúscula');
        else if (!(inputItem.value.match(/\d/)) ) displayMessage(messageItem,'Debe contener un número');
        else deleteError(messageItem);
    },

    password2: (firstPassword, secondPassword, messageItem) => {
        if (secondPassword.value == "") displayMessage(messageItem,'Debes escribir una contraseña');
        else if (firstPassword.value !== secondPassword.value) displayMessage(messageItem,'Las contraseñas deben coincidir');
        else deleteError(messageItem);
    }
}

window.addEventListener('load', () => {
    //Capturamos el formulario
    const form = document.querySelector("form.registro")
    
    //Capturamos los campos del formulario y los "smalls" que mostraran los mensajes de error
    const inputImage = document.getElementById('urlImagen');
    const errorImage = document.querySelector("#errorImage");

    const inputName= document.querySelector("#nombre")
    const errorFirstName= document.querySelector("#errorFirstName")

    const inputLast_name= document.querySelector("#apellido")
    const errorLastName= document.querySelector("#errorLastName")

    const inputUser= document.querySelector("#user")
    const errorUser= document.querySelector("#errorUser")

    const inputPhoneCountry= document.querySelector("#telefono_pais")
    const errorPhoneCountry= document.querySelector("#errorPhoneCountry")

    const inputPhoneNumber= document.querySelector("#telefono")
    const errorPhoneNumber= document.querySelector("#errorPhoneNumber")

    const inputEmail= document.querySelector("#email")
    const errorEmail= document.querySelector("#errorEmail")

    const inputBirthDate= document.querySelector("#nacimiento")
    const errorBirthDate= document.querySelector("#errorBirthDate")

    const inputAddress= document.querySelector("#domicilio")
    const errorAddress= document.querySelector("#errorAddress")

    const inputGender = document.getElementsByName('gender');
    const errorGender= document.querySelector("#errorGender")

    const inputInterests= document.getElementsByName('interests');
    const errorInterests= document.querySelector("#errorInterests")

    const inputPassword= document.querySelector("#contrasenia")
    const errorPassword= document.querySelector("#errorPassword")

    const inputPassword2= document.querySelector("#contrasenia2")
    const errorPassword2= document.querySelector("#errorPassword2")

    const inputConditions= document.querySelector("#condiciones")
    const errorConditions= document.querySelector("#errorConditions")

    const allInputs = document.querySelectorAll('form.registro input');

    //Primer campo donde queremos que se posicione el usuario al cargar la página
    inputName.focus()

    //Acción para validar el campo título al dejar el campo

    inputImage.addEventListener('blur', () => validations.image(inputImage, errorImage));
    inputName.addEventListener("blur",() => validations.text(inputName,errorFirstName,'El nombre'))
    inputLast_name.addEventListener("blur",() => validations.text(inputLast_name,errorLastName,'El apellido'))
    inputUser.addEventListener("blur",() => validations.text(inputUser, errorUser,'El usuario'))
    inputPhoneCountry.addEventListener("blur",() => validations.phone(inputPhoneCountry, errorPhoneCountry))
    inputPhoneNumber.addEventListener("blur", () => validations.phone(inputPhoneNumber, errorPhoneNumber))
    inputEmail.addEventListener("blur",() => validations.email(inputEmail,errorEmail))
    inputBirthDate.addEventListener("blur",() => validations.birthDate(inputBirthDate,errorBirthDate))
    inputAddress.addEventListener("blur",() => validations.text(inputAddress, errorAddress,'La dirección'))
    inputGender.forEach( item => {
        // let isChecked = false;
        item.addEventListener("blur",() => {
            validations.multiple(inputGender, errorGender)
        })
    })
    inputInterests.forEach( item => {
        // let isChecked = false;
        item.addEventListener('blur', () => {
            validations.multiple(inputInterests, errorInterests);
        })
    }),
    inputPassword.addEventListener("keyup",() => validations.password(inputPassword, errorPassword))
    inputPassword.addEventListener("blur",() => validations.password(inputPassword, errorPassword))
    inputPassword2.addEventListener("blur",() => validations.password2(inputPassword,inputPassword2, errorPassword2))


    form.addEventListener("submit",e => {
        //Validamos si esta de acuerdo con las TyC
        if ( !inputConditions.checked ) displayMessage(errorConditions,'Tenes que estar de acuerdo con los Términos y Condiciones')
        else deleteError(errorConditions);
        
        //Reccoremos todos los campos para ver su validacion
        allInputs.forEach( inputElement => inputElement.focus());

        const allErrors = document.querySelectorAll('small.danger');
        if ( allErrors.length > 0 ) e.preventDefault();

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

