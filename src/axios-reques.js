const ENDPOINT = "https://pixabay.com/api/";
const APIKEY = "key=35673160-782aa51f7b86396c5bf485a2a&q";

function getPhoto(query) {
    return fetch(`${ENDPOINT}?${APIKEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`)
        .then((response) => {
            if (response.status !== 200) {
                console.log(`Error ${response.status}`);
                return;
            }
            return response.json()
        })
        .catch((error) => console.log(`Error: ${error}`));
}

export { getPhoto };
