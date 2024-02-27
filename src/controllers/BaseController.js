const { Response } = require('./Response');

class BaseController {
    constructor(request) {
        this.request = request;
    }

    async get(url) {
        const res = await this.request.get(url);
        return new Response(res).init();
    }

    async post(url, data) {
        const res = await this.request.post(url, { data });
        return new Response(res).init();
    }

    async delete(url) {
        const res = await this.request.delete(url);
        return new Response(res).init();
    }
}

module.exports.BaseController = BaseController;
