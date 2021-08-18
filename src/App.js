import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './components/Dashboard';
import StoreContext from './store/StoreContext';

function App() {
   return (
      <StoreContext>
         <BrowserRouter>
            <Route path="/main">
               <Dashboard />
            </Route>
            <Route path="/" exact>
               <Home />
            </Route>
         </BrowserRouter>
      </StoreContext>
   );
}

export default App;
