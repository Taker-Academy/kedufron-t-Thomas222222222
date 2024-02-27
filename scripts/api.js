const url = "https://api.kedufront.juniortaker.com";

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

window.onload = getData();
