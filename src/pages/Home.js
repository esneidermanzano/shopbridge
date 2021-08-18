import { useContext } from 'react';
import { Store } from '../store/StoreContext';
import Item from '../components/Item';
import Header from '../components/Header';
import styles from '../styles/Home.module.css';

/*  =============== Home
Home page to show header and items, this one is used 
in main route.

It's data is obtained by store as items are global data
*/

const Home = () => {
   const { items } = useContext(Store);
   return (
      <>
         <Header />
         <div className={styles.home}>
            {!items && <p>There aren't any products</p>}

            {items &&
               items.map((item) => {
                  return <Item key={item.id} item={item} />;
               })}
         </div>
      </>
   );
};

export default Home;
