import { screen, render, cleanup } from '@testing-library/react';
import SingleListing from '../components/SingleListing';
import { MemoryRouter, MemoryRouterProps } from 'react-router';
import { IntlProvider } from 'react-intl';
import { store } from '../store/store';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';

describe('CarDetail Component', () => {
  let wrapper: React.FC<MemoryRouterProps>;

  beforeEach(() => {
    wrapper = ({ children }: MemoryRouterProps) => (
      <Provider store={store}>
        <IntlProvider locale="en">
          <MemoryRouter>{children}</MemoryRouter>
        </IntlProvider>
      </Provider>
    );
  });
  afterEach(() => {
    cleanup();
  });
  it('should render the car details', () => {
    const car = {
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
    render(<SingleListing car={car} button="view" />, { wrapper });

    expect(screen.getByTestId('make-model')).toHaveTextContent('Make Model');
  });
});
