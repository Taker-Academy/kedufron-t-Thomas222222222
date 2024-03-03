// Add product
function createLocalStorage(_id) {
    var firstObject = [{id: _id, quantity: 1}];

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
                storedProducts[i].quantity = storedProducts[i].quantity + 1;
            }
        }
    } else {
        new_product = {id: _id, quantity: 1};
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
function createInfoProduct(productInfo, product) {
    const dataDiv = document.createElement('div');
    const buttonMinus = document.createElement('button');
    const iconMinus = document.createElement('i');
    const entryPrice = document.createElement('input');
    const buttonPlus = document.createElement('button');
    const iconPlus = document.createElement('i');
    const RemoveIcon = document.createElement('i');

    dataDiv.className = 'price';

    iconMinus.className = 'fa-solid fa-minus';
    buttonMinus.className = 'minus';
    buttonMinus.appendChild(iconMinus);
    buttonMinus.addEventListener('click', function() {
        console.log("Remove one !");
    });

    entryPrice.value = product.quantity;

    iconPlus.className = 'fa-solid fa-plus';
    buttonPlus.className = 'plus';
    buttonPlus.appendChild(iconPlus);
    buttonPlus.addEventListener('click', function() {
        console.log("Add one !");
    });

    RemoveIcon.className = 'fa-solid fa-xmark';

    dataDiv.appendChild(buttonMinus);
    dataDiv.appendChild(entryPrice);
    dataDiv.appendChild(buttonPlus);
    dataDiv.appendChild(RemoveIcon);
    return dataDiv;
}

function displayProduct(productInfo, product) {
    const mainContainer = document.querySelector('.cartPage');
    const containerDiv = document.createElement('div');
    const imgProduct = document.createElement('img');
    const name = document.createElement('p');
    const infoproductDiv = createInfoProduct(productInfo, product);

    containerDiv.className = 'product';
    imgProduct.src = url + '/item/picture/' + productInfo.image;
    name.textContent = productInfo.name;

    containerDiv.appendChild(imgProduct);
    containerDiv.appendChild(name);
    containerDiv.appendChild(infoproductDiv);
    mainContainer.appendChild(containerDiv);
}

function displayCart() {
    var storedProducts = JSON.parse(localStorage.getItem('cart'));

    if (storedProducts === null) {
        return;
    }
    for (var i = 0; i < storedProducts.length; i++) {
        getSpecificProduct(storedProducts[i]);
    }
}
