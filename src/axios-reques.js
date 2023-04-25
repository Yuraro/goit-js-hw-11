
export default class NewApiService{
    static ENDPOINT = "https://pixabay.com/api/";
    static APIKEY = "key=35673160-782aa51f7b86396c5bf485a2a&q";

    constructor() {
        this.query = "";
        this.page = 1;
    }
    
    getPhoto() {
        const url = `${NewApiService.ENDPOINT}?${NewApiService.APIKEY}&q=${this.query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
        return fetch(url).then((response) => {
            this.incrementPage();
        if (response.status !== 200) {
        console.log(`Error ${response.status}`);
        return;
    }
        return response.json()
    })
    .catch((error) => console.log(`Error: ${error}`));
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }
}

