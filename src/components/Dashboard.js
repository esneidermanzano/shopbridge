import { Route, Switch, Redirect } from 'react-router-dom';
import Sidebar from './Sidebar';
import ProductList from '../components/ProductList';
import ProductForm from './ProductForm';
import Main from '../pages/Main';
import styles from '../styles/Dashboard.module.css';

// =============== Dashboard to show admin panel
const Dashboard = () => {
   return (
      <div className={styles.body}>
         <Sidebar />
         <div className={styles.main}>
            <div className={styles['left-ctn']}>
               <Switch>
                  <Route exact path="/main/welcome">
                     <Main />
                  </Route>
                  <Route path="/main/list">
                     <ProductList />
                  </Route>
                  <Route path="/main/create">
                     <ProductForm />
                  </Route>
                  <Route to="/main">
                     <Redirect to="/main/welcome" />
                  </Route>
               </Switch>
            </div>
         </div>
      </div>
   );
};

export default Dashboard;
