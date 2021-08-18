import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import useMediaQuery from '../hookQuery';
import styles from '../styles/Sidebar.module.css';
import logo from '../images/logo.svg';

/*  =============== Sidebar
Custom nav to show options on a dasboard.

- This component doesn't need props. 
- useMediaQuery custom hook is udes to control 
window width.

*/

const Sidebar = (props) => {
   const isDesktop = useMediaQuery('(min-width: 900px)');
   const [showMenu, setShowMenu] = useState(false);

   const hadleShowMenu = () => {
      setShowMenu(!showMenu);
   };

   useEffect(() => {
      setShowMenu(false);
   }, [isDesktop]);

   return (
      <div
         className={showMenu ? styles.ctn : ''}
         onClick={showMenu ? hadleShowMenu : () => {}}
      >
         <nav className={`${styles.sidebar} ${showMenu && styles.mobile}`}>
            <div className={styles['logo-ctn']}>
               <Link to="/">
                  <img className={styles.logo} src={logo} alt="ShopBridge" />
               </Link>
            </div>
            <NavLink
               to="/main/welcome"
               activeClassName={styles.selected}
               onClick={hadleShowMenu}
            >
               <i class="fas fa-home"></i>
               Main
            </NavLink>
            <NavLink
               to="/main/create"
               activeClassName={styles.selected}
               onClick={hadleShowMenu}
            >
               <i className="fa fa-shopping-bag" />
               Create Product
            </NavLink>

            <NavLink
               to="/main/list"
               activeClassName={styles.selected}
               onClick={hadleShowMenu}
            >
               <i class="fas fa-list"></i>
               List Products
            </NavLink>

            <button className="circular" onClick={hadleShowMenu}>
               <i className="fas fa-bars"></i>
            </button>
         </nav>
      </div>
   );
};

export default Sidebar;
