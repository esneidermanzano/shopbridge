import styles from '../styles/Item.module.css';
import imageNotFound from '../images/image-not-found.png';

/*  =============== Item component
 This one shows item information, this component
 is used in main page.
 
 - If some item doesn't have an image a default one is used
 */

const Item = ({ item }) => {
   return (
      <div className={styles.product}>
         <div className={styles.body}>
            <div className={styles.name}>{item.name} </div>
            <div className={styles.img}>
               <img
                  onError={(e) => {
                     e.target.onerror = null;
                     e.target.src = imageNotFound;
                     e.target.alt = 'no-image';
                  }}
                  src={item.image ? item.image : imageNotFound}
                  alt={item.name}
               />
            </div>
         </div>
      </div>
   );
};

export default Item;
