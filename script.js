const url = "https://api.kedufront.juniortaker.com";

function createContainer(id) {
    const containerDiv = document.createElement('div');

    containerDiv.classList.add(`item${id}`);
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

// Functions of bubble information
function hidePopUp(id) {
    const popUp = document.querySelector(`.popup${id}`);

    if (popUp) {
        popUp.remove();
    }
}

function showPopUp(item) {
    const popup = document.createElement('div');
    var icon;
    var iconRect;
    var popupRect;

    popup.classList.add(`popup${item._id}`);
    popup.textContent = `Crée le ${item.createdIn}`;

    document.body.appendChild(popup);

    icon = document.querySelector(`.info-icon${item._id}`);
    iconRect = icon.getBoundingClientRect();
    popupRect = popup.getBoundingClientRect();

    popup.style.top = `${iconRect.bottom + 10}px`;
    popup.style.left = `${iconRect.left - (popupRect.width / 2)}px`;

    popup.remove();

    document.body.appendChild(popup);
}

function createBubbleInfo(item) {
    const bubbleInfo = document.createElement('div');
    const Info = document.createElement('i');

    bubbleInfo.classList.add('bubble');
    Info.classList.add('fa-solid', 'fa-info', `info-icon${item._id}`);
    bubbleInfo.appendChild(Info);

    bubbleInfo.addEventListener('mouseenter', () => {
        showPopUp(item);
    });
    bubbleInfo.addEventListener('mouseleave', () => {
        hidePopUp(item._id)
    });
    return bubbleInfo;
}

// Function for displaying api elements
function displayData(items) {
    const contentPage = document.querySelector('.productsPage');

    items.forEach(item => {
        const containerDiv = createContainer(item._id);
        const imgPlush = createImg(item.image);
        const containerInfo = createContainerInfo();
        const containerParagraph = createParagraph(item.name, item.price);
        const bubbleInfo = createBubbleInfo(item);

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
