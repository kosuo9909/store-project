import { Model, createServer } from 'miragejs';

export const mirageServer = () => {
  createServer({
    models: {
      car: Model,
    },
    routes() {
      this.get('/api/cars', (_schema) => {
        return _schema.cars.all();
      });
      this.post('/api/cars', (schema, request) => {
        const car = JSON.parse(request.requestBody);

        return schema.cars.create(car);
      });
    },
  });
};
