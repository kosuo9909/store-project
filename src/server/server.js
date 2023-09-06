import { createServer } from 'miragejs';

export const setupMirageServer = () => {
  createServer({
    routes() {
      this.get('/api/cars', () => {
        const storedCars = localStorage.getItem('cars');

        return storedCars ? JSON.parse(storedCars) : [];
      });

      this.post('/api/cars', (schema, request) => {
        const storedCars = JSON.parse(localStorage.getItem('cars') || '[]');
        storedCars.push(request.requestBody);
        localStorage.setItem('cars', storedCars);

        return '200';
      });
    },
  });
};
