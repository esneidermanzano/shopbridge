import Dashboard from '../components/Dashboard';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

test('Home render', () => {
   Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
         matches: query === '(min-width: 900px)' ? true : false,
         media: query,
         onchange: null,
         removeEventListener: jest.fn(),
      })),
   });

   const { container } = render(
      <BrowserRouter>
         <Dashboard />
      </BrowserRouter>
   );

   const button = container.querySelector('button');

   fireEvent.click(button);

   expect(screen.getByText(/Create Product/i)).toBeInTheDocument();
   expect(screen.getByText(/List Products/i)).toBeInTheDocument();
});
