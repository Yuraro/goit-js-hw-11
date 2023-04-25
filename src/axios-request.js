
import axios from 'axios';

export default class NewApiService {
    static ENDPOINT = 'https://pixabay.com/api/';
    static APIKEY = '35673160-782aa51f7b86396c5bf485a2a';

    constructor() {
        this.query = '';
        this.page = 1;
        this.totalPages = 0;
    }

    async getPhoto() {
        const url = `${NewApiService.ENDPOINT}?key=${NewApiService.APIKEY}&q=${this.query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;

        try {
            const response = await axios.get(url);
            this.incrementPage();
            this.totalPages = Math.ceil(response.data.totalHits / 40);

            return response.data;
        } catch (error) {
            console.log(`Error: ${error}`);
            return null;
        }
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
        this.totalPages = 0;
    }
}

