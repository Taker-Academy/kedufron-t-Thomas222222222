const url = "https://api.kedufront.juniortaker.com";

function getSpecificProduct(id) {
    return axios.get(url + '/item/' + id)
        .then(response => {
            return response.data.item;
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

function sendOrder(data) {
    axios.post(url + "/order/", data)
        .then(response => {
            alert(`Votre id de commande : ${response.data.command_id}`);
        })
        .catch(error => {
            console.error(error);
        });
}
