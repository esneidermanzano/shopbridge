import { Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import ProductList from '../components/ProductList';
import ProductForm from './ProductForm';
import styles from '../styles/Dashboard.module.css';

// =============== Dashboard to show admin panel
const Dashboard = () => {
   return (
      <div className={styles.body}>
         <Sidebar />
         <div className={styles.main}>
            <div className={styles['left-ctn']}>
               <Route path="/main/list">
                  <ProductList />
               </Route>
               <Route path="/main/create">
                  <ProductForm />
               </Route>
            </div>
         </div>
      </div>
   );
};

export default Dashboard;
