function createContainerTop(name) {
    const containerTop = document.createElement('div');
    const nameText = document.createElement('h2');
    const iconClosed = document.createElement('i');

    containerTop.style.display = 'flex';
    containerTop.style.padding = '10px';
    nameText.textContent = name;
    iconClosed.className = 'fa-solid fa-xmark';
    iconClosed.style.marginTop ='auto';
    iconClosed.style.marginBottom = 'auto';
    iconClosed.style.marginLeft = 'auto';
    iconClosed.style.marginRight = '5px';
    iconClosed.style.fontSize = '30px';
    iconClosed.addEventListener('click', function() {
        console.log("L'icone a été clické !");
    });

    containerTop.appendChild(nameText);
    containerTop.appendChild(iconClosed);
    return containerTop;
}

function createContainerContent(imageID) {
    const containerContent = document.createElement('div');
    const imgPlush = document.createElement('img');

    containerContent.style.display = 'flex';
    containerContent.style.placeContent = 'center';

    imgPlush.src = url + "/item/picture/" + imageID;

    containerContent.appendChild(imgPlush);
    return containerContent;
}

function createContainerBottom() {
    const containerBottom = document.createElement('div');

    return containerBottom;
}

function specificsDetailsProduct(item) {
    const specificProductDiv = document.querySelector('.specificProduct');
    const blurBackgroundDiv = document.querySelector('.blurBackground');

    const containerTop = createContainerTop(item.name);
    const containerContent = createContainerContent(item.image);
    const containerBottom = createContainerBottom();

    blurBackgroundDiv.style.display = 'block';
    specificProductDiv.style.display = 'flex';
    specificProductDiv.style.placeContent = 'center';
    specificProductDiv.style.flexDirection = 'column';


    specificProductDiv.appendChild(containerTop);
    specificProductDiv.appendChild(containerContent);
    specificProductDiv.appendChild(containerBottom);
}
