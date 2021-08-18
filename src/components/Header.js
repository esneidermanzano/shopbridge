import { Link } from 'react-router-dom';
import styles from '../styles/Header.module.css';

import logo from '../images/logo.svg';

// =============== Header on main page

const Header = () => {
   return (
      <header className={styles.header}>
         <div className={styles['head-ctn']}>
            <img className={styles.logo} src={logo} alt="ShopBridge" />
            <div className={styles['amd-link']}>
               <Link to="/main">Admin</Link>
            </div>
         </div>
      </header>
   );
};

export default Header;
