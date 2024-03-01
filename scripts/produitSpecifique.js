function addValuesContainerTop(name, containerContent, containerBottom) {
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
        while (specificProductContent.firstChild) {
            specificProductContent.removeChild(specificProductBottom.firstChild);
        }
    });
}

function addValuesContainerContent(imageID) {
    containerContent = document.querySelector('.specificProductContent');
    const imgPlush = document.createElement('img');

    imgPlush.src = url + "/item/picture/" + imageID;

    containerContent.appendChild(imgPlush);
}

function addValuesContainerBottom() {
    containerBottom = document.querySelector('.specificProductBottom');
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
    addValuesContainerBottom();
}
