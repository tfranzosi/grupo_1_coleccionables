const ids = document.querySelectorAll('#id');
const quantities = document.querySelectorAll('#quantity');
const prices = document.querySelectorAll('#price');
const plusButtons = document.querySelectorAll('.plus-button');
const minusButtons = document.querySelectorAll('.minus-button');
const checkoutButton = document.querySelector('.go-to-checkout-button')
const totalPriceLabel = document.querySelector('.total-price-number');
const finalPriceLabel = document.querySelector('.final-price-number');

window.addEventListener('load', () => {

    //Pasamos la info de los productos al LocalStorage
    localStorage.removeItem('products')
    let products = [];
    updateLocalStorage();

    checkoutButton.addEventListener('click', (e) => {
        const confirmation = confirm('Estás seguro que deseas finalizar tu compra?');
        if (confirmation === true) alert('Gracias por comprar con nosotros! Te llevamos a que sigas viendo que tenemos');
        else e.preventDefault();
    })

    for (let index = 0 ; index < plusButtons.length ; index++) {
        plusButtons[index].addEventListener('click', () => {
            quantities[index].value++;
            updateAll (index);
        })

        minusButtons[index].addEventListener('click', () => {
            if (parseInt(quantities[index].value) > 0){
                quantities[index].value--;
                updateAll (index);
            }
            if (parseInt(quantities[index].value)<1){
                if (confirm("Desea quitar el producto del carrito?")) deleteItem(index);
            }
        })

        quantities[index].addEventListener('change', () => {
            updateAll (index);
            if(parseInt(quantities[index].value<1)){
                if (confirm("Desea quitar el producto del carrito?")) deleteItem(index);
            }
        })
    }

});

const updateTotalPrice = () => {
    let totalPrice = 0;

    let products = JSON.parse(localStorage.getItem('products'));
    products.map( product => totalPrice += product.quantity * product.price);

    return totalPrice
}

const toFloat = (str) => parseFloat(str.slice(1).replace(".","").replace(",","."));

const updateLocalStorage = () => {
    let products = [];
    for (let index = 0 ; index < quantities.length ; index++) products.push ({
        id: parseInt(ids[index].value),
        price: toFloat(prices[index].innerText),
        quantity: parseInt(quantities[index].value)
    })
    localStorage.setItem('products',JSON.stringify(products));
}


const updateAll = (index) => {
    let products = JSON.parse(localStorage.getItem('products'));
    products[index].quantity = quantities[index].value;
    updateLocalStorage();
    totalPriceLabel.innerText = '$' + updateTotalPrice().toLocaleString('es-Ar');
    finalPriceLabel.innerText = '$' + (updateTotalPrice()+2000).toLocaleString('es-Ar');
}

const deleteItem = (index) => {
    let item = document.getElementById("item-"+index);
    item.remove();
}

window.addEventListener('unload', e => {
    e.preventDefault();
    let confirmation = confirm('Esta seguro que te queres ir?');
    if (confirmation === false) e.preventDefault(); 

})