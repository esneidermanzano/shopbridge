import React from 'react';
import {
   render,
   screen,
   cleanup,
   fireEvent,
   waitFor,
} from '@testing-library/react';
import ProductForm from '../components/ProductForm';
import StoreContext from '../store/StoreContext';
import mockData from './mockData';
import * as firebase from '../api/firebase';

// ============ Global browser values
global.confirm = () => true;
global.URL.createObjectURL = jest.fn();

const Component = (props) => (
   <StoreContext>
      <ProductForm {...props} />
   </StoreContext>
);
beforeEach(cleanup);

afterEach(() => {
   jest.restoreAllMocks();
});

describe('ProductForm test', () => {
   test('Should show Add product button', () => {
      render(<Component />);
      expect(screen.getByText('ADD PRODUCT')).toBeInTheDocument();
   });

   test('Changing values and interaction', async () => {
      render(<Component />);

      // ============ Change all inputs values
      const inputName = screen.getByLabelText(/Product Name/i);
      expect(inputName).toBeInTheDocument();

      fireEvent.change(inputName, { target: { value: 'motorola' } });
      expect(inputName.value).toBe('motorola');

      const inputPrice = screen.getByLabelText(/Price/i);
      expect(inputPrice).toBeInTheDocument();

      fireEvent.change(inputPrice, { target: { value: 123.5 } });
      expect(inputPrice.value).toBe('123.5');

      const inputDesc = screen.getByLabelText(/Description/i);
      expect(inputDesc).toBeInTheDocument();

      // ============ Input file
      fireEvent.change(inputDesc, { target: { value: 'some large summary' } });
      expect(inputDesc.value).not.toBe('');

      const fakeFile = new File(['(⌐□_□)'], 'image.png', {
         type: 'image/png',
      });
      const inputImage = screen.getByLabelText(/Upload image/i);
      await waitFor(() =>
         fireEvent.change(inputImage, { target: { files: [fakeFile] } })
      );
      // ============ expect file input to have an image
      let image = document.getElementById('select-file');
      expect(image.files[0].name).toBe('image.png');
      expect(image.files.length).toBe(1);

      const spyAlert = jest.spyOn(window, 'alert').mockResolvedValue(() => {});
      //const spyConsole = jest.spyOn(global.console, 'log');

      // ============ mocking firebase functions
      let mockUploadImage = jest.spyOn(firebase, 'uploadImage');
      let mockUploadItem = jest.spyOn(firebase, 'saveProduct');
      mockUploadImage.mockReturnValue("domain.com/image.png'");
      mockUploadItem.mockReturnValue({ ok: true });

      // ============ Submit produt successfully'
      const buttonSubmit = screen.getByText('ADD PRODUCT');
      await waitFor(() => fireEvent.click(buttonSubmit));

      expect(spyAlert).toHaveBeenCalledTimes(1);
      expect(mockUploadItem).toHaveBeenCalledTimes(1);
      expect(mockUploadImage).toHaveBeenCalledTimes(1);

      // ============ Simulating image upload fail'
      mockUploadImage.mockClear();
      mockUploadImage.mockReturnValue(null);
      spyAlert.mockClear();

      fireEvent.change(inputName, { target: { value: 'motorola' } });
      fireEvent.change(inputPrice, { target: { value: 123.5 } });
      fireEvent.change(inputDesc, { target: { value: 'some large summary' } });
      await waitFor(() =>
         fireEvent.change(inputImage, { target: { files: [fakeFile] } })
      );

      await waitFor(() => fireEvent.click(screen.getByText('ADD PRODUCT')));
      expect(spyAlert).toHaveBeenCalledWith(
         "something went wrong, we're working to solve it soon!"
      );

      // ============ Simulating error saving item'
      mockUploadImage.mockClear();
      mockUploadImage.mockReturnValue("domain.com/image.png'");
      mockUploadItem.mockClear();
      mockUploadItem.mockReturnValue({ ok: false });

      await waitFor(() => fireEvent.click(screen.getByText('ADD PRODUCT')));
      expect(spyAlert).toHaveBeenCalledTimes(2);
   });

   test('Deleting image', async () => {
      render(<Component />);
      const fakeFile = new File(['(⌐□_□)'], 'image.png', {
         type: 'image/png',
      });
      const inputImage = screen.getByLabelText(/Upload image/i);
      await waitFor(() =>
         fireEvent.change(inputImage, { target: { files: [fakeFile] } })
      );

      const deleteImage = screen.getByTestId('delete-img');
      fireEvent.click(deleteImage);

      let image = document.getElementById('select-file');
      expect(image.files).toBe(null);
   });

   test('Edit produt', async () => {
      const props = { isUpdate: true, product: mockData[0], toggle: jest.fn() };
      render(<Component {...props} />);

      // ============ Must show Edipt Pordut text
      const fakeFile = new File(['(⌐□_□)'], 'image.png', {
         type: 'image/png',
      });
      const inputImage = screen.getByLabelText(/Upload image/i);
      await waitFor(() =>
         fireEvent.change(inputImage, { target: { files: [fakeFile] } })
      );

      const buttonSubmit = screen.getByTestId('submit-btn');
      expect(buttonSubmit).toBeInTheDocument();

      // ============ Edit product success
      const spyAlert = jest.spyOn(window, 'alert').mockResolvedValue(() => {});

      let mockUploadImage = jest.spyOn(firebase, 'uploadImage');
      mockUploadImage.mockReturnValue("domain.com/image.png'");

      let mockUpdateItem = jest.spyOn(firebase, 'updateItem');
      mockUpdateItem.mockReturnValue(true);

      await waitFor(() => fireEvent.click(buttonSubmit));

      // ============ Edit Prodcut failed
      mockUpdateItem.mockClear();
      mockUpdateItem.mockReturnValue(false);

      await waitFor(() => fireEvent.click(screen.getByTestId('submit-btn')));

      expect(spyAlert).toHaveBeenCalledTimes(2);

      // ============ image not uploaded
      mockUploadImage.mockClear();
      mockUploadImage.mockReturnValue(false);
      global.console.log = jest.fn();
      await waitFor(() => fireEvent.click(screen.getByTestId('submit-btn')));

      expect(console.log).toBeCalledTimes(1);
      expect(console.log).toHaveBeenLastCalledWith(
         'Cannot upload image to firebase'
      );
   });
});
