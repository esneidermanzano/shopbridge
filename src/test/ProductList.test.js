import React from 'react';
import {
   render,
   screen,
   cleanup,
   fireEvent,
   waitFor,
} from '@testing-library/react';
import ProductList from '../components/ProductList';
import StoreContext, { Store } from '../store/StoreContext';
import mockData from './mockData';
import * as firebase from '../api/firebase';

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

beforeEach(cleanup);

afterEach(() => {
   jest.restoreAllMocks();
});

describe('ProductList test', () => {
   test('Should show message "there are not  any products', () => {
      const component = render(
         <StoreContext>
            <ProductList />
         </StoreContext>
      );
      expect(screen.getByText(/any products/i)).toBeInTheDocument();
   });

   test('Should show at leat one product', () => {
      const component = render(
         <StoreContextMock>
            <ProductList />
         </StoreContextMock>
      );
      expect(component.container).toHaveTextContent('Edit');
   });

   test('Click on delete item button', async () => {
      const component = render(
         <StoreContextMock>
            <ProductList />
         </StoreContextMock>
      );

      jest.spyOn(window, 'confirm').mockImplementation(() => true);

      const items = await screen.findAllByRole('button');
      expect(items).toHaveLength(2);

      let mockDeleteItem = jest.spyOn(firebase, 'deleteItem');
      mockDeleteItem.mockReturnValue(true);

      const spyAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

      await waitFor(() => fireEvent.click(items[1]));

      expect(mockDeleteItem).toHaveBeenCalled();
      expect(spyAlert).toHaveBeenCalledTimes(1);
      spyAlert.mockClear();

      // ============== Delete product error message
      mockDeleteItem.mockClear();
      mockDeleteItem.mockReturnValue(false);

      await waitFor(() => fireEvent.click(items[1]));

      expect(spyAlert).toHaveBeenCalledTimes(1);
   });

   test('Click on Update item button', async () => {
      const component = render(
         <StoreContextMock>
            <ProductList />
         </StoreContextMock>
      );

      jest.spyOn(window, 'confirm').mockImplementation(() => true);
      const items = await screen.findAllByRole('button');
      expect(items).toHaveLength(2);
      fireEvent.click(items[0]);

      const modalButton = screen.getByText('UPDATE');
      expect(modalButton).toBeInTheDocument;

      // ============== closing modal
      const closeModal = screen.getByTestId('close-modal');
      await waitFor(() => fireEvent.click(closeModal));

      expect(modalButton).not.toBeInTheDocument();
   });
});
