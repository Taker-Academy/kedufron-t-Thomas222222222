const url = "https://api.kedufront.juniortaker.com";

function getSpecificProduct(storedProducts) {
    axios.get(url + '/item/' + storedProducts.id)
    .then(response => {
        displayProduct(response.data.item, storedProducts);
    })
    .catch(error => {
        console.error(error);
    });
}

/**
 * Function to get data of the api with request GET and axios
 */
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
