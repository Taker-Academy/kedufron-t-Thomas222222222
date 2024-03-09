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
function increaseTotalPrice(addPrice)
{
    var paragraphTotalPrice = document.querySelectorAll('.totalProductsPrice');
    var actualPrice = parseInt(paragraphTotalPrice[0].textContent);

    paragraphTotalPrice.forEach(paragraph => {
        paragraph.textContent = `${actualPrice + addPrice} €`;
    });
}

function reduceTotalPrice(removedPrice)
{
    var paragraphTotalPrice = document.querySelectorAll('.totalProductsPrice');
    var actualPrice = parseInt(paragraphTotalPrice[0].textContent);

    paragraphTotalPrice.forEach(paragraph => {
        paragraph.textContent = `${actualPrice - removedPrice} €`;
    });
}

function removeQuantityOfProduct(productInfo) {
    var storedProducts = JSON.parse(localStorage.getItem('cart'));
    var inputPrice = document.querySelector('.entryQuantity' + productInfo._id);
    var totalPrice = document.querySelector('.priceTotal' + productInfo._id);

    for (var i = 0; i < storedProducts.length; i++) {
        if (storedProducts[i].id === productInfo._id && storedProducts[i].amount > 0) {
            storedProducts[i].amount -= 1;
            inputPrice.value = storedProducts[i].amount;
            reduceTotalPrice(productInfo.price);
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
            increaseTotalPrice(productInfo.price);
            totalPrice.textContent = `${productInfo.price * storedProducts[i].amount} €`;
            break;
        }
    }
    localStorage.setItem('cart', JSON.stringify(storedProducts));
}

function removeProductInCart(productInfo) {
    var storedProducts = JSON.parse(localStorage.getItem('cart'));
    var divToDelete = document.querySelector('.product' + productInfo._id);
    var divForm = document.querySelector('.summaryCart');

    for (var i = 0; i < storedProducts.length; i++) {
        if (storedProducts[i].id === productInfo._id) {
            reduceTotalPrice(productInfo.price * storedProducts[i].amount);
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

async function getTotalPrice(storedProducts)
{
    var price = 0;
    var dataApi;

    for (var i = 0; i < storedProducts.length; i++) {
        dataApi = await getSpecificProduct(storedProducts[i].id);
        price += (dataApi.price * storedProducts[i].amount);
    }
    return price;
}

function displayForm(storedProducts, mainContainer)
{
    const formContainer = document.createElement('div');
    var totalPrice = 0;

    formContainer.className = 'summaryCart';
    if (storedProducts.length === 0) {
        return;
    }
    getTotalPrice(storedProducts).then(price => {
        totalPrice = price;
        formContainer.innerHTML =
            `<div class="formContact">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required>
                <label for="nom">Nom</label>
                <input type="text" id="nom" name="nom" required>
                <label for="prenom">Prénom</label>
                <input type="text" id="prenom" name="prenom" required>
                <label for="adresse">Adresse</label>
                <input type="text" id="adresse" name="adresse" required>
                <label for="rue">Nom de rue</label>
                <input type="text" id="rue" name="rue" required>
            </div>
            <div class="orderSummary">
                <div class="boxDetails">
                    <p class="cartTitle">Panier</p>
                    <p class="totalProductsPrice">${totalPrice} €</p>
                </div>
                <hr>
                <div class="boxDetails">
                    <i class="fa-solid fa-shop"></i>
                    <p>Gratuit</p>
                </div>
                <div class="boxDetails">
                    <i class="fa-solid fa-truck"></i>
                    <p>Gratuit</p>
                </div>
                <hr>
                <div class="boxDetails">
                    <p class="cartTitle">TOTAL</p>
                    <p class="totalProductsPrice">${totalPrice} €</p>
                </div>
                <button>Validation du panier</button>
            </div>`;
        mainContainer.appendChild(formContainer);
    });
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
