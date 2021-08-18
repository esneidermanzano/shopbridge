import Home from '../pages/Home';
import { Store } from '../store/StoreContext';
import mockData from './mockData';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Item from '../components/Item';

const initialStore = {
   items: mockData,
   setItems: () => {},
   fetchItems: () => {},
};

const StoreContextMock = (props) => {
   return (
      <Store.Provider value={initialStore}>{props.children}</Store.Provider>
   );
};

test('Home render', () => {
   render(
      <StoreContextMock>
         <BrowserRouter>
            <Home />
         </BrowserRouter>
      </StoreContextMock>
   );

   expect(screen.getByText(/Realme 7i/i)).toBeInTheDocument();
});

test('Item with image 404', () => {
   const item = {
      id: '-MhEo_yv6qb8JMyVfLg5',
      name: 'Realme 7i ',
      description:
         'Realme 7i with 5000mAh battery. The Realme 7i supports proprietary fast charging...',
      price: '700',
      image: 'domain.com/lol',
   };

   render(<Item item={item} />);

   const image = screen.getByRole('img');
   fireEvent.error(image);

   expect(image.alt).toContain('no-image');
});

test('Item with no image', () => {
   const item = {
      id: '-MhEo_yJMyVfLg5',
      name: 'Realme 7i xcl ',
      description:
         'Realme 7i with 5000mAh battery. The Realme 7i supports proprietary fast charging...',
      price: '700',
   };
   render(<Item item={item} />);

   const image = screen.getByRole('img');
   fireEvent.error(image);

   expect(image.alt).toContain('no-image');
});
