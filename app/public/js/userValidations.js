window.addEventListener('load', () => {
    //Capturamos el formulario
    const form = document.querySelector("form .registro")

    //Capturamos los campos del formulario y los "smalls" que mostraran los mensajes de error
    const inputName= document.querySelector("#nombre")
    const errorName= document.querySelector("#errorName")
    const inputLast_name= document.querySelector("#apellido")
    const errorLast_name= document.querySelector("#errorLast_name")
    const inputUser= document.querySelector("#user")
    const errorUser= document.querySelector("#errorUser")
    const inputPhone_country= document.querySelector("#telefono_pais")
    const errorPhone_country= document.querySelector("#errorPhone_country")
    const inputPhone_number= document.querySelector("#telefono")
    const errorPhone_number= document.querySelector("#errorPhone_number")
    const inputEmail= document.querySelector("#email")
    const errorEmail= document.querySelector("#errorEmail")
    const inputBirth_date= document.querySelector("#nacimiento")
    const errorBirth_date= document.querySelector("#errorBirth_date")
    const inputAddress= document.querySelector("#domicilio")
    const errorAddress= document.querySelector("#errorAddress")
    const inputGender= document.querySelector("#gender")
    const errorGender= document.querySelector("#errorGender")
    const inputInterests= document.querySelector("#interests")
    const errorInterests= document.querySelector("#errorInterests")
    const inputPassword= document.querySelector("#contrasenia")
    const errorPassword= document.querySelector("#errorPassword")
    const inputPassword2= document.querySelector("#contrasenia2")
    const errorPassword2= document.querySelector("#errorPassword2")
    const inputConditions= document.querySelector("#conditions")
    const errorConditions= document.querySelector("#errorConditions")



    //Primer campo donde queremos que se posicione el usuario al cargar la página
    inputName.focus()

    //  Array para capturar todos los errores
    let errores= [];

    //Acción para validar el campo título al dejar el campo
    inputName.addEventListener("blur",()=>{

        if (inputName.value == ""){
            errores.push("El nombre no puede estar vacío")
            errorName.classList.add("danger")
            errorName.innerHTML="El nombre no puede estar vacío"
        }else{
            if (inputName.value.length < 2){
                errores.push("El nombre no puede tener menos de 2 caracteres")
                errorName.classList.add("danger")
                errorName.innerHTML="El nombre no puede tener menos de 2 caracteres"
            }else{
                errorName.style.display="none"
            }
        }
    })

    inputLast_name.addEventListener("blur",()=>{

        if (inputLast_name.value == ""){
            errores.push("El apellido no puede estar vacío")
            errorLast_name.classList.add("danger")
            errorLast_name.innerHTML="El apellido no puede estar vacío"
        }else{
            if (inputLast_name.value.length < 2){
                errores.push("El apellido no puede tener menos de 2 caracteres")
                errorLast_name.classList.add("danger")
                errorLast_name.innerHTML="El apellido no puede tener menos de 2 caracteres"
            }else{
                errorLast_name.style.display="none"
            }
        }
    })

    inputUser.addEventListener("blur",()=>{

        if (inputUser.value == ""){
            errores.push("El usuario no puede estar vacío")
            errorUser.classList.add("danger")
            errorUser.innerHTML="El usuario no puede estar vacío"
        }else{
            if (inputUser.value.length < 2){
                errores.push("El usuario no puede tener menos de 2 caracteres")
                errorUser.classList.add("danger")
                errorUser.innerHTML="El usuario no puede tener menos de 2 caracteres"
            }else{
                errorUser.style.display="none"
            }
        }
    })

    inputPhone_country.addEventListener("blur",()=>{

        if (inputPhone_country.value == ""){
            errores.push("El código de país no puede estar vacío")
            errorPhone_country.classList.add("danger")
            errorPhone_country.innerHTML="El código de país no puede estar vacío"
        }else{
            if (parseInt(inputPhone_country.value) < 0){
                errores.push("El código de país no puede ser negativo")
                errorPhone_country.classList.add("danger")
                errorPhone_country.innerHTML="El código de país no puede ser negativo"
            }else{
                errorPhone_country.style.display="none"
            }
        }
    })

    inputPhone_number.addEventListener("blur",()=>{

        if (inputPhone_number.value == ""){
            errores.push("El número de teléfono no puede estar vacío")
            errorPhone_number.classList.add("danger")
            errorPhone_number.innerHTML="El número de teléfono no puede estar vacío"
        }else{
            if (parseInt(inputPhone_number.value) < 0){
                errores.push("El número de teléfono no puede ser negativo")
                errorPhone_number.classList.add("danger")
                errorPhone_number.innerHTML="El número de teléfono no puede ser negativo"
            }else{
                errorPhone_number.style.display="none"
            }
        }
    })

    inputEmail.addEventListener("blur",()=>{

        if (inputEmail.value == ""){
            errores.push("El usuario no puede estar vacío")
            errorEmail.classList.add("danger")
            errorEmail.innerHTML="El usuario no puede estar vacío"
        }else{
            if ((!inputEmail.value.include("@")) || (!inputEmail.value.include(".com")) ){
                errores.push("El formato del correo es incorrecto")
                errorEmail.classList.add("danger")
                errorEmail.innerHTML="El formato del correo es incorrecto"
            }else{
                errorEmail.style.display="none"
            }
        }
    })

    inputBirth_date.addEventListener("blur",()=>{

        if (inputBirth_date.value == ""){
            errores.push("La fecha no puede estar vacía")
            errorBirth_date.classList.add("danger")
            errorBirth_date.innerHTML="La fecha no puede estar vacía"
        }else{
            if (inputBirth_date.value > (now.year - 18)){ //Acá quisiéramos validar año de nac. vs. año actual - 18 años)
                errores.push("El usuario debe ser mayor de edad")
                errorBirth_date.classList.add("danger")
                errorBirth_date.innerHTML="El usuario debe ser mayor de edad"
            }else{
                errorBirth_date.style.display="none"
            }
        }
    })

    inputAddress.addEventListener("blur",()=>{

        if (inputAddress.value == ""){
            errores.push("La dirección no puede estar vacía")
            errorAddress.classList.add("danger")
            errorAddress.innerHTML="El dirección no puede estar vacía"
        }else{
            errorAddress.style.display="none"
            }
        })
    
    inputGender.addEventListener("blur",()=>{

        if (inputGender.value == ""){
            errores.push("Debes seleccionar un género")
            errorGender.classList.add("danger")
            errorGender.innerHTML="Debes seleccionar un género"
        }else{
            errorGenders.style.display="none"
            }
        })

    inputInterests.addEventListener("focus",()=>{

        if (inputInterests.length === 0){ //Quisiéramos comprobar si seleccionó al menos un interés
            errores.push("Debes seleccionar al menos un interes")
            errorInterests.classList.add("danger")
            errorInterests.innerHTML="Debes seleccionar al menos un interes"
        }else{
            errorInterests.style.display="none"
            }
        })

    inputPassword.addEventListener("blur",()=>{

        if (inputPassword.value == ""){
            errores.push("Debes escribir una contraseña")
            errorPassword.classList.add("danger")
            errorPassword.innerHTML="Debes escribir una contraseña"
        }
        // else if (inputPassword.length < 8){ 
        //     errores.push("Debe contener al menos 8 caracteres")
        //     errorPassword.classList.add("danger")
        //     errorPassword.innerHTML="Debe contener al menos 8 caracteres"
        // } 
        
        // else if (!(inputPassword.match(/[A-z]/)) ){ 
        //     errores.push("Debe contener letras minúsculas")
        //     errorPassword.classList.add("danger")
        //     errorPassword.innerHTML="Debe contener letras minúsculas"
        // }

        // else if (!(inputPassword.match(/[A-Z]/)) ){ 
        //     errores.push("Debe contener letras mayusculas")
        //     errorPassword.classList.add("danger")
        //     errorPassword.innerHTML="Debe contener letras mayusculas"
        // }
        
        // else if (!(inputPassword.match(/\d/)) ){ 
        //     errores.push("Debe contener al menos un numero")
        //     errorPassword.classList.add("danger")
        //     errorPassword.innerHTML="Debe contener al menos un numero"
        // } 
        else {
            errorPassword.style.display="none"
        }
            
        })

    inputPassword2.addEventListener("change",()=>{

            if (inputPassword2.value == ""){
                errores.push("Debes escribir una contraseña")
                errorPassword2.classList.add("danger")
                errorPassword2.innerHTML="Debes escribir una contraseña"
            }
            
            else if (inputPassword.value !== inputPassword2.value){
                errores.push("Las contraseñas deben coincidir")
                errorPassword2.classList.add("danger")
                errorPassword2.innerHTML="Las contraseñas deben coincidir"
            } else {
                errorPassword.style.display="none"
            }
                
            })
    
    form.addEventListener("submit",()=>{

            if (inputConditions.value == ""){ //Quisiéramos que muestre error si no hace check en TyC
                errores.push("Debes aceptar los términos y condiciones")
                errorConditions.classList.add("danger")
                errorConditions.innerHTML="Debes escribir una contraseña"
            } else {
                errorPassword.style.display="none"
            }
            })
        

})