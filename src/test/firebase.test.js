import { cleanup } from '@testing-library/react';
import {
   saveProduct,
   uploadImage,
   deleteItem,
   updateItem,
} from '../api/firebase';

const unmockedFetch = global.fetch;

beforeAll(() => {
   global.fetch = () => Promise.resolve('succes');
});

beforeEach(cleanup);

afterEach(() => {
   jest.restoreAllMocks();
});

afterAll(() => {
   global.fetch = unmockedFetch;
});

//=================== Mocking Firebase methods
const data = { name: 'data' };
const snapshot = {
   val: () => data,
   exportVal: () => data,
   exists: jest.fn(() => true),
};

const firebase = jest.genMockFromModule('firebase');
firebase.initializeApp = jest.fn();

firebase.database = jest.fn().mockReturnValue({
   ref: jest.fn().mockReturnThis(),
   update: jest.fn(() => Promise.resolve(snapshot)),
   remove: jest.fn(() => Promise.resolve()),
});

firebase.storage = jest.fn().mockReturnValue({
   ref: jest.fn().mockReturnThis(),
   getDownloadURL: jest.fn(() => Promise.resolve('somedomain.com/image.png')),
   put: Promise.resolve(),
});

//=================== Mocking Firebase methods

describe('Firebase actions', () => {
   const item = {
      name: 'Realme 7i ',
      description: 'Realme 7i1600 oprietary fast charging...',
      price: '700',
      image: 'image.com/image.png',
   };

   test('Save Product', async () => {
      const result = await saveProduct(item);
      expect(result).toBe('succes');
   });

   test('save Image', async () => {
      const result = await uploadImage({ name: 'image' });
      //console.log('veamos', result);
   });

   test('Update product', async () => {
      // ============= success update
      let result = await updateItem(item, '-MhBR542Xqg7Knog5ciC');
      expect(result).toBe(true);

      // ============= update failed
      result = await updateItem(item);
      expect(result).toBe(false);
   });

   test('Deleting product', async () => {
      // ============= success deleting a product
      let result = await deleteItem('-MhBR542Xqg7Knog5ciC');
      expect(result).toBe(true);

      // ============= product removal has failed
      result = await deleteItem(null);
      expect(result).toBe(false);
   });
});
