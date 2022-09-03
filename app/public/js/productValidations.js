window.addEventListener('load', () => {
    //Capturamos el formulario
    const form = document.querySelector("form")

    //Capturamos los campos del formulario y los "smalls" que mostraran los mensajes de error
    const inputSku= document.querySelector("#sku")
    const errorSku= document.querySelector("#errorSku")
    const inputTitle= document.querySelector("#titulo")
    const errorTitle= document.querySelector("#errorTitle")
    const inputShortDescription= document.querySelector("#descripcionCorta")
    const errorShortDescription= document.querySelector("#errorShortDescription")
    const inputLongDescription= document.querySelector("#descripcionLarga")
    const errorLongDescription= document.querySelector("#errorLongDescription")
    const inputRegularPrice= document.querySelector("#precioRegular")
    const errorRegularPrice= document.querySelector("#errorRegularPrice")
    const inputDiscount= document.querySelector("#descuento")
    const errorDiscount= document.querySelector("#errorDiscount")
    const inputFee_q= document.querySelector("#cantidadCuotas")
    const errorFee_q= document.querySelector("#errorFee_q")
    const inputTags= document.querySelector("#etiquetas")
    const errorTags= document.querySelector("#errorTags")
    const inputIs_physical= document.querySelector("#esFisico")
    const inputIs_digital= document.querySelector("#esDigital")
    const errorIs_physical= document.querySelector("#errorIs_physical")
    const inputCategories= document.querySelector(".categories")
    const errorCategories= document.querySelector("#errorCategories")
    const inputImage_url= document.querySelector("#fotoPerfil")
    const errorImage_url= document.querySelector("#errorImage_url")



    //Primer campo donde queremos que se posicione el usuario al cargar la página
    inputSku.focus()

    //  Array para capturar todos los errores
    let errores= [];

    //Acción para validar el campo título al dejar el campo
    inputSku.addEventListener("blur",()=>{

        if (inputSku.value == ""){
            errores.push("El SKU no puede estar vacío")
            errorSku.classList.add("danger")
            errorSku.innerHTML="El SKU no puede estar vacío"
        }else{
            if (inputSku.value.length < 6){
                errores.push("El SKU no puede tener menos de 6 caracteres")
                errorSku.classList.add("danger")
                errorSku.innerHTML="El SKU no puede tener menos de 6 caracteres"
            }else{
                errorSku.style.display="none"
            }
        }
    })

    inputTitle.addEventListener("blur",()=>{

        if (inputTitle.value == ""){
            errores.push("El título no puede estar vacío")
            errorTitle.classList.add("danger")
            errorTitle.innerHTML="El título no puede estar vacío"
        }else{
            if (inputTitle.value.length < 5){
                errores.push("El título no puede tener menos de 5 caracteres")
                errorTitle.classList.add("danger")
                errorTitle.innerHTML="El título no puede tener menos de 5 caracteres"
            }else{
                errorTitle.style.display="none"
            }
        }
    })

    inputShortDescription.addEventListener("blur",()=>{

        if (inputShortDescription.value == ""){
            errores.push("La descripción no puede estar vacía")
            errorShortDescription.classList.add("danger")
            errorShortDescription.innerHTML="La descripción no puede estar vacía"
        }else{
            if (inputShortDescription.value.length < 20){
                errores.push("La descripción no puede tener menos de 20 caracteres")
                errorShortDescription.classList.add("danger")
                errorShortDescription.innerHTML="La descripción no puede tener menos de 20 caracteres"
            }else{
                errorShortDescription.style.display="none"
            }
        }
    })

    inputLongDescription.addEventListener("blur",()=>{

        if (inputLongDescription.value == ""){
            errores.push("La descripción no puede estar vacía")
            errorLongDescription.classList.add("danger")
            errorLongDescription.innerHTML="La descripción no puede estar vacía"
        }else{
            if (inputLongDescription.value.length < 20){
                errores.push("La descripción no puede tener menos de 20 caracteres")
                errorLongDescription.classList.add("danger")
                errorLongDescription.innerHTML="La descripción no puede tener menos de 20 caracteres"
            }else{
                errorLongDescription.style.display="none"
            }
        }
    })


    inputRegularPrice.addEventListener("blur",()=>{

        if (inputRegularPrice.value == ""){
            errores.push("El precio no puede estar vacío")
            errorRegularPrice.classList.add("danger")
            errorRegularPrice.innerHTML="El precio no puede estar vacío"
        }else{
            if (parseInt(inputRegularPrice.value,10) < 0){
                errores.push("El precio no puede ser negativo")
                errorRegularPrice.classList.add("danger")
                errorRegularPrice.innerHTML="El precio no puede ser negativo"
            }else{
                errorRegularPrice.style.display="none"
            }
        }
    })

    inputDiscount.addEventListener("blur",()=>{

        if (parseInt(inputDiscount.value) < 0){
            errores.push("El descuento no puede ser negativo")
            errorDiscount.classList.add("danger")
            errorDiscount.innerHTML="El descuento no puede ser negativo"
        }else{
            errorDiscount.style.display="none"
        }
    })

    inputFee_q.addEventListener("blur",()=>{

        if (parseInt(inputFee_q.value) < 0){
            errores.push("Las cuotas no pueden ser negativas")
            errorFee_q.classList.add("danger")
            errorFee_q.innerHTML="Las cuotas no pueden ser negativas"
        }else{
            errorFee_q.style.display="none"
        }
    })

    inputTags.addEventListener("blur",()=>{

        if (inputTags.value == ""){
            errores.push("Las etiquetas no pueden estar vacías")
            errorTags.classList.add("danger")
            errorTags.innerHTML="Las etiquetas no pueden estar vacías"
        }else{
            errorTags.style.display="none"
            }
    })

    //Para validar checkboxes con el evento submit
    var checkBoxes = form.querySelectorAll('input[type="checkbox"]'); // get all the check box
    // document.getElementById('submit').addEventListener('click', getData); //add a click event to the save button
    inputImage_url.addEventListener('click', getData); //add a click event to the save button

    let errorCat = true;

    function getData() { // this function will get called when the save button is clicked
        checkBoxes.forEach(item => { // loop all the checkbox item
            if (item.checked) {  //if the check box is checked
                errorCat = false;
            }
        });
        
        if (errorCat) {
            errores.push("Debes seleccionar al menos una categoría")
            errorCategories.classList.add("danger")
            errorCategories.innerHTML="Debes seleccionar al menos una categoría"
        }else{
            errorCategories.style.display="none"
            }
    }


    //PENDIENTES
    //VALIDAR CATEGORIAS ("Debes seleccionar al menos una categoría")
    // PREVENTDEFAULT NO FUNCIONA
    
    // form.addEventListener("submit", (e) => {

        // if (inputCategories.value == ""){
        //     errores.push("Debes seleccionar al menos una categoría")
        //     errorCategories.classList.add("danger")
        //     errorCategories.innerHTML="Debes seleccionar al menos una categoría"
        // }else{
        //     errorCategories.style.display="none"
        //     }
        
        // if (errores.length > 0) {
            // e.preventDefault();
            // console.log("haciendo submit");
        // }
    // })

})


