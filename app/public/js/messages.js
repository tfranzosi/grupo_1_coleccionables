window.addEventListener('load', () => {
    let deleteButtons = document.querySelectorAll('#delete-button');

    for (let button of deleteButtons)
        button.addEventListener('click', (e) => {
            let confirmation = confirm('¿Estás seguro que deseas eliminar el producto?');
            if (confirmation === false) e.preventDefault();
        })
})