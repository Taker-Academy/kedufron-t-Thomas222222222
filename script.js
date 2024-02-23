const url = "https://api.kedufront.juniortaker.com";

function createContainer() {
    const containerDiv = document.createElement('div');

    containerDiv.classList.add('item');
    return containerDiv;
}

function createImg(imageNumber) {
    const imgPlush = document.createElement('img');

    imgPlush.src = url + "/item/picture/" + imageNumber;
    return imgPlush;
}

function createContainerInfo() {
    const containerInfo = document.createElement('div');

    containerInfo.classList.add('info');
    return containerInfo;
}

function createParagraph(name, price) {
    const containerParagraph = document.createElement('div');
    const nameParagraph = document.createElement('p');
    const priceParagraph = document.createElement('p');

    containerParagraph.classList.add('description');
    nameParagraph.textContent = name;
    priceParagraph.textContent = price.toFixed(2) + ' €';
    containerParagraph.appendChild(nameParagraph);
    containerParagraph.appendChild(priceParagraph);
    return containerParagraph;
}

function createBubbleInfo() {
    const bubbleInfo = document.createElement('div');
    const Info = document.createElement('i');

    bubbleInfo.classList.add('bubble');
    Info.classList.add('fa-solid', 'fa-info');
    bubbleInfo.appendChild(Info);
    return bubbleInfo;
}

// Function for displaying api elements
function displayData(items) {
    const contentPage = document.querySelector('.productsPage');

    items.forEach(item => {
        const containerDiv = createContainer();
        const imgPlush = createImg(item.image);
        const containerInfo = createContainerInfo();
        const containerParagraph = createParagraph(item.name, item.price);
        const bubbleInfo = createBubbleInfo();

        containerInfo.appendChild(containerParagraph);
        containerInfo.appendChild(bubbleInfo);
        containerDiv.appendChild(imgPlush);
        containerDiv.appendChild(containerInfo);
        contentPage.appendChild(containerDiv);
    });
}


// Function to get data of the api with request GET
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
