window.addEventListener('load', () => {
    let deleteButton = document.querySelector('#delete-button');

    deleteButton.addEventListener('click', (e) => {
        let confirmation = confirm('¿Estás seguro que deseas eliminar el producto?');
        if (confirmation === false) e.preventDefault();
    })
    
})