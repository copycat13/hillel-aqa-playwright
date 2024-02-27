const { BaseController } = require('./BaseController');
const { test } = require('@playwright/test');

class CarsController extends BaseController {
    constructor(request) {
        super(request);
        this.API_CARS = '/api/cars';
        this.API_CARS_MODELS = '/cars/models';
    }

    async getAllCars() {
        return test.step(`HTTP GET ${this.API_CARS}`, async () => {
            return this.get(this.API_CARS);
        });
    }

    async getCarsModels() {
        return test.step(`HTTP GET ${this.API_CARS_MODELS}`, async () => {
            return this.get(`${process.env.API_URL}${this.API_CARS_MODELS}`);
        });
    }
    async createCar(car) {
        return test.step(`HTTP POST ${this.API_CARS}`, async () => {
            return this.post(this.API_CARS, car);
        });
    }

    async deleteCar(id) {
        return test.step(`HTTP DEELTE ${this.API_CARS}/${id}`, async () => {
            return this.delete(`${this.API_CARS}/${id}`);
        });
    }
}

module.exports.CarsController = CarsController;
