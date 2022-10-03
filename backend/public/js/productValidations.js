let validations = {
    sku: (inputItem, messageItem) => {
        if (inputItem.value == "") displayMessage(messageItem,'El SKU no puede estar vacío');
        else if (inputItem.value.length < 6) displayMessage(messageItem,'El SKU no puede tener menos de 6 caracteres');
        else deleteError(messageItem);
    },

    title: (inputItem, messageItem) => {
        if (inputItem.value == "") displayMessage(messageItem,'El título no puede estar vacío');
        else if (inputItem.value.length < 5) displayMessage(messageItem,'El título no puede tener menos de 5 caracteres');
        else deleteError(messageItem);
    },

    shortDescription: (inputItem, messageItem) => {
        if (inputItem.value == "") displayMessage(messageItem,'La descripción no puede estar vacía');
        else if (inputItem.value.length < 20) displayMessage(messageItem,'La descripción no puede tener menos de 20 caracteres');
        else deleteError(messageItem);
    },

    longDescription: (inputItem, messageItem) => {
        if (inputItem.value == "") displayMessage(messageItem,'La descripción no puede estar vacía');
        else if (inputItem.value.length < 20) displayMessage(messageItem,'La descripción no puede tener menos de 20 caracteres');
        else deleteError(messageItem);
    },

    regularPrice: (inputItem, messageItem) => {
        if (inputItem.value == "") displayMessage(messageItem,'El precio no puede estar vacío');
        else if (parseInt(inputItem.value) < 0) displayMessage(messageItem,'El precio no puede ser negativo');
        else deleteError(messageItem);
    },

    discount: (inputItem, messageItem) => {
        if (parseInt(inputItem.value) < 0) displayMessage(messageItem,'El descuento no puede ser negativo');
        else deleteError(messageItem);
    },

    fee_q: (inputItem, messageItem) => {
        if (parseInt(inputItem.value) < 0) displayMessage(messageItem,'Las cuotas no pueden ser negativo');
        else deleteError(messageItem);
    },

    tags: (inputItem, messageItem) => {
        if (inputItem.value == "") displayMessage(messageItem,'Debes ingresar al menos un tag');
        else deleteError(messageItem);
    },

    multiple: (inputItem, messageItem) => {
        let isChecked = false;
        inputItem.forEach( select => {
                if ( select.checked ) isChecked = true
            } );
        if (!isChecked) displayMessage(messageItem,'Debes seleccionar una categoría');
        else deleteError(messageItem);
    },

    image: (inputItem, messageItem) => {
        let imageAllowed = inputItem.value.match(/(\.jpg|\.jpeg|\.png|\.gif)$/) !== null;
        if (inputItem.value == '') displayMessage(messageItem,'Subí una imagen del producto');
        else if ( !imageAllowed && inputItem.value !== '' ) displayMessage(messageItem,'La imagen debe ser en formato .jpeg, .jpg, .gif o .png');
        else deleteError(messageItem);
    },
}

window.addEventListener('load', () => {

    //Capturamos el formulario
    const form = document.querySelector("form.registro")

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

    const inputCategories= document.querySelectorAll(".categories");
    const errorCategories= document.querySelector("#errorCategories");

    const inputImage_url= document.querySelector("#fotoPerfil")
    const errorImage_url= document.querySelector("#errorImage_url")

    const allInputs = document.querySelectorAll('form.registro input');
    const allTextAreas = document.querySelectorAll('form.registro textarea');


    //Primer campo donde queremos que se posicione el usuario al cargar la página
    inputSku.focus()

    //Acción para validar el campo título al dejar el campo
    inputSku.addEventListener("blur",() => validations.sku(inputSku,errorSku))
    inputTitle.addEventListener("blur",() => validations.title(inputTitle,errorTitle))
    inputShortDescription.addEventListener("blur",() => validations.shortDescription(inputShortDescription,errorShortDescription))
    inputLongDescription.addEventListener("blur",() => validations.longDescription( inputLongDescription,errorLongDescription))
    inputRegularPrice.addEventListener("blur",() => validations.regularPrice( inputRegularPrice,errorRegularPrice))
    inputDiscount.addEventListener("blur",() => validations.discount( inputDiscount,errorDiscount))
    inputFee_q.addEventListener("blur",() => validations.fee_q( inputFee_q,errorFee_q))
    inputTags.addEventListener("blur",() => validations.tags( inputTags,errorTags))

    inputCategories.forEach( item => {
        // let isChecked = false;
        item.addEventListener('blur', () => {
            validations.multiple(inputCategories, errorCategories);
        })
    }),

    inputImage_url.addEventListener('blur', () => validations.image(inputImage_url, errorImage_url))

    form.addEventListener("submit", e => {
        e.preventDefault();

        allInputs.forEach(inputElement => inputElement.focus());
        allTextAreas.forEach( inputElement => inputElement.focus());

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

