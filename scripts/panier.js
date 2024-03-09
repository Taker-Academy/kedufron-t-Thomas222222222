// Add product
function createLocalStorage(_id) {
    var firstObject = [{id: _id, amount: 1}];

    localStorage.setItem('cart', JSON.stringify(firstObject));
}

function productExist(id, storedProducts) {
    if (storedProducts === null) {
        return false;
    }
    for (var i = 0; i < storedProducts.length; i++) {
        if (storedProducts[i].id === id) {
            return true;
        }
    }
    return false;
}

function addProduct(_id) {
    var storedProducts = JSON.parse(localStorage.getItem('cart'));
    var new_product;

    if (productExist(_id, storedProducts) === true) {
        for (var i = 0; i < storedProducts.length; i++) {
            if (storedProducts[i].id === _id) {
                storedProducts[i].amount = storedProducts[i].amount + 1;
            }
        }
    } else {
        new_product = {id: _id, amount: 1};
        storedProducts.push(new_product);
    }
    localStorage.setItem('cart', JSON.stringify(storedProducts));
}

function addProductToCart(id) {
    // localStorage.clear();
    if (localStorage.getItem('cart') !== null) {
        addProduct(id);
    } else {
        createLocalStorage(id);
    }
}

// Display cart
function removeQuantityOfProduct(productInfo) {
    var storedProducts = JSON.parse(localStorage.getItem('cart'));
    var inputPrice = document.querySelector('.entryQuantity' + productInfo._id);
    var totalPrice = document.querySelector('.priceTotal' + productInfo._id);

    for (var i = 0; i < storedProducts.length; i++) {
        if (storedProducts[i].id === productInfo._id && storedProducts[i].amount > 0) {
            storedProducts[i].amount -= 1;
            inputPrice.value = storedProducts[i].amount;
            totalPrice.textContent = `${productInfo.price * storedProducts[i].amount} €`;
            break;
        }
    }
    localStorage.setItem('cart', JSON.stringify(storedProducts));
}

function addQuantityOfProduct(productInfo) {
    var storedProducts = JSON.parse(localStorage.getItem('cart'));
    var inputPrice = document.querySelector('.entryQuantity' + productInfo._id);
    var totalPrice = document.querySelector('.priceTotal' + productInfo._id);

    for (var i = 0; i < storedProducts.length; i++) {
        if (storedProducts[i].id === productInfo._id) {
            storedProducts[i].amount += 1;
            inputPrice.value = storedProducts[i].amount;
            totalPrice.textContent = `${productInfo.price * storedProducts[i].amount} €`;
            break;
        }
    }
    localStorage.setItem('cart', JSON.stringify(storedProducts));
}

function removeProductInCart(productInfo) {
    var storedProducts = JSON.parse(localStorage.getItem('cart'));
    var divToDelete = document.querySelector('.product' + productInfo._id);
    var divForm = document.querySelector('.formCart');

    for (var i = 0; i < storedProducts.length; i++) {
        if (storedProducts[i].id === productInfo._id) {
            divToDelete.parentNode.removeChild(divToDelete);
            storedProducts.splice(i, 1);
            break;
        }
    }
    if (storedProducts.length === 0)
        divForm.parentNode.removeChild(divForm);
    localStorage.setItem('cart', JSON.stringify(storedProducts));
}

function createInfoProduct(productInfo, product) {
    const dataDiv = document.createElement('div');
    const buttonMinus = document.createElement('button');
    const iconMinus = document.createElement('i');
    const entryPrice = document.createElement('input');
    const buttonPlus = document.createElement('button');
    const iconPlus = document.createElement('i');
    const price = document.createElement('p');
    const RemoveIcon = document.createElement('i');

    dataDiv.className = 'price';

    iconMinus.className = 'fa-solid fa-minus';
    buttonMinus.className = 'minus';
    buttonMinus.appendChild(iconMinus);
    buttonMinus.addEventListener('click', function() {
        removeQuantityOfProduct(productInfo);
    });

    entryPrice.className = 'entryQuantity' + productInfo._id;
    entryPrice.value = product.amount;

    iconPlus.className = 'fa-solid fa-plus';
    buttonPlus.className = 'plus';
    buttonPlus.appendChild(iconPlus);
    buttonPlus.addEventListener('click', function() {
        addQuantityOfProduct(productInfo);
    });

    price.className = 'priceTotal' + productInfo._id;
    price.textContent = `${productInfo.price * product.amount} €`;

    RemoveIcon.className = 'fa-solid fa-xmark';
    RemoveIcon.addEventListener('click', function() {
        removeProductInCart(productInfo);
    });

    dataDiv.appendChild(buttonMinus);
    dataDiv.appendChild(entryPrice);
    dataDiv.appendChild(buttonPlus);
    dataDiv.appendChild(price);
    dataDiv.appendChild(RemoveIcon);
    return dataDiv;
}

function displayProduct(productInfo, product, mainContainer) {
    const containerDiv = document.createElement('div');
    const imgProduct = document.createElement('img');
    const name = document.createElement('p');
    const infoproductDiv = createInfoProduct(productInfo, product);

    containerDiv.className = 'product' + productInfo._id;
    imgProduct.src = url + '/item/picture/' + productInfo.image;
    name.textContent = productInfo.name;

    containerDiv.appendChild(imgProduct);
    containerDiv.appendChild(name);
    containerDiv.appendChild(infoproductDiv);
    mainContainer.appendChild(containerDiv);
}

function displayForm(storedProducts, mainContainer)
{
    const formContainer = document.createElement('div');

    if (storedProducts.length === 0) {
        return;
    }
    formContainer.innerHTML =
        `<div class="formCart">
            <p>Bonjour à tous</p>
        </div>`;
    mainContainer.appendChild(formContainer);
}

async function displayCart() {
    const mainContainer = document.querySelector('.cartPage');
    var storedProducts = JSON.parse(localStorage.getItem('cart'));
    var product;

    if (storedProducts.length === 0) {
        return;
    }
    for (var i = 0; i < storedProducts.length; i++) {
        product = await getSpecificProduct(storedProducts[i].id);
        if (product) {
            displayProduct(product, storedProducts[i], mainContainer);
        }
    }
    displayForm(storedProducts, mainContainer);
}
