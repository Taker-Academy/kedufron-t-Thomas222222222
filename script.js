const url = "https://api.kedufront.juniortaker.com";

function createContainer() {
    const containerDiv = document.createElement('div');

    containerDiv.classList.add('item');
    containerDiv.style.width = '28%';
    containerDiv.style.marginTop = '10px';
    containerDiv.style.marginBottom = '10px';
    containerDiv.style.padding = '20px';
    containerDiv.style.borderRadius = '10px';
    containerDiv.style.boxShadow = '0px 0px 10px rgba(0,0,0,0.2)';
    return containerDiv;
}

function createImg(imageNumber) {
    const imgPlush = document.createElement('img');

    imgPlush.src = url + "/item/picture/" + imageNumber;
    imgPlush.style.height = '200px';
    imgPlush.style.width = 'auto';
    imgPlush.style.display = 'block';
    imgPlush.style.marginLeft = 'auto';
    imgPlush.style.marginRight = 'auto';
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
