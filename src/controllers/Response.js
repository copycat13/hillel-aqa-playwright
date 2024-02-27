class Response {
    status;
    json;
    headers;

    constructor(response) {
        this.response = response;
    }

    async init() {
        this.json = await this.response.json();
        this.status = await this.response.status();
        this.headers = await this.response.headers();
        return this;
    }
}

module.exports.Response = Response;
