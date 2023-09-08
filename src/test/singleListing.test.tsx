import { screen, render, cleanup } from '@testing-library/react';
import SingleListing from '../components/SingleListing';
import { MemoryRouter, MemoryRouterProps } from 'react-router';
import { IntlProvider } from 'react-intl';
import { store } from '../store/store';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { ICar } from '../interfaces/interfaces';

describe('SingleListing Component', () => {
  let wrapper: React.FC<MemoryRouterProps>;
  let car: ICar;

  beforeEach(() => {
    wrapper = ({ children }: MemoryRouterProps) => (
      <Provider store={store}>
        <IntlProvider locale="en">
          <MemoryRouter>{children}</MemoryRouter>
        </IntlProvider>
      </Provider>
    );
  });

  beforeEach(() => {
    car = {
      make: 'Make',
      id: '5',
      model: 'Model',
      year: 2012,
      mileageColumn: 200000,
      fuelColumn: 'Fuel',
      bhpColumn: 110,
      city: 'City',
      country: 'Country',
      price: 10900,
      description: 'Description',
    };
  });
  afterEach(() => {
    cleanup();
  });
  it('should render the car details', () => {
    render(<SingleListing car={car} button="view" />, { wrapper });

    expect(screen.getByText(/Make Model/)).toBeInTheDocument();
    expect(screen.getByText(/2012/)).toBeInTheDocument();
    expect(screen.getByText(/200000/)).toBeInTheDocument();
    expect(screen.getByText(/Fuel/)).toBeInTheDocument();
    expect(screen.getByText(/110/)).toBeInTheDocument();
    expect(screen.getByText(/City Country/)).toBeInTheDocument();
    expect(screen.getByText(/10900 USD/)).toBeInTheDocument();
    expect(screen.getByText(/Description/)).toBeInTheDocument();
  });
});
