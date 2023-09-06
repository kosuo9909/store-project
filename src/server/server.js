import { createServer } from 'miragejs';
import { v4 } from 'uuid';

export const setupMirageServer = () => {
  createServer({
    routes() {
      this.get('/api/cars', () => {
        const storedCars = localStorage.getItem('cars');

        return storedCars ? JSON.parse(storedCars) : [];
      });

      this.post('/api/cars', (schema, request) => {
        const myID = v4();
        const newCar = JSON.parse(request.requestBody);
        const carWithDateAndID = {
          ...newCar,
          datePosted: new Date().toISOString(),
          id: myID,
        };
        const storedCars = JSON.parse(localStorage.getItem('cars') || '[]');
        storedCars.push(carWithDateAndID);
        localStorage.setItem('cars', JSON.stringify(storedCars));
        return '200';
      });
    },
  });
};
