import { test, expect } from '@playwright/test';
import { CarsController } from '../src/controllers/CarsController';

const carData = {
    invalidBrand: {
        carBrandId: 13,
        carModelId: 1,
        mileage: 111,
    },

    invalidModel: {
        carBrandId: 1,
        carModelId: 13,
        mileage: 222,
    },

    noMileage: {
        carBrandId: 1,
        carModelId: 3,
    },

    aboveMaximumMileage: {
        carBrandId: 1,
        carModelId: 3,
        mileage: 9999999,
    },

    negativeMileage: {
        carBrandId: 1,
        carModelId: 3,
        mileage: -13,
    },
};

test.describe('Create cars and validate data', () => {
    test('create all car brands with all available models', async ({ request }) => {
        const carsController = new CarsController(request);
        const carsModels = await carsController.getCarsModels();
        const allBrandsAndModels = carsModels.json.data.map(({ id, carBrandId }) => ({
            carBrandId: carBrandId,
            carModelId: id,
            mileage: 13,
        }));

        const createCarsRequests = allBrandsAndModels.map(async (car) => {
            const createResponse = await carsController.createCar(car);
            console.log(createResponse);
            expect(createResponse.status).toBe(201);
            expect(createResponse.json.data).toEqual(expect.objectContaining(car));
            console.log(car);
        });

        await Promise.all(createCarsRequests);
    });

    test('delete all cars', async ({ request }) => {
        const carsController = new CarsController(request);
        const carsResponse = await carsController.getAllCars();
        const carIds = carsResponse.json.data.map((car) => car.id);

        const deleteCarsRequests = carIds.map(async (id) => {
            const deleteResponse = await carsController.deleteCar(id);
            expect(deleteResponse.status).toBe(200);
        });

        await Promise.all(deleteCarsRequests);
    });

    test('create car with invalid brand', async ({ request }) => {
        const carsController = new CarsController(request);
        const invalidBrandCar = carData.invalidBrand;
        const createResponse = await carsController.createCar(invalidBrandCar);
        expect(createResponse.status).toBe(404);
    });

    test('create car with invalid model', async ({ request }) => {
        const carsController = new CarsController(request);
        const unvalidModelCar = carData.invalidModel;
        const createResponse = await carsController.createCar(unvalidModelCar);
        expect(createResponse.status).toBe(404);
    });

    test('create car without mileage', async ({ request }) => {
        const carsController = new CarsController(request);
        const noMileageCar = carData.noMileage;
        const createResponse = await carsController.createCar(noMileageCar);
        expect(createResponse.status).toBe(400);
    });

    test('create car with above maximum mileage number', async ({ request }) => {
        const carsController = new CarsController(request);
        const aboveMaximumMileageCar = carData.aboveMaximumMileage;
        const createResponse = await carsController.createCar(aboveMaximumMileageCar);
        expect(createResponse.status).toBe(400);
    });

    test('create car with negative mileage number', async ({ request }) => {
        const carsController = new CarsController(request);
        const negativeMileageCar = carData.negativeMileage;
        const createResponse = await carsController.createCar(negativeMileageCar);
        expect(createResponse.status).toBe(400);
    });
});
