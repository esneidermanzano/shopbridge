import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import StoreContext from '../store/StoreContext';
import firebaseMockData from './firebaseMockData';
import Item from '../components/Item';

const unmockedFetch = global.fetch;

beforeAll(() => {
   global.fetch = jest.fn(() =>
      Promise.resolve({
         json: () => Promise.resolve(firebaseMockData),
      })
   );
});

beforeEach(cleanup);

afterEach(() => {
   jest.restoreAllMocks();
});

afterAll(() => {
   global.fetch = unmockedFetch;
});

describe('Store context functionality', () => {
   test('Getting product from api', async () => {
      let originalFetch = global.fetch;
      global.fetch = jest.fn(() =>
         Promise.resolve({
            json: () => Promise.resolve(firebaseMockData),
         })
      );

      const item = {
         id: '-MhEo_yv6qb8JMyVfLg5',
         name: 'Realme 7i ',
         description:
            'Realme 7i with 5000mAh battery. The Realme 7i supports proprietary fast charging...',
         price: '700',
         image: 'domain.com/lol',
      };

      render(
         <StoreContext>
            <Item item={item} />
         </StoreContext>
      );

      global.fetch = originalFetch;
      expect(screen.getByText(/Realme 7i/i)).toBeInTheDocument();
   });
});
