import { render, screen } from '@testing-library/react';
import App from '../App';

test('Should show message "there are not  any products', () => {
   const component = render(<App />);
});
