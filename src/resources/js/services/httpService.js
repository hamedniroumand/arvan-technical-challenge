import axios from "axios";

export default class HttpService {

    BASE_URL = "https://coda.io/apis/v1/"
    API_KEY = "c123c6a1-9646-4f23-8bde-c6faeaf41486"


    constructor(url) {
        this.url = url;

        this.http = axios.create({
            baseURL: this.BASE_URL,
            headers: {
                'Authorization': `Bearer ${this.API_KEY}`
            }
        });
    }

    post(body, config = {}) {
        return this.http.post(this.url, body, config)
    }

}
