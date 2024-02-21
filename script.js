const url = "https://api.kedufront.juniortaker.com";

function createContainer() {
    const containerDiv = document.createElement('div');

    containerDiv.classList.add('item');
    return containerDiv;
}

function createImg(imageNumber) {
    const imgPlush = document.createElement('img');

    imgPlush.src = url + "/item/picture/" + imageNumber;
    imgPlush.style.height = '300px';
    return imgPlush;
}

function createNameParagraph(name) {
    const nameParagraph = document.createElement('p');

    nameParagraph.textContent = name;
    return nameParagraph;
}

function createPriceParagraph(price) {
    const priceParagraph = document.createElement('p');

    priceParagraph.textContent = price;
    return priceParagraph;
}

function displayData(items) {
    const contentPage = document.querySelector('.productsPage');

    items.forEach(item => {
        const containerDiv = createContainer();
        const imgPlush = createImg(item.image);
        const nameParagraph = createNameParagraph(item.name);
        const priceParagraph = createPriceParagraph(item.price);

        containerDiv.appendChild(imgPlush);
        containerDiv.appendChild(nameParagraph);
        containerDiv.appendChild(priceParagraph);
        contentPage.appendChild(containerDiv);
    });
}

function getData() {
    var items;

    axios.get(url + "/item/")
    .then(response => {
        items = response.data;
        displayData(items);
    })
    .catch(error => {
        console.error("Error : " + error);
    });
}

window.onload = getData();
