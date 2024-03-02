function addValuesContainerTop(name) {
    const nameText = document.querySelector('.titleProduct');
    const iconClosed = document.querySelector('.fa-solid.fa-xmark');

    nameText.textContent = name;
    iconClosed.addEventListener('click', function() {
        const specificProduct = document.querySelector('.specificProduct');
        const specificProductContent = document.querySelector('.specificProductContent');
        const specificProductBottom = document.querySelector('.specificProductBottom');
        const blurBackground = document.querySelector('.blurBackground');

        blurBackground.style.display = 'none';
        specificProduct.style.display = 'none';
        while (specificProductContent.firstChild) {
            specificProductContent.removeChild(specificProductContent.firstChild);
        }
        while (specificProductBottom.firstChild) {
            specificProductBottom.removeChild(specificProductBottom.firstChild);
        }
    });
}

function addValuesContainerContent(imageID) {
    const containerContent = document.querySelector('.specificProductContent');
    const imgPlush = document.createElement('img');

    imgPlush.src = url + "/item/picture/" + imageID;

    containerContent.appendChild(imgPlush);
}

function addValuesContainerBottom(description, price, id) {
    const containerBottom = document.querySelector('.specificProductBottom');
    const textDescription = document.createElement('p');
    const purchaseDiv = document.createElement('div');
    const textPrice = document.createElement('p');
    const addButton = document.createElement('button');

    textDescription.textContent = description;
    purchaseDiv.style.display = 'flex';
    purchaseDiv.style.flexDirection = 'row';
    purchaseDiv.style.alignItems = 'center';
    purchaseDiv.style.paddingTop = '15px';
    textPrice.textContent = `${price.toFixed(2)} €`;
    addButton.textContent = 'Ajouter au panier';
    addButton.addEventListener('click', function() {
        addProductToCart(id);
    });

    purchaseDiv.appendChild(textPrice);
    purchaseDiv.appendChild(addButton);
    containerBottom.appendChild(textDescription);
    containerBottom.appendChild(purchaseDiv);
}

function specificsDetailsProduct(item) {
    const specificProductDiv = document.querySelector('.specificProduct');
    const blurBackgroundDiv = document.querySelector('.blurBackground');

    blurBackgroundDiv.style.display = 'block';
    specificProductDiv.style.display = 'flex';
    specificProductDiv.style.placeContent = 'center';
    specificProductDiv.style.flexDirection = 'column';

    addValuesContainerTop(item.name);
    addValuesContainerContent(item.image);
    addValuesContainerBottom(item.description, item.price, item._id);
}
