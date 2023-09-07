import { createServer } from 'miragejs';
import { v4 } from 'uuid';

export const setupMirageServer = () => {
  createServer({
    routes() {
      this.get('/api/cars', () => {
        const storedCars = localStorage.getItem('cars');

        return storedCars ? JSON.parse(storedCars) : [];
      });

      this.post('/api/cars', (_, request) => {
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

      this.put('/api/cars', (_, request) => {
        const storedCars = JSON.parse(localStorage.getItem('cars') || '[]');
        const updatedCar = JSON.parse(request.requestBody);
        const id = updatedCar.id;

        const carIndex = storedCars.findIndex((item) => item.id === id);

        if (carIndex !== -1) {
          storedCars.value[carIndex] = {
            ...storedCars[carIndex],
            ...updatedCar,
          };
        }

        localStorage.setItem('cars', JSON.stringify(storedCars));

        return '200';
      });

      this.delete('/api/cars/:id', (_, request) => {
        const storedCars = JSON.parse(localStorage.getItem('cars') || '[]');
        const updatedCars = storedCars.filter(
          (car) => car.id !== request.params.id,
        );
        localStorage.setItem('cars', JSON.stringify(updatedCars));

        return '200';
      });
    },
  });
};
